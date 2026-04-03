import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { buildEditorialWritePayload, editorialMissingAudioWriteColumnError } from '@/lib/editorial'
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

    const { data, error } = await supabase
      .from('editorial_entries')
      .insert(payload)
      .select('id,slug')
      .single<{ id: string; slug: string }>()

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
                  ? 'This editorial type is not available in the current database schema yet. Run the latest docs/supabase-editorial.sql migration first.'
              : 'Editorial table is missing or unavailable. Run docs/supabase-editorial.sql first.',
        },
        { status: error?.code === '23505' ? 409 : error?.code === '23514' ? 400 : 500 }
      )
    }

    return NextResponse.json({ ok: true, id: data.id, slug: data.slug })
  } catch (error) {
    console.error('[Editorial Admin] create route error', error)
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }
}
