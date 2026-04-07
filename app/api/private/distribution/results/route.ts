import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { upsertDistributionShareResult } from '@/lib/distribution/share-results'
import { isDistributionShareResultStatus } from '@/lib/distribution/result-status'
import { sanitizeDistributionManualMetrics } from '@/lib/distribution/share-results'
import type { DistributionResultPayload } from '@/lib/distribution/types'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
  newsletterAdminConfigured,
} from '@/lib/newsletter-admin'

export const runtime = 'nodejs'

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
    const body = (await request.json()) as Partial<DistributionResultPayload>
    if (!body.shareActionId || typeof body.shareActionId !== 'string') {
      return NextResponse.json({ ok: false, error: 'shareActionId is required.' }, { status: 400 })
    }
    if (!body.platform || typeof body.platform !== 'string') {
      return NextResponse.json({ ok: false, error: 'platform is required.' }, { status: 400 })
    }
    if (!isDistributionShareResultStatus(body.status)) {
      return NextResponse.json({ ok: false, error: 'status must be drafted, posted, or cancelled.' }, { status: 400 })
    }

    const result = await upsertDistributionShareResult({
      shareActionId: body.shareActionId,
      platform: body.platform,
      status: body.status,
      externalPostUrl: body.externalPostUrl ?? null,
      externalPostNotes: body.externalPostNotes ?? null,
      manualMetrics: sanitizeDistributionManualMetrics(body.manualMetrics),
    })

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({ ok: true, result: result.result })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Result save failed.'
    return NextResponse.json({ ok: false, error: message }, { status: 400 })
  }
}
