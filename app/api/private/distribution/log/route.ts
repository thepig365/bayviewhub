import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { logDistributionShareAction } from '@/lib/distribution/log-share-action'
import type { DistributionLogPayload } from '@/lib/distribution/types'
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
    const body = (await request.json()) as Partial<DistributionLogPayload>
    if (!body.url || !body.canonicalUrl || !body.hostname || !body.pathname || !body.platform || !body.shareMode) {
      return NextResponse.json({ ok: false, error: 'Missing required log fields.' }, { status: 400 })
    }
    const result = await logDistributionShareAction(body as DistributionLogPayload)
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 500 })
    }
    return NextResponse.json({ ok: true, action: result.action })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Log failed.'
    return NextResponse.json({ ok: false, error: message }, { status: 400 })
  }
}
