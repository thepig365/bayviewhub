import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
} from '@/lib/newsletter-admin'
import {
  buildNewsletterEmailDocument,
  newsletterFromIdentity,
  newsletterReplyTo,
  sanitizeNewsletterHtml,
  sanitizeNewsletterText,
} from '@/lib/newsletter'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

export const runtime = 'nodejs'

async function rejectIfUnauthorized() {
  const cookieStore = await cookies()
  const token = cookieStore.get(NEWSLETTER_ADMIN_COOKIE)?.value
  if (!isNewsletterAdminCookieValid(token)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 })
  }
  return null
}

export async function POST(request: Request) {
  const unauthorized = await rejectIfUnauthorized()
  if (unauthorized) return unauthorized

  try {
    const body = await request.json()
    const campaignId =
      typeof body?.campaignId === 'string' && body.campaignId.trim() ? body.campaignId.trim() : null
    const subject = sanitizeNewsletterText(body?.subject, 180)
    const previewText = sanitizeNewsletterText(body?.previewText, 180)
    const introText = sanitizeNewsletterText(body?.introText, 800)
    const htmlBody = sanitizeNewsletterHtml(body?.htmlBody)

    if (!subject || !htmlBody) {
      return NextResponse.json(
        { ok: false, error: 'Subject and HTML body are required to save a draft.' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseServer()
    if (!supabase) {
      return NextResponse.json({ ok: false, error: 'Database not configured.' }, { status: 500 })
    }

    const from = newsletterFromIdentity()
    if (!from) {
      return NextResponse.json(
        { ok: false, error: 'Newsletter sender is not configured.' },
        { status: 500 }
      )
    }

    const payload = {
      subject,
      preview_text: previewText || null,
      intro_text: introText || null,
      html_body: htmlBody,
      plain_text: buildNewsletterEmailDocument({
        subject,
        previewText,
        introText,
        htmlBody,
      }).text,
      send_kind: 'test' as const,
      status: 'draft' as const,
      target_count: 0,
      sent_count: 0,
      failed_count: 0,
      from_identity: from,
      reply_to: newsletterReplyTo() || null,
      test_recipient: null,
    }

    if (campaignId) {
      const { data, error } = await supabase
        .from('newsletter_campaigns')
        .update(payload)
        .eq('id', campaignId)
        .select('id')
        .single<{ id: string }>()

      if (error || !data?.id) {
        console.error('[Newsletter Draft] update failed', error)
        return NextResponse.json({ ok: false, error: 'Could not update draft.' }, { status: 500 })
      }

      return NextResponse.json({ ok: true, campaignId: data.id, action: 'updated' })
    }

    const { data, error } = await supabase
      .from('newsletter_campaigns')
      .insert(payload)
      .select('id')
      .single<{ id: string }>()

    if (error || !data?.id) {
      console.error('[Newsletter Draft] create failed', error)
      return NextResponse.json(
        { ok: false, error: 'Newsletter draft table is missing or unavailable.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, campaignId: data.id, action: 'created' })
  } catch (error) {
    console.error('[Newsletter Draft] route error', error)
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }
}
