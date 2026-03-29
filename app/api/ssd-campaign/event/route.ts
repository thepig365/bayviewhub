import { NextRequest, NextResponse } from 'next/server'
import { maybeSendSsdInstantAlerts } from '@/lib/ssd-campaign-alerts'
import {
  SSD_CAMPAIGN_ALLOWED_EVENTS,
  sanitizeCampaignString,
  sanitizeSessionId,
  getSupabaseServer,
} from '@/lib/ssd-campaign-server'

export const runtime = 'nodejs'

const rateBucket = new Map<string, { n: number; reset: number }>()
const RATE_MAX = 120
const RATE_MS = 60_000

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const b = rateBucket.get(ip)
  if (!b || now > b.reset) {
    rateBucket.set(ip, { n: 1, reset: now + RATE_MS })
    return false
  }
  b.n++
  return b.n > RATE_MAX
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  return fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
}

function allowedPath(path: string): boolean {
  return path.startsWith('/backyard-small-second-home')
}

export async function POST(req: NextRequest) {
  if (rateLimit(clientIp(req))) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const eventName = typeof body.event === 'string' ? body.event : ''
  if (!SSD_CAMPAIGN_ALLOWED_EVENTS.has(eventName)) {
    return NextResponse.json({ ok: false, error: 'unknown_event' }, { status: 400 })
  }

  const path = sanitizeCampaignString(body.path, 200)
  if (!path || !allowedPath(path)) {
    return NextResponse.json({ ok: false, error: 'invalid_path' }, { status: 400 })
  }

  const row = {
    event_name: eventName,
    path,
    referrer_host: sanitizeCampaignString(body.referrer_host, 120),
    utm_source: sanitizeCampaignString(body.utm_source, 120),
    utm_medium: sanitizeCampaignString(body.utm_medium, 120),
    utm_campaign: sanitizeCampaignString(body.utm_campaign, 120),
    link_target: sanitizeCampaignString(body.link_target, 240),
    link_category: sanitizeCampaignString(body.link_category, 80),
    zone: sanitizeCampaignString(body.zone, 80),
    scroll_depth: sanitizeCampaignString(body.scroll_depth, 20),
    share_channel: sanitizeCampaignString(body.share_channel, 40),
    visible_seconds:
      typeof body.visible_seconds === 'number' && Number.isFinite(body.visible_seconds)
        ? Math.min(3600, Math.max(0, Math.round(body.visible_seconds)))
        : null,
    session_id: sanitizeSessionId(body.session_id),
  }

  const sb = getSupabaseServer()
  if (!sb) {
    return NextResponse.json({ ok: true, stored: false })
  }

  const { error } = await sb.from('ssd_campaign_events').insert(row)
  if (error) {
    console.warn('[ssd-campaign] insert failed', error.message)
    return NextResponse.json({ ok: true, stored: false, warn: 'insert_failed' })
  }

  try {
    await maybeSendSsdInstantAlerts(sb, {
      event_name: row.event_name,
      path: row.path,
      utm_source: row.utm_source,
      referrer_host: row.referrer_host,
    })
  } catch (e) {
    console.warn('[ssd-campaign] alert evaluation failed', e)
  }

  return NextResponse.json({ ok: true, stored: true })
}
