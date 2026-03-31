import { NextResponse } from 'next/server'

/**
 * Legacy registration API — not referenced by any in-repo client.
 * Retired in favour of SSD feasibility + telemetry on /backyard-small-second-home.
 */
const RETIRED_BODY = {
  ok: false,
  retired: true,
  message:
    'This endpoint is retired. For Victorian Backyard Small Second Home (SSD) enquiries, use the feasibility check.',
  usePath: '/backyard-small-second-home/feasibility-check',
} as const

export async function POST() {
  return NextResponse.json(RETIRED_BODY, { status: 410 })
}

export async function GET() {
  return NextResponse.json(RETIRED_BODY, { status: 410 })
}
