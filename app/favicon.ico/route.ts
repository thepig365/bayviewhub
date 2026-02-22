import { NextResponse } from 'next/server'

export function GET(req: Request) {
  return NextResponse.redirect(new URL('/icon', req.url), 308)
}

export function HEAD(req: Request) {
  return NextResponse.redirect(new URL('/icon', req.url), 308)
}
