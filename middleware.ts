import { NextRequest, NextResponse } from 'next/server'
import { toEnglishPathname } from '@/lib/language-routing'
import { isChineseLocalePublicEnabled } from '@/lib/locale-config'
import {
  CANONICAL_HOST,
  findSubdomainRoute,
  resolveSubdomainDestination,
} from '@/lib/subdomain-routing'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const hostname = host.split(':')[0].toLowerCase()
  const isReadMethod = req.method === 'GET' || req.method === 'HEAD'

  const aliasRoute = findSubdomainRoute(hostname)
  if (isReadMethod && aliasRoute) {
    if (aliasRoute.mode === 'redirect') {
      const target = resolveSubdomainDestination(aliasRoute, new URL(req.url))
      return NextResponse.redirect(target.toString(), aliasRoute.status ?? 308)
    }
    if (aliasRoute.mode === 'rewrite' && !aliasRoute.external) {
      const url = req.nextUrl.clone()
      url.pathname = aliasRoute.destination
      return NextResponse.rewrite(url)
    }
  }

  if (isReadMethod && hostname === 'bayviewhub.me') {
    const url = req.nextUrl.clone()
    url.hostname = CANONICAL_HOST
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }

  if (
    isReadMethod &&
    !isChineseLocalePublicEnabled() &&
    (req.nextUrl.pathname === '/zh' || req.nextUrl.pathname.startsWith('/zh/'))
  ) {
    const url = req.nextUrl.clone()
    url.pathname = toEnglishPathname(req.nextUrl.pathname)
    return NextResponse.redirect(url, 307)
  }

  if (
    isReadMethod &&
    process.env.NODE_ENV === 'production' &&
    req.nextUrl.pathname === '/events'
  ) {
    return NextResponse.redirect(
      new URL('https://www.thepigandwhistle.com.au/what-s-on'),
      307
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
