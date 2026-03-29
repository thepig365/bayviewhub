import { NextRequest, NextResponse } from 'next/server'
import { fetchSsdEventsSince, sendSsdWeeklyCombinedDigest } from '@/lib/ssd-campaign-digest'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

export const runtime = 'nodejs'

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  return req.headers.get('authorization') === `Bearer ${secret}`
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const sb = getSupabaseServer()
  if (!sb) {
    return NextResponse.json({ ok: false, error: 'supabase_unconfigured' }, { status: 503 })
  }

  const now = Date.now()
  const since7 = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString()
  const since14 = new Date(now - 14 * 24 * 60 * 60 * 1000).toISOString()

  const rows7 = await fetchSsdEventsSince(sb, since7)

  const { data: prevRaw } = await sb
    .from('ssd_campaign_events')
    .select(
      'event_name,path,referrer_host,utm_source,utm_medium,utm_campaign,link_category,link_target,scroll_depth,share_channel,visible_seconds,session_id'
    )
    .gte('created_at', since14)
    .lt('created_at', since7)
    .order('created_at', { ascending: false })
    .limit(8000)

  const rowsPrev7d = (prevRaw || []) as typeof rows7

  const sent = await sendSsdWeeklyCombinedDigest(rows7, rowsPrev7d)

  return NextResponse.json({ ok: true, week: rows7.length, prior: rowsPrev7d.length, emailed: sent })
}
