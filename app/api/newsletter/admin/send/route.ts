import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { sendResendEmail } from '@/lib/resend-send'
import {
  buildNewsletterEmailDocument,
  buildNewsletterUnsubscribeUrl,
  NEWSLETTER_ACTIVE_STATUSES,
  newsletterFromIdentity,
  newsletterReplyTo,
  normalizeNewsletterEmail,
  sanitizeNewsletterHtml,
  sanitizeNewsletterText,
} from '@/lib/newsletter'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
} from '@/lib/newsletter-admin'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

export const runtime = 'nodejs'

type CampaignRow = {
  id: string
}

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
    const mode = body?.mode === 'test' ? 'test' : body?.mode === 'send_all' ? 'send_all' : null
    if (!mode) {
      return NextResponse.json(
        { ok: false, error: 'Mode must be test or send_all.' },
        { status: 400 }
      )
    }

    const subject = sanitizeNewsletterText(body?.subject, 180)
    const previewText = sanitizeNewsletterText(body?.previewText, 180)
    const introText = sanitizeNewsletterText(body?.introText, 800)
    const htmlBody = sanitizeNewsletterHtml(body?.htmlBody)
    if (!subject || !htmlBody) {
      return NextResponse.json(
        { ok: false, error: 'Subject and HTML body are required.' },
        { status: 400 }
      )
    }

    const testEmail = mode === 'test' ? normalizeNewsletterEmail(body?.testEmail) : null
    if (mode === 'test' && !testEmail) {
      return NextResponse.json(
        { ok: false, error: 'A valid test email is required.' },
        { status: 400 }
      )
    }

    if (mode === 'send_all' && sanitizeNewsletterText(body?.confirmText, 12) !== 'SEND') {
      return NextResponse.json(
        { ok: false, error: 'Type SEND to confirm a bulk send.' },
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

    const from = newsletterFromIdentity()
    if (!from) {
      return NextResponse.json(
        { ok: false, error: 'Newsletter sender is not configured.' },
        { status: 500 }
      )
    }

    const unsubscribeCheck = buildNewsletterUnsubscribeUrl('newsletter-safety@bayviewhub.me')
    if (!unsubscribeCheck.includes('sig=')) {
      return NextResponse.json(
        { ok: false, error: 'Unsubscribe signing is not configured.' },
        { status: 500 }
      )
    }

    const replyTo = newsletterReplyTo()
    const campaignInsert = {
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
      send_kind: mode,
      status: 'draft',
      target_count: 0,
      sent_count: 0,
      failed_count: 0,
      from_identity: from,
      reply_to: replyTo || null,
      test_recipient: testEmail,
    }

    const { data: campaign, error: campaignError } = await supabase
      .from('newsletter_campaigns')
      .insert(campaignInsert)
      .select('id')
      .single<CampaignRow>()

    if (campaignError || !campaign?.id) {
      console.error('[Newsletter Admin] campaign insert failed', campaignError)
      return NextResponse.json(
        {
          ok: false,
          error: 'Newsletter tables are missing or unavailable. Run docs/supabase-newsletter.sql first.',
        },
        { status: 500 }
      )
    }

    if (mode === 'test') {
      const document = buildNewsletterEmailDocument({
        subject,
        previewText,
        introText,
        htmlBody,
        unsubscribeUrl: buildNewsletterUnsubscribeUrl(testEmail!),
        isTest: true,
      })

      const sent = await sendResendEmail({
        to: testEmail!,
        from,
        ...(replyTo ? { replyTo } : {}),
        subject,
        html: document.html,
        text: document.text,
      })

      await supabase.from('newsletter_deliveries').insert({
        campaign_id: campaign.id,
        recipient_email: testEmail!,
        is_test: true,
        status: sent ? 'sent' : 'failed',
        error_message: sent ? null : 'Resend did not accept the test send.',
        sent_at: sent ? new Date().toISOString() : null,
      })

      await supabase
        .from('newsletter_campaigns')
        .update({
          test_recipient: testEmail,
          target_count: 1,
          sent_count: sent ? 1 : 0,
          failed_count: sent ? 0 : 1,
          status: sent ? 'sent' : 'failed',
          sent_at: new Date().toISOString(),
        })
        .eq('id', campaign.id)

      return NextResponse.json({
        ok: sent,
        mode,
        campaignId: campaign.id,
        targetCount: 1,
        sentCount: sent ? 1 : 0,
        failedCount: sent ? 0 : 1,
      })
    }

    const { data: subscribers, error: subscribersError } = await supabase
      .from('newsletter_subscriptions')
      .select('email,status')
      .in('status', [...NEWSLETTER_ACTIVE_STATUSES])

    if (subscribersError) {
      console.error('[Newsletter Admin] subscriber query failed', subscribersError)
      return NextResponse.json(
        { ok: false, error: 'Failed to load subscribers.' },
        { status: 500 }
      )
    }

    const recipients = Array.from(
      new Set(
        (subscribers || [])
          .map((row) => normalizeNewsletterEmail(row.email))
          .filter((email): email is string => Boolean(email))
      )
    )

    if (!recipients.length) {
      await supabase
        .from('newsletter_campaigns')
        .update({
          status: 'failed',
          target_count: 0,
          failed_count: 0,
          sent_count: 0,
        })
        .eq('id', campaign.id)

      return NextResponse.json(
        { ok: false, error: 'No active subscribers found.' },
        { status: 400 }
      )
    }

    let sentCount = 0
    let failedCount = 0
    const now = new Date().toISOString()
    const deliveryRows: Array<{
      campaign_id: string
      recipient_email: string
      is_test: boolean
      status: 'sent' | 'failed'
      error_message: string | null
      sent_at: string | null
    }> = []

    const chunkSize = 10
    for (let index = 0; index < recipients.length; index += chunkSize) {
      const chunk = recipients.slice(index, index + chunkSize)
      const chunkResults = await Promise.all(
        chunk.map(async (recipient) => {
          const document = buildNewsletterEmailDocument({
            subject,
            previewText,
            introText,
            htmlBody,
            unsubscribeUrl: buildNewsletterUnsubscribeUrl(recipient),
          })
          const sent = await sendResendEmail({
            to: recipient,
            from,
            ...(replyTo ? { replyTo } : {}),
            subject,
            html: document.html,
            text: document.text,
          })
          return { recipient, sent }
        })
      )

      for (const result of chunkResults) {
        if (result.sent) sentCount += 1
        else failedCount += 1
        deliveryRows.push({
          campaign_id: campaign.id,
          recipient_email: result.recipient,
          is_test: false,
          status: result.sent ? 'sent' : 'failed',
          error_message: result.sent ? null : 'Resend did not accept the send.',
          sent_at: result.sent ? now : null,
        })
      }
    }

    const { error: deliveriesError } = await supabase
      .from('newsletter_deliveries')
      .insert(deliveryRows)

    if (deliveriesError) {
      console.error('[Newsletter Admin] delivery insert failed', deliveriesError)
    }

    await supabase
      .from('newsletter_campaigns')
      .update({
        target_count: recipients.length,
        sent_count: sentCount,
        failed_count: failedCount,
        status: failedCount === 0 ? 'sent' : sentCount === 0 ? 'failed' : 'partial',
        sent_at: new Date().toISOString(),
      })
      .eq('id', campaign.id)

    return NextResponse.json({
      ok: failedCount === 0,
      mode,
      campaignId: campaign.id,
      targetCount: recipients.length,
      sentCount,
      failedCount,
    })
  } catch (error) {
    console.error('[Newsletter Admin] send route error', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to send newsletter.' },
      { status: 500 }
    )
  }
}
