import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
} from '@/lib/newsletter-admin'

export const runtime = 'nodejs'

async function rejectIfUnauthorized() {
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
    const body = (await request.json()) as HandleUploadBody

    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith('mendpress/audio/')) {
          throw new Error('Invalid audio upload path.')
        }

        return {
          allowedContentTypes: [
            'audio/mpeg',
            'audio/mp4',
            'audio/x-m4a',
            'audio/wav',
            'audio/x-wav',
            'audio/ogg',
            'audio/webm',
          ],
          addRandomSuffix: true,
        }
      },
      onUploadCompleted: async () => {
        // No-op for now. The editor writes the returned Blob URL into the piece after upload.
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error('[Editorial Upload] audio upload failed', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Audio upload failed. Configure Vercel Blob storage and BLOB_READ_WRITE_TOKEN before using audio uploads.',
      },
      { status: 400 }
    )
  }
}
