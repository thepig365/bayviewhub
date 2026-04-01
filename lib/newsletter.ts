import { createHmac, timingSafeEqual } from 'crypto'
import { campaignOwnerEmail } from '@/lib/ssd-campaign-server'

export type NewsletterStatus = 'subscribed' | 'unsubscribed'
export const NEWSLETTER_ACTIVE_STATUSES = ['subscribed', 'active'] as const

export type NewsletterComposerInput = {
  subject: string
  previewText?: string
  introText?: string
  htmlBody: string
  unsubscribeUrl?: string
  isTest?: boolean
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function envTrim(name: string): string | undefined {
  const value = process.env[name]
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length ? trimmed : undefined
}

export function normalizeNewsletterEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const email = value.trim().toLowerCase()
  if (!EMAIL_RE.test(email)) return null
  return email.slice(0, 254)
}

export function sanitizeNewsletterText(value: unknown, max = 500): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export function sanitizeNewsletterHtml(value: unknown, max = 120_000): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export function sanitizeNewsletterInterests(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((entry): entry is string => typeof entry === 'string')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .slice(0, 12)
}

export function newsletterBaseUrl(): string {
  return envTrim('NEXT_PUBLIC_BASE_URL') || 'https://www.bayviewhub.me'
}

export function parseNewsletterNotifyEmails(): string[] {
  const raw = envTrim('NEWSLETTER_NOTIFY_TO')
  if (!raw) return [campaignOwnerEmail()]
  const emails = raw.split(',').map((item) => item.trim()).filter(Boolean)
  return emails.length ? emails : [campaignOwnerEmail()]
}

export function newsletterFromIdentity(): string | undefined {
  return (
    envTrim('RESEND_FROM_NEWSLETTER') ||
    envTrim('RESEND_FROM_NOREPLY') ||
    envTrim('RESEND_FROM')
  )
}

export function newsletterReplyTo(): string | undefined {
  return envTrim('NEWSLETTER_REPLY_TO')
}

function unsubscribeSecret(): string {
  return (
    envTrim('NEWSLETTER_UNSUBSCRIBE_SECRET') ||
    envTrim('CRON_SECRET') ||
    envTrim('SUPABASE_SECRET_KEY') ||
    envTrim('SUPABASE_SERVICE_ROLE_KEY') ||
    (process.env.NODE_ENV === 'development' ? 'bayviewhub-newsletter-dev-only' : '')
  )
}

function unsubscribeSignature(email: string): string {
  const secret = unsubscribeSecret()
  if (!secret) return ''
  return createHmac('sha256', secret)
    .update(email)
    .digest('hex')
}

export function buildNewsletterUnsubscribeUrl(email: string): string {
  const normalized = normalizeNewsletterEmail(email)
  const signature = normalized ? unsubscribeSignature(normalized) : ''
  if (!normalized || !signature) return `${newsletterBaseUrl()}/newsletter/unsubscribe`
  const params = new URLSearchParams({ email: normalized, sig: signature })
  return `${newsletterBaseUrl()}/newsletter/unsubscribe?${params.toString()}`
}

