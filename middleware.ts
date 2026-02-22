import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const hostname = host.split(':')[0].toLowerCase()
  const isReadMethod = req.method === 'GET' || req.method === 'HEAD'

  // Canonical host: apex -> www (preserve path + query; permanent redirect)
  if (isReadMethod && hostname === 'bayviewhub.me') {
    const url = req.nextUrl.clone()
    url.hostname = 'www.bayviewhub.me'
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }

  // Legacy path redirects (/second-home, /backyard-second-home/*) are handled in next.config.js.
  // Do NOT add path-based redirects here — single source of truth avoids chains and crawler confusion.

  // Vanity subdomain -> canonical page (avoid duplicate content / keep SEO clean)
  if (hostname === 'secondhome.bayviewhub.me') {
    const url = req.nextUrl.clone()
    url.hostname = 'www.bayviewhub.me'
    url.protocol = 'https:'
    url.pathname = '/backyard-small-second-home'
    // Preserve query params (UTMs, etc.)
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}



