import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
} from '@/lib/newsletter-admin'

export const runtime = 'nodejs'

async function ensureAuthorizedForToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get(NEWSLETTER_ADMIN_COOKIE)?.value
  if (!isNewsletterAdminCookieValid(token)) {
    throw new Error('Unauthorized.')
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody

    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async (pathname) => {
        await ensureAuthorizedForToken()

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
    const message =
      error instanceof Error
        ? error.message
        : 'Audio upload failed. Configure Vercel Blob storage and BLOB_READ_WRITE_TOKEN before using audio uploads.'
    return NextResponse.json(
      {
        error: message,
      },
      { status: message === 'Unauthorized.' ? 401 : 400 }
    )
  }
}
