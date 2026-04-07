import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { analyzeDistributionUrl } from '@/lib/distribution/analyze-url'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
  newsletterAdminConfigured,
} from '@/lib/newsletter-admin'

export const runtime = 'nodejs'
export const maxDuration = 60

async function rejectIfUnauthorized() {
  if (!newsletterAdminConfigured()) {
    return NextResponse.json({ ok: false, error: 'Private admin auth is not configured.' }, { status: 503 })
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(NEWSLETTER_ADMIN_COOKIE)?.value
  if (!isNewsletterAdminCookieValid(token)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 })
  }

  return null
}

export async function POST(request: Request) {
  const unauthorized = await rejectIfUnauthorized()
  if (unauthorized) return unauthorized

  try {
    const body = (await request.json()) as { url?: string }
    const analysis = await analyzeDistributionUrl(body.url || '')
    return NextResponse.json({ ok: true, analysis })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Analyze failed.'
    return NextResponse.json({ ok: false, error: message }, { status: 400 })
  }
}
