import { NextRequest, NextResponse } from 'next/server'
import {
  CANONICAL_HOST,
  findSubdomainRoute,
  resolveSubdomainDestination,
} from '@/lib/subdomain-routing'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const hostname = host.split(':')[0].toLowerCase()
  const isReadMethod = req.method === 'GET' || req.method === 'HEAD'

  // 1) Marketing subdomain aliases (single source of truth: lib/subdomain-routing.ts).
  //    Must run BEFORE the apex→www canonicalisation so e.g. secondhome.bayviewhub.me
  //    doesn't first get rewritten through the apex check.
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

  // 2) Canonical host: apex → www (preserve path + query; permanent redirect)
  if (isReadMethod && hostname === 'bayviewhub.me') {
    const url = req.nextUrl.clone()
    url.hostname = CANONICAL_HOST
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }

  // 3) Intentional IA: /events → Pig & Whistle "What's On" (same Bayview ecosystem; not a competitor redirect).
  //    next.config.js also declares this; production middleware ensures runtime always exits before app/events.
  //    Legacy path redirects (/second-home, /backyard-second-home/*) live in next.config.js.
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
