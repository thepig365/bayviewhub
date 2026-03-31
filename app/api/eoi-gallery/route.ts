import { NextResponse } from 'next/server'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'
import { sendResendEmail } from '@/lib/resend-send'
import { resolveGalleryEoiOwnerEmail } from '@/lib/lead-notify'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (body?.neverShow) {
      console.log('[EOI] gallery honeypot triggered')
      return NextResponse.json({ ok: true })
    }

    if (!body?.name || !body?.email || !body?.background || !body?.vision) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const payload = {
      receivedAt: new Date().toISOString(),
      source: 'gallery-founding-partner' as const,
      form: {
        name: String(body.name).trim(),
        email: String(body.email).trim(),
        phone: String(body.phone || '').trim(),
        linkedin: String(body.linkedin || '').trim(),
        background: String(body.background).trim(),
        vision: String(body.vision).trim(),
        partnershipPreference: String(body.experience || '').trim(),
        availability: String(body.availability || '').trim(),
        message: String(body.message || '').trim(),
      },
    }

    console.log('[EOI] gallery-founding-partner', payload.receivedAt, payload.form.email)

    const supabase = getSupabaseServer()
    if (!supabase) {
      return NextResponse.json(
        { ok: false, error: 'Database not configured' },
        { status: 500 }
      )
    }

    const { error: insertError } = await supabase.from('gallery_eoi_leads').insert({
      name: payload.form.name,
      email: payload.form.email,
      phone: payload.form.phone || null,
      linkedin: payload.form.linkedin || null,
      background: payload.form.background,
      vision: payload.form.vision,
      partnership_preference: payload.form.partnershipPreference || null,
      availability: payload.form.availability || null,
      source: payload.source,
    })

    if (insertError) {
      console.error('[EOI] gallery Supabase insert error:', insertError)
      return NextResponse.json(
        { ok: false, error: 'Failed to save your submission. Please try again.' },
        { status: 500 }
      )
    }

    const ownerTo = resolveGalleryEoiOwnerEmail()
    let emailedOwner = false
    try {
      emailedOwner = await sendResendEmail({
        to: ownerTo,
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
                <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">LinkedIn</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${payload.form.linkedin ? escapeHtml(payload.form.linkedin) : '-'}</td></tr>
                <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Availability</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${escapeHtml(payload.form.availability) || '-'}</td></tr>
              </table>

              <h4 style="color:#2d3748; margin-top:24px;">Background</h4>
              <p style="background:#f7fafc; padding:12px; border-radius:8px; white-space:pre-wrap;">${escapeHtml(payload.form.background)}</p>

              <h4 style="color:#2d3748; margin-top:24px;">Vision</h4>
              <p style="background:#f7fafc; padding:12px; border-radius:8px; white-space:pre-wrap;">${escapeHtml(payload.form.vision)}</p>

              ${payload.form.partnershipPreference ? `<h4 style="color:#2d3748; margin-top:24px;">Partnership Preference</h4><p style="background:#f7fafc; padding:12px; border-radius:8px; white-space:pre-wrap;">${escapeHtml(payload.form.partnershipPreference)}</p>` : ''}
              
              ${payload.form.message ? `<h4 style="color:#2d3748; margin-top:24px;">Additional Notes</h4><p style="background:#f7fafc; padding:12px; border-radius:8px; white-space:pre-wrap;">${escapeHtml(payload.form.message)}</p>` : ''}

              <p style="color:#718096; font-size:12px; margin-top:24px;">Received: ${payload.receivedAt} · Stored in Supabase <code>gallery_eoi_leads</code></p>
            </div>
          `,
      })
    } catch (e) {
      console.warn('[EOI] gallery owner email failed', e)
    }

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
  } catch (e: unknown) {
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
