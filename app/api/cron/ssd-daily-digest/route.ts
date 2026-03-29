import { NextRequest, NextResponse } from 'next/server'
import { fetchSsdEventsSince, sendSsdDigestEmail } from '@/lib/ssd-campaign-digest'
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

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const rows = await fetchSsdEventsSince(sb, since)
  const sent = await sendSsdDigestEmail({ kind: 'daily', sinceIso: since, rows })

  return NextResponse.json({ ok: true, rows: rows.length, emailed: sent })
}
