import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { buildEditorialWritePayload } from '@/lib/editorial'
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
    const payload = buildEditorialWritePayload(body || {})
    if (!payload) {
      return NextResponse.json(
        { ok: false, error: 'Title, slug, summary, and body are required.' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseServer()
    if (!supabase) {
      return NextResponse.json({ ok: false, error: 'Database not configured.' }, { status: 500 })
    }

    const { data, error } = await supabase
      .from('editorial_entries')
      .update(payload)
      .eq('id', id)
      .select('id,slug')
      .single<{ id: string; slug: string }>()

    if (error || !data) {
      console.error('[Editorial Admin] update failed', error)
      return NextResponse.json(
        {
          ok: false,
          error: error?.code === '23505' ? 'That slug is already in use.' : 'Failed to update entry.',
        },
        { status: error?.code === '23505' ? 409 : 500 }
      )
    }

    return NextResponse.json({ ok: true, id: data.id, slug: data.slug })
  } catch (error) {
    console.error('[Editorial Admin] update route error', error)
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }
}
