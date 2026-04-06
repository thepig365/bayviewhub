import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import {
  buildEditorialWritePayload,
  editorialMissingAudioWriteColumnError,
  editorialPublicPaths,
  editorialWritePayloadFallbacks,
  type EditorialStatus,
  type EditorialType,
} from '@/lib/editorial'
import {
  deriveEditorialAuditActions,
  editorialChangedFields,
  verifyExpectedPublishedVisibility,
  writeEditorialAuditLogs,
} from '@/lib/editorial-admin'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
  newsletterAdminConfigured,
} from '@/lib/newsletter-admin'
import { syncEditorialChineseTranslation } from '@/lib/editorial-translation'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

export const runtime = 'nodejs'
export const maxDuration = 120

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
    const body = await request.json()
    const { payload, error: payloadError } = buildEditorialWritePayload(body || {})
    if (!payload) {
      return NextResponse.json(
        { ok: false, error: payloadError || 'Invalid piece payload.' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseServer()
    if (!supabase) {
      return NextResponse.json({ ok: false, error: 'Database not configured.' }, { status: 500 })
    }

    let data: { id: string; slug: string } | null = null
    let error: { code?: string } | null = null

    for (const candidate of editorialWritePayloadFallbacks(payload)) {
      const result = await supabase
        .from('editorial_entries')
        .insert(candidate)
        .select('id,slug')
        .single<{ id: string; slug: string }>()

      data = result.data
      error = result.error

      if (!error && data) {
        break
      }

      if (!editorialMissingAudioWriteColumnError(error)) {
        break
      }
    }

    if (error || !data) {
      console.error('[Editorial Admin] create failed', error)
      return NextResponse.json(
        {
          ok: false,
          error:
            error?.code === '23505'
              ? 'That slug is already in use.'
              : editorialMissingAudioWriteColumnError(error)
                ? 'Editorial bilingual/audio fields are not available yet. Run the latest docs/supabase-editorial.sql migration first.'
                : error?.code === '23514'
                  ? `The current database schema rejected editorial_type "${String(payload.editorial_type)}". Run the latest docs/supabase-editorial.sql migration so audio types and current checks are available.`
              : 'Editorial table is missing or unavailable. Run docs/supabase-editorial.sql first.',
        },
        { status: error?.code === '23505' ? 409 : error?.code === '23514' ? 400 : 500 }
      )
    }

    const nextStatus = payload.status as EditorialStatus
    const nextType = payload.editorial_type as EditorialType
    const changedFields = editorialChangedFields(null, payload)
    const auditActions = deriveEditorialAuditActions({
      previousStatus: null,
      nextStatus,
      isCreate: true,
      changedFields,
    })
    await writeEditorialAuditLogs({
      entryId: data.id,
      slug: data.slug,
      actions: auditActions,
      changedFields,
      previousStatus: null,
      nextStatus,
      editorialType: nextType,
    })

    const translation = await syncEditorialChineseTranslation(data.id)
    const pathsToRevalidate = editorialPublicPaths(data.slug, nextType)

    for (const path of pathsToRevalidate) {
      revalidatePath(path)
    }

    const visibility = await verifyExpectedPublishedVisibility(nextStatus, data.slug)
    if (visibility?.status !== 'published') {
      console.warn('[Editorial Admin] published visibility check failed after create', visibility)
    }
    return NextResponse.json({
      ok: true,
      id: data.id,
      slug: data.slug,
      translation,
      visibility,
    })
  } catch (error) {
    console.error('[Editorial Admin] create route error', error)
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }
}