export function verifyNewsletterUnsubscribeSignature(email: string, sig: string): boolean {
  const normalized = normalizeNewsletterEmail(email)
  if (!normalized || !sig) return false
  const expected = unsubscribeSignature(normalized)
  if (expected.length !== sig.length) return false
  return timingSafeEqual(Buffer.from(expected), Buffer.from(sig))
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function buildNewsletterEmailDocument(input: NewsletterComposerInput): { html: string; text: string } {
  const previewText = sanitizeNewsletterText(input.previewText, 180)
  const introText = sanitizeNewsletterText(input.introText, 800)
  const subject = sanitizeNewsletterText(input.subject, 180)
  const unsubscribeUrl = input.unsubscribeUrl
  const htmlBody = sanitizeNewsletterHtml(input.htmlBody)
  const testLabel = input.isTest
    ? '<p style="font-size:12px;color:#9a3412;background:#fff7ed;padding:10px 12px;border-radius:8px;">Test send: this message was generated from the Bayview Hub private newsletter tool.</p>'
    : ''

  const footer = unsubscribeUrl
    ? `<p style="margin-top:28px;font-size:12px;color:#64748b;">You are receiving this email because you subscribed to Bayview Hub updates. <a href="${unsubscribeUrl}" style="color:#0f766e;">Unsubscribe</a>.</p>`
    : '<p style="margin-top:28px;font-size:12px;color:#64748b;">This was a test send from the Bayview Hub newsletter tool.</p>'

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${escapeHtml(subject)}</title>
      </head>
      <body style="margin:0;padding:0;background:#f8fafc;color:#0f172a;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
          ${escapeHtml(previewText || introText || subject)}
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:24px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;">
                <tr>
                  <td style="padding:32px 32px 24px;background:#0f172a;color:#ffffff;">
                    <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#cbd5e1;">Bayview Hub Newsletter</p>
                    <h1 style="margin:0;font-size:28px;line-height:1.2;font-weight:700;">${escapeHtml(subject)}</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px;">
                    ${testLabel}
                    ${introText ? `<p style="margin:0 0 20px;font-size:18px;line-height:1.7;color:#334155;">${escapeHtml(introText)}</p>` : ''}
                    <div style="font-size:16px;line-height:1.75;color:#0f172a;">${htmlBody}</div>
                    ${footer}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `.trim()

  const textSections = [
    subject,
    introText,
    htmlToText(htmlBody),
    unsubscribeUrl
      ? `Unsubscribe: ${unsubscribeUrl}`
      : 'Test send from the Bayview Hub newsletter tool.',
  ].filter(Boolean)

  return {
    html,
    text: textSections.join('\n\n'),
  }
}

export function buildNewsletterWelcomeDocument(email: string): { subject: string; html: string; text: string } {
  const unsubscribeUrl = buildNewsletterUnsubscribeUrl(email)
  const subject = 'Welcome to Bayview Notes'
  const journalUrl = `${newsletterBaseUrl()}/journal`
  const visitUrl = `${newsletterBaseUrl()}/visit`
  const newsletterUrl = `${newsletterBaseUrl()}/newsletter`

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${escapeHtml(subject)}</title>
      </head>
      <body style="margin:0;padding:0;background:#f8fafc;color:#0f172a;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;padding:24px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;">
                <tr>
                  <td style="padding:32px 32px 24px;background:#0f172a;color:#ffffff;">
                    <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#cbd5e1;">Bayview Hub</p>
                    <h1 style="margin:0;font-size:28px;line-height:1.2;font-weight:700;">Welcome to Bayview Notes</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px;">
                    <p style="margin:0 0 16px;font-size:18px;line-height:1.7;color:#334155;">
                      Thanks for subscribing. We use Bayview Notes to share selected Journal pieces, invitations, and estate updates when there is something worth sharing.
                    </p>
                    <p style="margin:0 0 20px;font-size:16px;line-height:1.75;color:#0f172a;">
                      You can start here:
                    </p>
                    <ul style="margin:0;padding-left:20px;font-size:16px;line-height:1.75;color:#0f172a;">
                      <li><a href="${journalUrl}" style="color:#0f766e;">Read the Journal</a></li>
                      <li><a href="${visitUrl}" style="color:#0f766e;">Plan a visit</a></li>
                      <li><a href="${newsletterUrl}" style="color:#0f766e;">Update your newsletter interests</a></li>
                    </ul>
                    <p style="margin-top:28px;font-size:12px;color:#64748b;">
                      You are receiving this email because you subscribed to Bayview Hub updates.
                      <a href="${unsubscribeUrl}" style="color:#0f766e;">Unsubscribe</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `.trim()

  const text = [
    subject,
    'Thanks for subscribing. We use Bayview Notes to share selected Journal pieces, invitations, and estate updates when there is something worth sharing.',
    `Read the Journal: ${journalUrl}`,
    `Plan a visit: ${visitUrl}`,
    `Newsletter page: ${newsletterUrl}`,
    `Unsubscribe: ${unsubscribeUrl}`,
  ].join('\n\n')

  return { subject, html, text }
}
