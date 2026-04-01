import { NextResponse } from 'next/server'
import { sendResendEmail } from '@/lib/resend-send'
import {
  buildNewsletterWelcomeDocument,
  normalizeNewsletterEmail,
  newsletterFromIdentity,
  newsletterReplyTo,
  parseNewsletterNotifyEmails,
  sanitizeNewsletterInterests,
} from '@/lib/newsletter'
import {
  getSupabaseServer,
  getSsdSupabaseRuntimeDiagnostics,
} from '@/lib/ssd-campaign-server'

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

function newsletterSubscribeDebugEnabled(): boolean {
  return process.env.NEWSLETTER_SUBSCRIBE_DEBUG?.trim() === '1'
}

function sanitizeNewsletterDbError(error: unknown): {
  message: string | null
  code: string | null
  details: string | null
  hint: string | null
} {
  if (!error || typeof error !== 'object') {
    return { message: null, code: null, details: null, hint: null }
  }

  const row = error as {
    message?: unknown
    code?: unknown
    details?: unknown
    hint?: unknown
  }

  return {
    message: typeof row.message === 'string' ? row.message.slice(0, 500) : null,
    code: typeof row.code === 'string' ? row.code.slice(0, 100) : null,
    details: typeof row.details === 'string' ? row.details.slice(0, 500) : null,
    hint: typeof row.hint === 'string' ? row.hint.slice(0, 500) : null,
  }
}

function newsletterDebugPayload(error?: unknown) {
  if (!newsletterSubscribeDebugEnabled()) return undefined
  return {
    runtime: getSsdSupabaseRuntimeDiagnostics(),
    db_error: sanitizeNewsletterDbError(error),
  }
}

async function saveNewsletterSubscription(
  supabase: NonNullable<ReturnType<typeof getSupabaseServer>>,
  email: string,
  interests: string[],
  sourcePage: string,
  userAgent: string
): Promise<
  | { ok: true; mode: string; lifecycle: 'new' | 'reactivated' | 'already_active' | 'unknown' }
  | { ok: false; error: unknown }
> {
  let existingStatus: string | null = null
  let existingLookupFailed = false
  const preExisting = await supabase
    .from('newsletter_subscriptions')
    .select('email,status')
    .eq('email', email)
    .limit(1)

  if (!preExisting.error && preExisting.data && preExisting.data.length > 0) {
    const row = preExisting.data[0] as { status?: unknown }
    existingStatus = typeof row.status === 'string' ? row.status : null
  } else if (preExisting.error) {
    existingLookupFailed = true
  }

  const lifecycle =
    existingLookupFailed
      ? 'unknown'
      :
    existingStatus === 'unsubscribed'
      ? 'reactivated'
      : existingStatus === 'subscribed' || existingStatus === 'active'
        ? 'already_active'
        : existingStatus === null
          ? 'new'
          : 'unknown'

  const coreUpsert = await supabase
    .from('newsletter_subscriptions')
    .upsert(
      {
        email,
        status: 'subscribed',
      },
      { onConflict: 'email' }
    )

  if (!coreUpsert.error) {
    const enrich = await supabase
      .from('newsletter_subscriptions')
      .update({
        interests,
        source_page: sourcePage,
        user_agent: userAgent,
      })
      .eq('email', email)

    if (enrich.error) {
      console.warn('[Newsletter] enrich after core upsert failed', enrich.error)
      return { ok: true, mode: 'core_upsert_only', lifecycle }
    }

    return { ok: true, mode: 'core_upsert_plus_enrich', lifecycle }
  }

  console.warn('[Newsletter] core upsert failed; retrying legacy path', coreUpsert.error)

  const existing = await supabase
    .from('newsletter_subscriptions')
    .select('email')
    .eq('email', email)
    .limit(1)

  if (existing.error) {
    return { ok: false, error: existing.error }
  }

  if (existing.data && existing.data.length > 0) {
    const reactivate = await supabase
      .from('newsletter_subscriptions')
      .update({ status: 'subscribed' })
      .eq('email', email)

    if (!reactivate.error) return { ok: true, mode: 'reactivate_existing', lifecycle }
    return { ok: true, mode: 'existing_row', lifecycle }
  }

  const insertMinimal = await supabase
    .from('newsletter_subscriptions')
    .insert({
      email,
      status: 'subscribed',
    })

  if (!insertMinimal.error) return { ok: true, mode: 'insert_minimal', lifecycle }

  const insertEmailOnly = await supabase
    .from('newsletter_subscriptions')
    .insert({ email })

  if (!insertEmailOnly.error) return { ok: true, mode: 'insert_email_only', lifecycle }

  return { ok: false, error: insertEmailOnly.error }
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
      const debug = newsletterDebugPayload()
      return NextResponse.json(
        {
          ok: false,
          error: 'Database not configured.',
          ...(debug ? { debug } : {}),
        },
        { status: 500 }
      )
    }

    const saveResult = await saveNewsletterSubscription(
      supabase,
      email,
      interests,
      sourcePage,
      userAgent
    )

    if (!saveResult.ok) {
      console.error('[Newsletter] subscribe upsert failed', saveResult.error)
      const debug = newsletterDebugPayload(saveResult.error)
      return NextResponse.json(
        {
          ok: false,
          error: 'Failed to save subscription.',
          ...(debug ? { debug } : {}),
        },
        { status: 500 }
      )
    }

    console.log('[Newsletter] subscribe saved', {
      email,
      mode: saveResult.mode,
      lifecycle: saveResult.lifecycle,
    })

    const welcomeFrom = newsletterFromIdentity()
    if (welcomeFrom && (saveResult.lifecycle === 'new' || saveResult.lifecycle === 'reactivated')) {
      try {
        const welcome = buildNewsletterWelcomeDocument(email)
        await sendResendEmail({
          to: email,
          from: welcomeFrom,
          ...(newsletterReplyTo() ? { replyTo: newsletterReplyTo() } : {}),
          subject: welcome.subject,
          html: welcome.html,
          text: welcome.text,
        })
      } catch (welcomeError) {
        console.warn('[Newsletter] welcome email failed', welcomeError)
      }
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
    const debug = newsletterDebugPayload(error)
    return NextResponse.json(
      {
        ok: false,
        error: 'Failed to subscribe. Please try again.',
        ...(debug ? { debug } : {}),
      },
      { status: 500 }
    )
  }
}

