import { NextResponse } from 'next/server'
import { SITE_CONFIG } from '@/lib/constants'
import { resolveWorkshopsNotifyEmail } from '@/lib/lead-notify'
import { resendApplicantNoreplyFrom, sendResendEmail } from '@/lib/resend-send'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string
      email?: string
      message?: string
      website?: string
    }

    if (body.website) {
      console.log('[workshops] honeypot triggered')
      return NextResponse.json({ ok: true })
    }

    const name = body.name?.trim() || ''
    const email = body.email?.trim() || ''
    const message = body.message?.trim() || ''

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: 'Name and email are required.' }, { status: 400 })
    }

    const notifyTo = resolveWorkshopsNotifyEmail()
    const applicantFrom = resendApplicantNoreplyFrom()

    const emailedOwner = await sendResendEmail({
      to: notifyTo,
      subject: `New workshop enquiry — ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.6; max-width:600px;">
          <h2 style="color:#1f2937;">New workshop enquiry</h2>
          <table style="width:100%; border-collapse:collapse; margin:20px 0;">
            <tr><td style="padding:8px 0; border-bottom:1px solid #e5e7eb; font-weight:bold; width:120px;">Name</td><td style="padding:8px 0; border-bottom:1px solid #e5e7eb;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0; border-bottom:1px solid #e5e7eb; font-weight:bold;">Email</td><td style="padding:8px 0; border-bottom:1px solid #e5e7eb;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 0; border-bottom:1px solid #e5e7eb; font-weight:bold;">Page</td><td style="padding:8px 0; border-bottom:1px solid #e5e7eb;">/workshops</td></tr>
          </table>
          <h3 style="color:#1f2937; margin-top:24px;">Message</h3>
          <pre style="background:#f9fafb; padding:12px; border-radius:8px; white-space:pre-wrap; font-family:system-ui, sans-serif;">${escapeHtml(message || '-')}</pre>
        </div>
      `,
    })

    if (!emailedOwner) {
      return NextResponse.json(
        { ok: false, error: `Unable to send right now. Please email ${SITE_CONFIG.email}.` },
        { status: 500 }
      )
    }

    let emailedApplicant = false
    try {
      emailedApplicant = await sendResendEmail({
        to: email,
        ...(applicantFrom ? { from: applicantFrom } : {}),
        subject: 'Workshop enquiry received — Bayview Hub',
        html: `
          <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.6; max-width:600px;">
            <p style="font-size:18px; font-weight:600; color:#1f2937;">Workshop enquiry received</p>
            <p>Hi ${escapeHtml(name)},</p>
            <p>Thank you for your enquiry about art workshops at Bayview Hub.</p>
            <p>We will respond within 5 business days with programme details and availability.</p>
            <p>Warm regards,<br />Bayview Hub</p>
          </div>
        `,
      })
    } catch (error) {
      console.warn('[workshops] applicant email failed', error)
    }

    return NextResponse.json({ ok: true, emailedOwner, emailedApplicant })
  } catch (error) {
    console.error('[workshops] request failed', error)
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }
}

function escapeHtml(str: string) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
