import { NextResponse } from 'next/server'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminPasswordValid,
  newsletterAdminConfigured,
  newsletterAdminSessionValue,
} from '@/lib/newsletter-admin'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    if (!newsletterAdminConfigured()) {
      return NextResponse.json(
        { ok: false, error: 'Newsletter admin auth is not configured.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const password =
      typeof body?.password === 'string' ? body.password.trim() : ''

    if (!isNewsletterAdminPasswordValid(password)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid password.' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ ok: true })
    response.cookies.set(NEWSLETTER_ADMIN_COOKIE, newsletterAdminSessionValue()!, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    })
    return response
  } catch (error) {
    console.error('[Newsletter Admin] login error', error)
    return NextResponse.json(
      { ok: false, error: 'Invalid request.' },
      { status: 400 }
    )
  }
}
