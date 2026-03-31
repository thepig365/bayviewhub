import { NextResponse } from 'next/server'
import {
  normalizeNewsletterEmail,
  verifyNewsletterUnsubscribeSignature,
} from '@/lib/newsletter'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = normalizeNewsletterEmail(body?.email)
    const sig = typeof body?.sig === 'string' ? body.sig.trim() : ''

    if (!email || !verifyNewsletterUnsubscribeSignature(email, sig)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid unsubscribe link.' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseServer()
    if (!supabase) {
      return NextResponse.json(
        { ok: false, error: 'Database not configured.' },
        { status: 500 }
      )
    }

    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .update({ status: 'unsubscribed' })
      .eq('email', email)
      .select('email,status')

    if (error) {
      console.error('[Newsletter] unsubscribe failed', error)
      return NextResponse.json(
        { ok: false, error: 'Could not unsubscribe this address.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ok: true,
      updated: Array.isArray(data) ? data.length : 0,
      email,
    })
  } catch (error) {
    console.error('[Newsletter] unsubscribe route error', error)
    return NextResponse.json(
      { ok: false, error: 'Invalid request.' },
      { status: 400 }
    )
  }
}
