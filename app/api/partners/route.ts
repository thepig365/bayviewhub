import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { FOUNDING_ROLES } from '@/lib/constants'
import { sendResendEmail } from '@/lib/resend-send'
import { parsePartnersNotifyEmails } from '@/lib/lead-notify'

export const runtime = 'nodejs'

function foundingRoleTitle(roleId: string): string {
  const row = FOUNDING_ROLES.find((r) => r.id === roleId)
  return row?.title ?? roleId
}

/** One retry on transient Resend/network failure (avoids duplicate if first call already succeeded). */
async function sendPartnerEmailWithRetry(
  opts: Parameters<typeof sendResendEmail>[0],
  kind: 'owner' | 'applicant'
): Promise<boolean> {
  const first = await sendResendEmail(opts)
  if (first) return true
  console.warn('[Application] partners resend first attempt failed, retrying', { kind })
  await new Promise((r) => setTimeout(r, 600))
  return sendResendEmail(opts)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Honeypot check
    if (body.website) {
      console.log('[Partners] Honeypot triggered')
      return NextResponse.json({ ok: true })
    }
    
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

    const notifyTo = parsePartnersNotifyEmails()
    const toPrimary = notifyTo[0]
    const bccRest = notifyTo.length > 1 ? notifyTo.slice(1) : undefined

    let emailedOwner = false
    if (toPrimary) {
      try {
        emailedOwner = await sendPartnerEmailWithRetry(
          {
          to: toPrimary,
          ...(bccRest?.length ? { bcc: bccRest } : {}),
          subject: `[PARTNER] ${foundingRoleTitle(String(body.role))} — ${body.name}`,
          replyTo: payload.form.email,
          html: `
            <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.6; max-width:600px;">
              <h2 style="color:#1a365d;">New Founding Partner Application</h2>
              <h3 style="color:#2d3748;">Role: ${escapeHtml(foundingRoleTitle(payload.form.role))}</h3>
              
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
        },
          'owner'
        )
      } catch (e) {
        console.warn('[Application] partners owner email failed', e)
      }
    }

    const roleTitle = foundingRoleTitle(payload.form.role)

    let emailedApplicant = false
    try {
      emailedApplicant = await sendPartnerEmailWithRetry(
        {
        to: payload.form.email,
        subject: 'Thank you — application received · Bayview Hub Founding Partners',
        html: `
          <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.6; max-width:600px;">
            <p style="font-size:18px;font-weight:600;color:#1a365d;">Thank you — application received</p>
            <p>Hi ${escapeHtml(payload.form.name)},</p>
            <p>Thank you for applying for the <strong>${escapeHtml(roleTitle)}</strong> Founding Partner role at Bayview Hub.</p>
            <p>We&#039;ve received your submission. Our team will review it and contact you if we&#039;d like to explore next steps together.</p>
            <p>In the meantime, feel free to explore more about Bayview Hub at <a href="https://www.bayviewhub.me">www.bayviewhub.me</a>.</p>
            <p>Warm regards,<br/>— Bayview Hub Team</p>
          </div>
        `,
        },
        'applicant'
      )
    } catch (e) {
      console.warn('[Application] partners auto-reply failed', e)
    }

    if (!emailedOwner || !emailedApplicant) {
      console.warn('[Application] partners resend summary', { emailedOwner, emailedApplicant })
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
