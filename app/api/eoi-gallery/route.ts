import { NextResponse } from 'next/server'

async function sendResendEmail(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM
  if (!apiKey || !from) return false

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  })

  return res.ok
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validation
    if (!body?.name || !body?.email || !body?.background || !body?.vision) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const payload = {
      receivedAt: new Date().toISOString(),
      source: 'gallery-founding-partner',
      form: {
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        background: body.background,
        vision: body.vision,
        partnershipPreference: body.experience || '',
        availability: body.availability || '',
        message: body.message || '',
      },
    }

    // Log for Vercel logs
    console.log('[EOI] gallery-founding-partner', payload)

    // Send notification email to owner
    let emailedOwner = false
    const notifyEmail = process.env.EOI_GALLERY_NOTIFY_EMAIL || process.env.EOI_EDIBLE_GARDENS_NOTIFY_EMAIL
    
    if (notifyEmail) {
      try {
        emailedOwner = await sendResendEmail({
          to: notifyEmail,
          subject: 'New EOI: Gallery & Creative Programs Founding Partner',
          replyTo: payload.form.email,
          html: `
            <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.6; max-width:600px;">
              <h2 style="color:#1a365d;">New Expression of Interest</h2>
              <h3 style="color:#2d3748;">Gallery & Creative Wellbeing Programs</h3>
              
              <table style="width:100%; border-collapse:collapse; margin:20px 0;">
                <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold; width:140px;">Name</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${escapeHtml(payload.form.name)}</td></tr>
                <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Email</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;"><a href="mailto:${escapeHtml(payload.form.email)}">${escapeHtml(payload.form.email)}</a></td></tr>
                <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Phone</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${escapeHtml(payload.form.phone) || '-'}</td></tr>
                <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Availability</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${escapeHtml(payload.form.availability) || '-'}</td></tr>
              </table>

              <h4 style="color:#2d3748; margin-top:24px;">Background</h4>
              <p style="background:#f7fafc; padding:12px; border-radius:8px; white-space:pre-wrap;">${escapeHtml(payload.form.background)}</p>

              <h4 style="color:#2d3748; margin-top:24px;">Vision</h4>
              <p style="background:#f7fafc; padding:12px; border-radius:8px; white-space:pre-wrap;">${escapeHtml(payload.form.vision)}</p>

              ${payload.form.partnershipPreference ? `<h4 style="color:#2d3748; margin-top:24px;">Partnership Preference</h4><p style="background:#f7fafc; padding:12px; border-radius:8px; white-space:pre-wrap;">${escapeHtml(payload.form.partnershipPreference)}</p>` : ''}
              
              ${payload.form.message ? `<h4 style="color:#2d3748; margin-top:24px;">Additional Notes</h4><p style="background:#f7fafc; padding:12px; border-radius:8px; white-space:pre-wrap;">${escapeHtml(payload.form.message)}</p>` : ''}

              <p style="color:#718096; font-size:12px; margin-top:24px;">Received: ${payload.receivedAt}</p>
            </div>
          `,
        })
      } catch (e) {
        console.warn('[EOI] gallery owner email failed', e)
      }
    }

    // Auto-reply to applicant
    let emailedApplicant = false
    try {
      emailedApplicant = await sendResendEmail({
        to: payload.form.email,
        subject: 'We received your Expression of Interest — Bayview Arts Gallery',
        html: `
          <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.6; max-width:600px;">
            <p>Hi ${escapeHtml(payload.form.name)},</p>
            <p>Thank you for your Expression of Interest in the <strong>Gallery & Creative Wellbeing Programs Founding Partner</strong> opportunity at Bayview Hub.</p>
            <p>We've received your submission and will review it carefully. If there's alignment, we'll reach out to arrange a conversation.</p>
            <p>In the meantime, feel free to explore more about Bayview Hub at <a href="https://www.bayviewhub.me">www.bayviewhub.me</a>.</p>
            <p style="color:#666; font-size:12px; margin-top:24px;">(Submitting an EOI does not create any obligation for either party.)</p>
            <p>Warm regards,<br/>— Bayview Hub Team</p>
          </div>
        `,
      })
    } catch (e) {
      console.warn('[EOI] gallery auto-reply failed', e)
    }

    return NextResponse.json({ ok: true, emailedOwner, emailedApplicant })
  } catch (e: any) {
    console.error('[EOI] gallery error', e)
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 })
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
