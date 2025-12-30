import { NextResponse } from 'next/server'

async function postWebhook(payload: any) {
  const url = process.env.EOI_EDIBLE_GARDENS_WEBHOOK_URL
  if (!url) return false

  const secret = process.env.EOI_EDIBLE_GARDENS_WEBHOOK_SECRET

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
    },
    body: JSON.stringify(payload),
  })

  return res.ok
}

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
    // Minimal validation
    if (!body?.form?.name || !body?.form?.email || !body?.form?.message) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const payload = {
      receivedAt: new Date().toISOString(),
      page: body?.page,
      utm: body?.utm,
      form: body?.form,
    }

    // Production-safe default: log on server (visible in Vercel logs).
    // You can later wire this to email/CRM without changing the frontend payload.
    console.log('[EOI] edible-gardens', payload)

    // Optional forwarding (no extra deps): webhook + email.
    // Webhook is ideal for Zapier/Make/Google Sheets/HubSpot/Airtable.
    let forwardedWebhook = false
    try {
      forwardedWebhook = await postWebhook(payload)
    } catch (e) {
      console.warn('[EOI] edible-gardens webhook failed', e)
    }

    // Optional owner notification + applicant auto-reply via Resend
    // Env:
    // - RESEND_API_KEY, RESEND_FROM
    // - EOI_EDIBLE_GARDENS_NOTIFY_EMAIL (owner inbox)
    // - EOI_EDIBLE_GARDENS_AUTOREPLY (true/false)
    let emailedOwner = false
    let emailedApplicant = false

    const notifyEmail = process.env.EOI_EDIBLE_GARDENS_NOTIFY_EMAIL
    if (notifyEmail) {
      try {
        emailedOwner = await sendResendEmail({
          to: notifyEmail,
          subject: 'New EOI: Edible Gardens Founding Partner',
          replyTo: payload.form.email,
          html: `<pre style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; white-space: pre-wrap;">${escapeHtml(
            JSON.stringify(payload, null, 2)
          )}</pre>`,
        })
      } catch (e) {
        console.warn('[EOI] edible-gardens owner email failed', e)
      }
    }

    const shouldAutoReply = process.env.EOI_EDIBLE_GARDENS_AUTOREPLY === 'true'
    if (shouldAutoReply) {
      try {
        emailedApplicant = await sendResendEmail({
          to: payload.form.email,
          subject: 'We received your Expression of Interest — Edible Gardens',
          html: `
            <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.5;">
              <p>Hi ${escapeHtml(payload.form.name)},</p>
              <p>Thanks for your Expression of Interest for the Edible Gardens Founding Partner opportunity at Bayview Hub.</p>
              <p>We’ve received your submission and will reach out to arrange a short alignment conversation.</p>
              <p style="color:#666;font-size:12px;">(Submitting an EOI does not create any obligation for either party.)</p>
              <p>— Bayview Hub</p>
            </div>
          `,
        })
      } catch (e) {
        console.warn('[EOI] edible-gardens auto-reply failed', e)
      }
    }

    return NextResponse.json({ ok: true, forwardedWebhook, emailedOwner, emailedApplicant })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
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


