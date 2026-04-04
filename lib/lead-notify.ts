import { campaignOwnerEmail } from '@/lib/ssd-campaign-server'

/**
 * Default business inbox for EOI / lead notifications when env overrides are unset.
 * Matches feasibility primary inbox behaviour.
 */
export const DEFAULT_BUSINESS_INBOX = 'info@bayviewestate.com.au'

function envTrim(key: string): string | undefined {
  const v = process.env[key]
  if (typeof v !== 'string') return undefined
  const t = v.trim()
  return t.length ? t : undefined
}

/** Gallery EOI: explicit gallery → shared edible env → default inbox. */
export function resolveGalleryEoiOwnerEmail(): string {
  return (
    envTrim('EOI_GALLERY_NOTIFY_EMAIL') ||
    envTrim('EOI_EDIBLE_GARDENS_NOTIFY_EMAIL') ||
    DEFAULT_BUSINESS_INBOX
  )
}

/** Edible Gardens EOI: explicit env → default inbox (never silent). */
export function resolveEdibleGardensEoiOwnerEmail(): string {
  return envTrim('EOI_EDIBLE_GARDENS_NOTIFY_EMAIL') || DEFAULT_BUSINESS_INBOX
}

/** Workshops enquiry: explicit env → default inbox (never silent). */
export function resolveWorkshopsNotifyEmail(): string {
  return envTrim('WORKSHOPS_NOTIFY_EMAIL') || DEFAULT_BUSINESS_INBOX
}

/**
 * `/api/partners` owner alert list. Same default recipient as SSD campaign digests/alerts
 * (`SSD_CAMPAIGN_OWNER_EMAIL` via `campaignOwnerEmail()`).
 * Optional comma-separated `PARTNERS_NOTIFY_EMAIL` overrides (first = to, rest = bcc).
 */
export function parsePartnersNotifyEmails(): string[] {
  const raw = envTrim('PARTNERS_NOTIFY_EMAIL')
  if (raw) {
    const parts = raw.split(',').map((e) => e.trim()).filter(Boolean)
    if (parts.length > 0) return parts
  }
  return [campaignOwnerEmail()]
}
