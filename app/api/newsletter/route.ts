import { NextResponse } from 'next/server'
import { sendResendEmail } from '@/lib/resend-send'
import {
  normalizeNewsletterEmail,
  parseNewsletterNotifyEmails,
  sanitizeNewsletterInterests,
} from '@/lib/newsletter'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

export const runtime = 'nodejs'

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 10

function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(request: Request): boolean {
  const key = getRateLimitKey(request)
  const now = Date.now()
  const record = rateLimitStore.get(key)
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  record.count++
  return record.count > RATE_LIMIT_MAX_REQUESTS
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(request)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    if (body?.website) {
      return NextResponse.json({ ok: true, message: 'Successfully subscribed!' })
    }

    const email = normalizeNewsletterEmail(body?.email)
    if (!email) {
      return NextResponse.json(
        { ok: false, error: 'Valid email is required.' },
        { status: 400 }
      )
    }

    const interests = sanitizeNewsletterInterests(body?.interests)
    const sourcePage = request.headers.get('referer') || 'unknown'
    const userAgent = request.headers.get('user-agent') || ''

    const supabase = getSupabaseServer()
    if (!supabase) {
      return NextResponse.json(
        { ok: false, error: 'Database not configured.' },
        { status: 500 }
      )
    }

    const { error } = await supabase
      .from('newsletter_subscriptions')
      .upsert(
        {
          email,
          interests,
          source_page: sourcePage,
          user_agent: userAgent,
          status: 'active',
        },
        { onConflict: 'email' }
      )

    if (error) {
      console.error('[Newsletter] subscribe upsert failed', error)
      return NextResponse.json(
        { ok: false, error: 'Failed to save subscription.' },
        { status: 500 }
      )
    }

    const notifyList = parseNewsletterNotifyEmails()
    const toPrimary = notifyList[0]
    const bccRest = notifyList.length > 1 ? notifyList.slice(1) : undefined
    const timestamp = new Date().toISOString()
    const interestsStr = interests.length ? interests.join(', ') : 'General updates'

    if (toPrimary) {
      try {
        await sendResendEmail({
          to: toPrimary,
          ...(bccRest?.length ? { bcc: bccRest } : {}),
          replyTo: email,
          subject: `[NEWSLETTER] subscribe — ${email}`,
          html: `
            <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;max-width:600px;">
              <h2 style="color:#1a365d;">New newsletter subscription</h2>
              <table style="width:100%;border-collapse:collapse;margin:20px 0;">
                <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-weight:bold;width:140px;">Timestamp</td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">${escapeHtml(timestamp)}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-weight:bold;">Email</td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">${escapeHtml(email)}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-weight:bold;">Interests</td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">${escapeHtml(interestsStr)}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-weight:bold;">Source page</td><td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">${escapeHtml(sourcePage)}</td></tr>
              </table>
            </div>
          `,
        })
      } catch (notifyError) {
        console.warn('[Newsletter] admin notify failed', notifyError)
      }
    }

    return NextResponse.json({ ok: true, message: 'Successfully subscribed!' })
  } catch (error) {
    console.error('[Newsletter] subscribe error', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

