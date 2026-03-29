import type { SupabaseClient } from '@supabase/supabase-js'
import { sendResendEmail } from '@/lib/resend-send'
import { campaignOwnerEmail } from '@/lib/ssd-campaign-server'

type Row = {
  event_name: string
  path: string
  referrer_host: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  link_category: string | null
  link_target: string | null
  scroll_depth: string | null
  share_channel: string | null
  visible_seconds: number | null
  session_id: string | null
}

function countBy<T extends string>(rows: Row[], pick: (r: Row) => T | null): Record<string, number> {
  const out: Record<string, number> = {}
  for (const r of rows) {
    const k = pick(r)
    if (!k) continue
    out[k] = (out[k] ?? 0) + 1
  }
  return out
}

function topN(map: Record<string, number>, n: number): [string, number][] {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
}

export async function fetchSsdEventsSince(sb: SupabaseClient, sinceIso: string): Promise<Row[]> {
  const { data, error } = await sb
    .from('ssd_campaign_events')
    .select(
      'event_name,path,referrer_host,utm_source,utm_medium,utm_campaign,link_category,link_target,scroll_depth,share_channel,visible_seconds,session_id'
    )
    .gte('created_at', sinceIso)
    .order('created_at', { ascending: false })
    .limit(8000)

  if (error || !data) return []
  return data as Row[]
}

export async function sendSsdDigestEmail(opts: {
  kind: 'daily' | 'weekly'
  sinceIso: string
  rows: Row[]
}): Promise<boolean> {
  const to = campaignOwnerEmail()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bayviewhub.me'
  const hub = `${baseUrl}/backyard-small-second-home`
  const { kind, rows } = opts

  const hubViews = rows.filter((r) => r.event_name === 'ssd_hub_page_view' && r.path === '/backyard-small-second-home')
  const feasViews = rows.filter((r) => r.event_name === 'ssd_feasibility_page_view')
  const formStarts = rows.filter((r) => r.event_name === 'ssd_feasibility_form_start')
  const formSubmits = rows.filter((r) => r.event_name === 'ssd_feasibility_form_submit')

  const sessions = new Set(rows.map((r) => r.session_id).filter(Boolean))
  const utm = countBy(hubViews, (r) => r.utm_source || null)
  const ref = countBy(hubViews, (r) => r.referrer_host || '(none)')
  const scroll = countBy(
    rows.filter((r) => r.event_name === 'ssd_hub_scroll'),
    (r) => r.scroll_depth || null
  )
  const linkCat = countBy(
    rows.filter((r) => r.event_name === 'ssd_hub_link_click'),
    (r) => r.link_category || 'other'
  )
  const shares = countBy(
    rows.filter((r) => r.event_name === 'ssd_hub_share_click'),
    (r) => r.share_channel || 'unknown'
  )

  const engagementRows = rows.filter((r) => r.event_name === 'ssd_hub_engagement' && r.visible_seconds != null)
  const avgEng =
    engagementRows.length > 0
      ? Math.round(
          engagementRows.reduce((s, r) => s + (r.visible_seconds ?? 0), 0) / engagementRows.length
        )
      : null

  const title = kind === 'daily' ? 'SSD campaign — daily digest' : 'SSD campaign — weekly digest'
  const period = kind === 'daily' ? 'Last ~24 hours' : 'Last ~7 days'

  const html = `
  <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.5;max-width:640px;color:#0f172a">
    <h2 style="margin:0 0 12px">${title}</h2>
    <p style="margin:0 0 16px;color:#64748b">${period} · anonymous telemetry from <code>ssd_campaign_events</code></p>
    <p><a href="${hub}">SSD landing hub</a> · Plausible/GA4 for full acquisition analytics</p>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0"/>
    <h3 style="margin:16px 0 8px">Volume</h3>
    <ul>
      <li>Hub page views: <strong>${hubViews.length}</strong></li>
      <li>Feasibility page views: <strong>${feasViews.length}</strong></li>
      <li>Distinct session ids (telemetry): <strong>${sessions.size}</strong></li>
      <li>Form starts: <strong>${formStarts.length}</strong></li>
      <li>Form submits (client beacons): <strong>${formSubmits.length}</strong></li>
    </ul>
    <h3 style="margin:16px 0 8px">Hub utm_source (top)</h3>
    <p>${formatTop(utm, 8)}</p>
    <h3 style="margin:16px 0 8px">Referrer host (hub, top)</h3>
    <p>${formatTop(ref, 8)}</p>
    <h3 style="margin:16px 0 8px">Scroll depth (hub milestones)</h3>
    <p>${formatTop(scroll, 10)}</p>
    <h3 style="margin:16px 0 8px">Hub link clicks by category</h3>
    <p>${formatTop(linkCat, 12)}</p>
    <h3 style="margin:16px 0 8px">Share channel</h3>
    <p>${formatTop(shares, 10)}</p>
    <h3 style="margin:16px 0 8px">Engagement (visible seconds, sample avg)</h3>
    <p>${avgEng != null ? `~<strong>${avgEng}</strong>s average across engagement pings` : 'No engagement pings in period'}</p>
    <p style="margin-top:24px;font-size:12px;color:#94a3b8">GA4 engagement time and Plausible visit duration are additional — see dashboards.</p>
  </div>`

  return sendResendEmail({ to, subject: `[SSD] ${kind === 'daily' ? 'Daily' : 'Weekly'} digest · hub + funnel`, html })
}

