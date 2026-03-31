import { NextResponse } from 'next/server'
import { NEWSLETTER_ADMIN_COOKIE } from '@/lib/newsletter-admin'

export const runtime = 'nodejs'

export async function POST() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(NEWSLETTER_ADMIN_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  return response
}
