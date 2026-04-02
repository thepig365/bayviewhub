import { put } from '@vercel/blob'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { sanitizeEditorialSlug } from '@/lib/editorial'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
} from '@/lib/newsletter-admin'

export const runtime = 'nodejs'

const MAX_UPLOAD_BYTES = 150 * 1024 * 1024

async function rejectIfUnauthorized() {
  const cookieStore = await cookies()
  const token = cookieStore.get(NEWSLETTER_ADMIN_COOKIE)?.value
  if (!isNewsletterAdminCookieValid(token)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 })
  }
  return null
}

function extensionForAudio(file: File): string {
  const fromName = file.name.split('.').pop()?.trim().toLowerCase()
  if (fromName && /^[a-z0-9]+$/.test(fromName)) return fromName

  switch (file.type) {
    case 'audio/mp4':
    case 'audio/x-m4a':
      return 'm4a'
    case 'audio/wav':
    case 'audio/x-wav':
      return 'wav'
    case 'audio/ogg':
      return 'ogg'
    case 'audio/webm':
      return 'webm'
    default:
      return 'mp3'
  }
}

export async function POST(request: Request) {
  const unauthorized = await rejectIfUnauthorized()
  if (unauthorized) return unauthorized

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const slug = sanitizeEditorialSlug(formData.get('slug'))

    if (!(file instanceof File) || !file.type.startsWith('audio/')) {
      return NextResponse.json({ ok: false, error: 'A valid audio file is required.' }, { status: 400 })
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ ok: false, error: 'Audio exceeds 150 MB upload limit.' }, { status: 400 })
    }

    const ext = extensionForAudio(file)
    const pathname = `mendpress/audio/${slug || 'drafts'}/${Date.now()}.${ext}`

    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: true,
    })

    return NextResponse.json({
      ok: true,
      url: blob.url,
      pathname: blob.pathname,
      contentType: file.type,
      size: file.size,
    })
  } catch (error) {
    console.error('[Editorial Upload] audio upload failed', error)
    return NextResponse.json(
      {
        ok: false,
        error:
          'Audio upload failed. Configure Vercel Blob storage and BLOB_READ_WRITE_TOKEN before using audio uploads.',
      },
      { status: 500 }
    )
  }
}