function formatTop(map: Record<string, number>, n: number): string {
  const t = topN(map, n)
  if (t.length === 0) return '<em>None</em>'
  return t.map(([k, v]) => `${escapeHtml(k)}: ${v}`).join('<br/>')
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Single weekly mail: 7d summary + vs prior 7d trend. */
export async function sendSsdWeeklyCombinedDigest(rows7d: Row[], rowsPrev7d: Row[]): Promise<boolean> {
  const to = campaignOwnerEmail()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bayviewhub.me'
  const hub = `${baseUrl}/backyard-small-second-home`

  const vNow = rows7d.filter((r) => r.event_name === 'ssd_hub_page_view' && r.path === '/backyard-small-second-home')
    .length
  const vPrev = rowsPrev7d.filter(
    (r) => r.event_name === 'ssd_hub_page_view' && r.path === '/backyard-small-second-home'
  ).length
  const fNow = rows7d.filter((r) => r.event_name === 'ssd_feasibility_form_submit').length
  const fPrev = rowsPrev7d.filter((r) => r.event_name === 'ssd_feasibility_form_submit').length

  const since7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const summaryBlock = buildDigestHtmlBlock('Last 7 days', rows7d)

  const html = `
  <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.5;max-width:640px;color:#0f172a">
    <h2 style="margin:0 0 12px">SSD campaign — weekly digest</h2>
    <p style="margin:0 0 16px"><a href="${hub}">Landing hub</a> · since ${since7.slice(0, 10)}</p>
    <h3 style="margin:20px 0 8px">Week-over-week</h3>
    <ul>
      <li>Hub views: <strong>${vNow}</strong> (this week) vs <strong>${vPrev}</strong> (prior week)</li>
      <li>Form submit beacons: <strong>${fNow}</strong> vs <strong>${fPrev}</strong></li>
    </ul>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0"/>
    ${summaryBlock}
    <p style="margin-top:24px;font-size:12px;color:#94a3b8">GA4 / Plausible: acquisition, engaged sessions, and average engagement time. This email is first-party event aggregates only.</p>
  </div>`
  return sendResendEmail({ to, subject: '[SSD] Weekly digest — funnel + WoW trend', html })
}

function buildDigestHtmlBlock(title: string, rows: Row[]): string {
  const hubViews = rows.filter((r) => r.event_name === 'ssd_hub_page_view' && r.path === '/backyard-small-second-home')
  const feasViews = rows.filter((r) => r.event_name === 'ssd_feasibility_page_view')
  const formStarts = rows.filter((r) => r.event_name === 'ssd_feasibility_form_start')
  const formSubmits = rows.filter((r) => r.event_name === 'ssd_feasibility_form_submit')
  const sessions = new Set(rows.map((r) => r.session_id).filter(Boolean))
  const utm = countBy(hubViews, (r) => r.utm_source || null)
  const ref = countBy(hubViews, (r) => r.referrer_host || '(none)')
  const scroll = countBy(
    rows.filter((r) => r.event_name === 'ssd_hub_scroll'),
    (r) => r.scroll_depth || null
  )
  const linkCat = countBy(
    rows.filter((r) => r.event_name === 'ssd_hub_link_click'),
    (r) => r.link_category || 'other'
  )
  const shares = countBy(
    rows.filter((r) => r.event_name === 'ssd_hub_share_click'),
    (r) => r.share_channel || 'unknown'
  )
  const engagementRows = rows.filter((r) => r.event_name === 'ssd_hub_engagement' && r.visible_seconds != null)
  const avgEng =
    engagementRows.length > 0
      ? Math.round(
          engagementRows.reduce((s, r) => s + (r.visible_seconds ?? 0), 0) / engagementRows.length
        )
      : null

  return `
    <h3 style="margin:0 0 8px">${title}</h3>
    <ul>
      <li>Hub page views: <strong>${hubViews.length}</strong></li>
      <li>Feasibility page views: <strong>${feasViews.length}</strong></li>
      <li>Sessions (ids): <strong>${sessions.size}</strong></li>
      <li>Form starts / submits: <strong>${formStarts.length}</strong> / <strong>${formSubmits.length}</strong></li>
    </ul>
    <p><strong>utm_source</strong><br/>${formatTop(utm, 8)}</p>
    <p><strong>Referrers</strong><br/>${formatTop(ref, 6)}</p>
    <p><strong>Scroll</strong><br/>${formatTop(scroll, 8)}</p>
    <p><strong>Link categories</strong><br/>${formatTop(linkCat, 10)}</p>
    <p><strong>Share</strong><br/>${formatTop(shares, 8)}</p>
    <p><strong>Engagement ping avg (s)</strong><br/>${avgEng != null ? String(avgEng) : '—'}</p>
  `
}
