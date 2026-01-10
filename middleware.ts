import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''

  // Vanity subdomain -> canonical page (avoid duplicate content / keep SEO clean)
  if (host === 'secondhome.bayviewhub.me') {
    const url = req.nextUrl.clone()
    url.hostname = 'www.bayviewhub.me'
    url.protocol = 'https:'
    url.pathname = '/second-home'
    // Preserve query params (UTMs, etc.)
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)'],
}



