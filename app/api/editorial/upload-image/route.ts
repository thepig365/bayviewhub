import { put } from '@vercel/blob'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { sanitizeEditorialSlug } from '@/lib/editorial'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
} from '@/lib/newsletter-admin'

export const runtime = 'nodejs'

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024

async function rejectIfUnauthorized() {
  const cookieStore = await cookies()
  const token = cookieStore.get(NEWSLETTER_ADMIN_COOKIE)?.value
  if (!isNewsletterAdminCookieValid(token)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 })
  }
  return null
}

function extensionForFile(file: File): string {
  const fromName = file.name.split('.').pop()?.trim().toLowerCase()
  if (fromName && /^[a-z0-9]+$/.test(fromName)) return fromName

  switch (file.type) {
    case 'image/png':
      return 'png'
    case 'image/webp':
      return 'webp'
    case 'image/gif':
      return 'gif'
    case 'image/avif':
      return 'avif'
    default:
      return 'jpg'
  }
}

export async function POST(request: Request) {
  const unauthorized = await rejectIfUnauthorized()
  if (unauthorized) return unauthorized

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const variant = formData.get('variant')
    const slug = sanitizeEditorialSlug(formData.get('slug'))

    if (!(file instanceof File) || !file.type.startsWith('image/')) {
      return NextResponse.json({ ok: false, error: 'A valid image file is required.' }, { status: 400 })
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ ok: false, error: 'Image exceeds 25 MB upload limit.' }, { status: 400 })
    }

    const variantName = variant === 'full' ? 'full' : 'inline'
    const ext = extensionForFile(file)
    const pathname = `mendpress/${slug || 'drafts'}/${Date.now()}-${variantName}.${ext}`

    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: true,
    })

    return NextResponse.json({
      ok: true,
      url: blob.url,
      pathname: blob.pathname,
      variant: variantName,
      contentType: file.type,
      size: file.size,
    })
  } catch (error) {
    console.error('[Editorial Upload] image upload failed', error)
    return NextResponse.json(
      {
        ok: false,
        error:
          'Image upload failed. Configure Vercel Blob storage and BLOB_READ_WRITE_TOKEN before using Upload image.',
      },
      { status: 500 }
    )
  }
}
