import { createHash, timingSafeEqual } from 'crypto'

export const NEWSLETTER_ADMIN_COOKIE = 'bayviewhub_newsletter_admin'

function envTrim(name: string): string | undefined {
  const value = process.env[name]
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length ? trimmed : undefined
}

function digest(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

export function newsletterAdminConfigured(): boolean {
  return Boolean(envTrim('NEWSLETTER_ADMIN_PASSWORD'))
}

export function newsletterAdminSessionValue(): string | null {
  const password = envTrim('NEWSLETTER_ADMIN_PASSWORD')
  if (!password) return null
  return digest(password)
}

export function isNewsletterAdminPasswordValid(password: string): boolean {
  const expected = newsletterAdminSessionValue()
  const candidate = password ? digest(password) : null
  if (!expected || !candidate || expected.length !== candidate.length) return false
  return timingSafeEqual(Buffer.from(expected), Buffer.from(candidate))
}

export function isNewsletterAdminCookieValid(cookieValue?: string | null): boolean {
  const expected = newsletterAdminSessionValue()
  if (!expected || !cookieValue || expected.length !== cookieValue.length) return false
  return timingSafeEqual(Buffer.from(expected), Buffer.from(cookieValue))
}
