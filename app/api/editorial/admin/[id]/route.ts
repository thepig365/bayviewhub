import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import {
  buildEditorialWritePayload,
  editorialMissingAudioWriteColumnError,
  editorialUrl,
  editorialWritePayloadFallbacks,
} from '@/lib/editorial'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
  newsletterAdminConfigured,
} from '@/lib/newsletter-admin'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

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

type Props = {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: Props) {
  const unauthorized = await rejectIfUnauthorized()
  if (unauthorized) return unauthorized

  try {
    const { id } = await params
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
        .update(candidate)
        .eq('id', id)
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
      console.error('[Editorial Admin] update failed', error)
      return NextResponse.json(
        {
          ok: false,
          error:
            error?.code === '23505'
              ? 'That slug is already in use.'
              : editorialMissingAudioWriteColumnError(error)
                ? 'Editorial bilingual/audio fields are not available yet. Run the latest docs/supabase-editorial.sql migration first.'
                : error?.code === '23514'
                  ? 'This editorial type is not available in the current database schema yet. Run the latest docs/supabase-editorial.sql migration first.'
                  : 'Failed to update piece.',
        },
        { status: error?.code === '23505' ? 409 : error?.code === '23514' ? 400 : 500 }
      )
    }

    return NextResponse.json({ ok: true, id: data.id, slug: data.slug })
  } catch (error) {
    console.error('[Editorial Admin] update route error', error)
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  const unauthorized = await rejectIfUnauthorized()
  if (unauthorized) return unauthorized

  try {
    const { id } = await params
    const supabase = getSupabaseServer()
    if (!supabase) {
      return NextResponse.json({ ok: false, error: 'Database not configured.' }, { status: 500 })
    }

    const { data, error } = await supabase
      .from('editorial_entries')
      .delete()
      .eq('id', id)
      .select('id,slug')
      .single<{ id: string; slug: string }>()

    if (error || !data) {
      console.error('[Editorial Admin] delete failed', error)
      return NextResponse.json({ ok: false, error: 'Failed to delete piece.' }, { status: 500 })
    }

    const articlePath = editorialUrl(data.slug)

    const pathsToRevalidate = [
      '/mendpress',
      '/mendpress/editorial',
      '/mendpress/dialogue',
      '/mendpress/visual-narrative',
      '/mendpress/reports',
      '/zh/mendpress',
      '/zh/mendpress/editorial',
      '/zh/mendpress/dialogue',
      '/zh/mendpress/visual-narrative',
      '/zh/mendpress/reports',
      articlePath,
      `/zh${articlePath}`,
    ]

    for (const path of pathsToRevalidate) {
      revalidatePath(path)
    }

    return NextResponse.json({ ok: true, id: data.id, slug: data.slug })
  } catch (error) {
    console.error('[Editorial Admin] delete route error', error)
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }
}
