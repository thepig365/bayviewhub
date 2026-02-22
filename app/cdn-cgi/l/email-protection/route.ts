import { NextResponse } from 'next/server'

function redirectToVisit(req: Request) {
  return NextResponse.redirect(new URL('/visit', req.url), 308)
}

export function GET(req: Request) {
  return redirectToVisit(req)
}

export function HEAD(req: Request) {
  return redirectToVisit(req)
}
