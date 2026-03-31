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

/**
 * `/api/partners` owner alert list. Comma-separated `PARTNERS_NOTIFY_EMAIL`.
 * If unset, uses the same single inbox the route used before env wiring.
 */
const PARTNERS_NOTIFY_DEFAULT = 'leonzh@bayviewestate.com.au'

export function parsePartnersNotifyEmails(): string[] {
  const raw = envTrim('PARTNERS_NOTIFY_EMAIL')
  const parts = raw
    ? raw.split(',').map((e) => e.trim()).filter(Boolean)
    : []
  if (parts.length > 0) return parts
  return [PARTNERS_NOTIFY_DEFAULT]
}
