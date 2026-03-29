import type { SupabaseClient } from '@supabase/supabase-js'
import { sendResendEmail } from '@/lib/resend-send'
import { campaignOwnerEmail } from '@/lib/ssd-campaign-server'

const HUB_PATH_PREFIX = '/backyard-small-second-home'
const SPIKE_WINDOW_MIN = 45
const DEFAULT_SPIKE_THRESHOLD = 28
const QUIET_HOURS = 36

export async function maybeSendSsdInstantAlerts(
  sb: SupabaseClient,
  inserted: {
    event_name: string
    path: string
    utm_source: string | null
    referrer_host: string | null
  }
): Promise<void> {
  const to = campaignOwnerEmail()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bayviewhub.me'
  const hubUrl = `${baseUrl}/backyard-small-second-home`
  const gaHint =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID != null
      ? `GA4 property: <code>${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}</code><br/>`
      : ''
  const plausibleHint = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
    ? `Plausible: <code>${process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}</code><br/>`
    : ''

  // A) First hub traffic after quiet period (exclude current row: count strictly before now - 1s is fragile; we count events in window excluding last 5 seconds... Actually we insert THEN evaluate - so count events in last QUIET_H hours with created_at < now. If count === 1 (only the row we just added), first in window.

  if (inserted.event_name === 'ssd_hub_page_view' && inserted.path === HUB_PATH_PREFIX) {
    const since = new Date(Date.now() - QUIET_HOURS * 60 * 60 * 1000).toISOString()
    const { count, error } = await sb
      .from('ssd_campaign_events')
      .select('id', { count: 'exact', head: true })
      .eq('event_name', 'ssd_hub_page_view')
      .eq('path', HUB_PATH_PREFIX)
      .gte('created_at', since)

    if (!error && (count ?? 0) === 1) {
      await sendResendEmail({
        to,
        subject: `[SSD] Hub: first views after ~${QUIET_HOURS}h quiet window`,
        html: `<p>At least one <strong>ssd_hub_page_view</strong> on the main SSD landing page in the last ${QUIET_HOURS} hours (first in that window).</p>
        <p><a href="${hubUrl}">Open hub</a></p>
        <p style="color:#64748b;font-size:12px">${gaHint}${plausibleHint}Supabase table <code>ssd_campaign_events</code> for aggregates.</p>`,
      })
    }

    // Traffic spike: many hub views in short window
    const spikeSince = new Date(Date.now() - SPIKE_WINDOW_MIN * 60 * 1000).toISOString()
    const threshold = parseInt(process.env.SSD_SPIKE_HUB_VIEWS_THRESHOLD || '', 10) || DEFAULT_SPIKE_THRESHOLD
    const { count: recent } = await sb
      .from('ssd_campaign_events')
      .select('id', { count: 'exact', head: true })
      .eq('event_name', 'ssd_hub_page_view')
      .eq('path', HUB_PATH_PREFIX)
      .gte('created_at', spikeSince)

    if ((recent ?? 0) >= threshold) {
      const bucket = new Date()
      bucket.setMinutes(0, 0, 0)
      const bucketIso = bucket.toISOString()
      const dedupKey = `hub_spike_${bucketIso}`

      const { error: dedupErr } = await sb.from('ssd_campaign_alert_dedup').insert({
        alert_key: dedupKey,
        meta: { count: recent, window_min: SPIKE_WINDOW_MIN },
      })

      if (!dedupErr) {
        await sendResendEmail({
          to,
          subject: `[SSD] Hub traffic spike (~${recent} views / ${SPIKE_WINDOW_MIN}m)`,
          html: `<p><strong>${recent}</strong> hub page views in ~${SPIKE_WINDOW_MIN} minutes (threshold ${threshold}).</p>
          <p><a href="${hubUrl}">Hub</a> · Check Plausible/GA4 for source breakdown.</p>`,
        })
      }
    }
  }

  // B) New acquisition source (utm_source first seen in rolling 30 days)
  const utm = inserted.utm_source?.trim()
  if (
    inserted.event_name === 'ssd_hub_page_view' &&
    inserted.path === HUB_PATH_PREFIX &&
    utm &&
    utm.length > 1
  ) {
    const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const { data: prior } = await sb
      .from('ssd_campaign_events')
      .select('id')
      .eq('event_name', 'ssd_hub_page_view')
      .eq('path', HUB_PATH_PREFIX)
      .eq('utm_source', utm)
      .gte('created_at', since30)
      .limit(2)

    if (prior && prior.length === 1) {
      await sendResendEmail({
        to,
        subject: `[SSD] New hub utm_source (30d): ${utm.slice(0, 80)}`,
        html: `<p>First hub page view in 30 days with <code>utm_source=${escapeHtml(utm)}</code>.</p>
        <p>Referrer host: <code>${escapeHtml(inserted.referrer_host || '(direct / empty)')}</code></p>
        <p><a href="${hubUrl}">Hub</a></p>`,
      })
    }
  }

  // C) Strong CTA burst: many link clicks from hub in 12 minutes
  if (inserted.event_name === 'ssd_hub_link_click' && inserted.path.startsWith(HUB_PATH_PREFIX)) {
    const since12 = new Date(Date.now() - 12 * 60 * 1000).toISOString()
    const { count: clicks } = await sb
      .from('ssd_campaign_events')
      .select('id', { count: 'exact', head: true })
      .eq('event_name', 'ssd_hub_link_click')
      .like('path', `${HUB_PATH_PREFIX}%`)
      .gte('created_at', since12)

    const ctaThreshold = parseInt(process.env.SSD_CTA_BURST_THRESHOLD || '', 10) || 22
    if ((clicks ?? 0) >= ctaThreshold) {
      const hourBucket = new Date()
      hourBucket.setMinutes(0, 0, 0)
      const dedupKey = `cta_burst_${hourBucket.toISOString()}`
      const { error: derr } = await sb.from('ssd_campaign_alert_dedup').insert({
        alert_key: dedupKey,
        meta: { clicks },
      })
      if (!derr) {
        await sendResendEmail({
          to,
          subject: `[SSD] High hub link activity (~${clicks} clicks / 12m)`,
          html: `<p>~<strong>${clicks}</strong> tracked link clicks from SSD hub pages in ~12 minutes.</p>
          <p><a href="${hubUrl}">Hub</a></p>`,
        })
      }
    }
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
