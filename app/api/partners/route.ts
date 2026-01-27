import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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
    if (!body?.name || !body?.email || !body?.role || !body?.plan) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const payload = {
      receivedAt: new Date().toISOString(),
      source: 'founding-partners',
      form: {
        name: body.name,
        email: body.email,
        linkedin: body.linkedin || '',
        role: body.role,
        plan: body.plan,
        availability: body.availability || '',
        hasQualification: body.hasQualification || false,
        hasInsurance: body.hasInsurance || false,
      },
    }

    // Log for Vercel logs
    console.log('[Application] founding-partners', payload)

    // Save to Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        )
        
        const { error } = await supabase.from('partner_applications').insert({
          name: payload.form.name,
          email: payload.form.email,
          linkedin: payload.form.linkedin,
          role: payload.form.role,
          plan: payload.form.plan,
          availability: payload.form.availability,
          has_qualification: payload.form.hasQualification,
          has_insurance: payload.form.hasInsurance,
          created_at: payload.receivedAt,
        })
        
        if (error) {
          console.error('[Application] Supabase insert error:', error)
        }
      } catch (e) {
        console.warn('[Application] Supabase save failed', e)
      }
    }

    // Send notification email to owner
    let emailedOwner = false
    const notifyEmail = process.env.PARTNERS_NOTIFY_EMAIL || process.env.EOI_GALLERY_NOTIFY_EMAIL || process.env.EOI_EDIBLE_GARDENS_NOTIFY_EMAIL
    
    if (notifyEmail) {
      try {
        emailedOwner = await sendResendEmail({
          to: notifyEmail,
          subject: `New Founding Partner Application: ${body.role}`,
          replyTo: payload.form.email,
          html: `
            <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.6; max-width:600px;">
              <h2 style="color:#1a365d;">New Founding Partner Application</h2>
              <h3 style="color:#2d3748;">Role: ${escapeHtml(payload.form.role)}</h3>
              
              <table style="width:100%; border-collapse:collapse; margin:20px 0;">
                <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold; width:140px;">Name</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${escapeHtml(payload.form.name)}</td></tr>
                <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Email</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;"><a href="mailto:${escapeHtml(payload.form.email)}">${escapeHtml(payload.form.email)}</a></td></tr>
                <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">LinkedIn</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${payload.form.linkedin ? `<a href="${escapeHtml(payload.form.linkedin)}">${escapeHtml(payload.form.linkedin)}</a>` : '-'}</td></tr>
                <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Availability</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${escapeHtml(payload.form.availability) || '-'}</td></tr>
              </table>

              <h4 style="color:#2d3748; margin-top:24px;">90-Day Plan</h4>
              <p style="background:#f7fafc; padding:12px; border-radius:8px; white-space:pre-wrap;">${escapeHtml(payload.form.plan)}</p>

              ${payload.form.role === 'art-therapy' && (payload.form.hasQualification || payload.form.hasInsurance) ? `
                <h4 style="color:#2d3748; margin-top:24px;">Qualifications</h4>
                <ul style="background:#f7fafc; padding:12px 12px 12px 32px; border-radius:8px;">
                  ${payload.form.hasQualification ? '<li>Has relevant art therapy qualifications</li>' : ''}
                  ${payload.form.hasInsurance ? '<li>Has/can obtain professional indemnity insurance</li>' : ''}
                </ul>
              ` : ''}

              <p style="color:#718096; font-size:12px; margin-top:24px;">Received: ${payload.receivedAt}</p>
            </div>
          `,
        })
      } catch (e) {
        console.warn('[Application] partners owner email failed', e)
      }
    }

    // Auto-reply to applicant
    let emailedApplicant = false
    try {
      emailedApplicant = await sendResendEmail({
        to: payload.form.email,
        subject: 'Application Received — Bayview Hub Founding Partners',
        html: `
          <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.6; max-width:600px;">
            <p>Hi ${escapeHtml(payload.form.name)},</p>
            <p>Thank you for applying to the <strong>${escapeHtml(payload.form.role)}</strong> Founding Partner role at Bayview Hub.</p>
            <p>We've received your application and will review it carefully. If there's alignment, we'll reach out to arrange a conversation.</p>
            <p>In the meantime, feel free to explore more about Bayview Hub at <a href="https://www.bayviewhub.me">www.bayviewhub.me</a>.</p>
            <p>Warm regards,<br/>— Bayview Hub Team</p>
          </div>
        `,
      })
    } catch (e) {
      console.warn('[Application] partners auto-reply failed', e)
    }

    return NextResponse.json({ ok: true, emailedOwner, emailedApplicant })
  } catch (e: any) {
    console.error('[Application] partners error', e)
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
