import { NextResponse } from 'next/server'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'
import { sendResendEmail } from '@/lib/resend-send'
import { resolveEdibleGardensEoiOwnerEmail } from '@/lib/lead-notify'

export const runtime = 'nodejs'

async function postWebhook(payload: unknown) {
  const url = process.env['EOI_EDIBLE_GARDENS_WEBHOOK_URL']
  if (!url?.trim()) return false

  const secret = process.env['EOI_EDIBLE_GARDENS_WEBHOOK_SECRET']

  const res = await fetch(url.trim(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
    },
    body: JSON.stringify(payload),
  })

  return res.ok
}

type NormalizedEg = {
  source: string
  page?: string
  utm?: unknown
  form: {
    name: string
    email: string
    phone: string
    message: string
    applicantType?: string
    pilotStart?: string
    hasRunProgramsBefore?: string
    programExperience?: string
    availability?: string
    familySize?: string
  }
}

function normalizeEdibleBody(body: Record<string, unknown>): NormalizedEg | null {
  const form = body.form as Record<string, unknown> | undefined

  if (form?.name && form?.email) {
    const msg = typeof form.message === 'string' ? form.message.trim() : ''
    if (!msg) return null
    return {
      source: 'edible-gardens-partners',
      page: typeof body.page === 'string' ? body.page : undefined,
      utm: body.utm,
      form: {
        name: String(form.name).trim(),
        email: String(form.email).trim(),
        phone: typeof form.phone === 'string' ? form.phone.trim() : '',
        message: msg,
        applicantType: typeof form.applicantType === 'string' ? form.applicantType : '',
        pilotStart: typeof form.pilotStart === 'string' ? form.pilotStart : '',
        hasRunProgramsBefore:
          typeof form.hasRunProgramsBefore === 'string' ? form.hasRunProgramsBefore : '',
        programExperience: typeof form.programExperience === 'string' ? form.programExperience : '',
        availability: typeof form.availability === 'string' ? form.availability : '',
      },
    }
  }

  if (body.name && body.email) {
    const familySize = typeof body.familySize === 'string' ? body.familySize.trim() : ''
    const msg =
      typeof body.message === 'string' && body.message.trim()
        ? body.message.trim()
        : `Waitlist interest (family size: ${familySize || 'not specified'})`
    return {
      source:
        body.type === 'waitlist' ? 'edible-gardens-waitlist' : 'edible-gardens-legacy',
      form: {
        name: String(body.name).trim(),
        email: String(body.email).trim(),
        phone: '',
        message: msg,
        familySize,
      },
    }
  }

  return null
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>

    const formObj = body.form as { website?: string } | undefined
    if (formObj?.website) {
      console.log('[EOI] edible-gardens honeypot triggered')
      return NextResponse.json({ ok: true })
    }

    const normalized = normalizeEdibleBody(body)

    if (!normalized) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const payload = {
      receivedAt: new Date().toISOString(),
      page: normalized.page,
      utm: normalized.utm,
      form: normalized.form,
      source: normalized.source,
    }

    console.log('[EOI] edible-gardens', payload.source, payload.form.email)

    const supabase = getSupabaseServer()
    if (!supabase) {
      return NextResponse.json(
        { ok: false, error: 'Database not configured' },
        { status: 500 }
      )
    }

    const { error: insertError } = await supabase.from('edible_gardens_eoi_leads').insert({
      source: normalized.source,
      name: normalized.form.name,
      email: normalized.form.email,
      phone: normalized.form.phone || null,
      message: normalized.form.message,
      applicant_type: normalized.form.applicantType || null,
      pilot_start: normalized.form.pilotStart || null,
      has_run_programs_before: normalized.form.hasRunProgramsBefore || null,
      program_experience: normalized.form.programExperience || null,
      availability: normalized.form.availability || null,
      family_size: normalized.form.familySize || null,
      page: normalized.page || null,
      utm: normalized.utm != null ? normalized.utm : null,
    })

    if (insertError) {
      console.error('[EOI] edible-gardens Supabase insert error:', insertError)
      return NextResponse.json(
        { ok: false, error: 'Failed to save your submission. Please try again.' },
        { status: 500 }
      )
    }

    let forwardedWebhook = false
    try {
      forwardedWebhook = await postWebhook(payload)
    } catch (e) {
      console.warn('[EOI] edible-gardens webhook failed', e)
    }

    const ownerTo = resolveEdibleGardensEoiOwnerEmail()
    let emailedOwner = false
    try {
      emailedOwner = await sendResendEmail({
        to: ownerTo,
        subject: `New EOI: Edible Gardens (${normalized.source})`,
        replyTo: normalized.form.email,
        html: `
            <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.6; max-width:600px;">
              <h2 style="color:#1a365d;">Edible Gardens — new submission</h2>
              <p style="color:#4a5568;"><strong>Source:</strong> ${escapeHtml(normalized.source)}</p>
              <table style="width:100%; border-collapse:collapse; margin:20px 0;">
                <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold; width:140px;">Name</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${escapeHtml(normalized.form.name)}</td></tr>
                <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Email</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;"><a href="mailto:${escapeHtml(normalized.form.email)}">${escapeHtml(normalized.form.email)}</a></td></tr>
                <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Phone</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${escapeHtml(normalized.form.phone) || '-'}</td></tr>
                ${normalized.form.familySize ? `<tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Family size</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${escapeHtml(normalized.form.familySize)}</td></tr>` : ''}
              </table>
              <h4 style="color:#2d3748;">Message / details</h4>
              <pre style="background:#f7fafc; padding:12px; border-radius:8px; white-space:pre-wrap; font-family: system-ui, sans-serif;">${escapeHtml(normalized.form.message)}</pre>
              <p style="color:#718096; font-size:12px; margin-top:24px;">${payload.receivedAt} · Stored in <code>edible_gardens_eoi_leads</code></p>
            </div>
          `,
      })
    } catch (e) {
      console.warn('[EOI] edible-gardens owner email failed', e)
    }

    let emailedApplicant = false
    const shouldAutoReply = process.env['EOI_EDIBLE_GARDENS_AUTOREPLY'] === 'true'
    if (shouldAutoReply) {
      try {
        emailedApplicant = await sendResendEmail({
          to: normalized.form.email,
          subject: 'We received your Expression of Interest — Edible Gardens',
          html: `
            <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.5;">
              <p>Hi ${escapeHtml(normalized.form.name)},</p>
              <p>Thanks for your Expression of Interest for the Edible Gardens Founding Partner opportunity at Bayview Hub.</p>
              <p>We've received your submission and will reach out to arrange a short alignment conversation.</p>
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
  } catch (e: unknown) {
    console.error('[EOI] edible-gardens error', e)
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
