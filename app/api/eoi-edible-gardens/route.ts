import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Minimal validation
    if (!body?.form?.name || !body?.form?.email || !body?.form?.message) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    // Production-safe default: log on server (visible in Vercel logs).
    // You can later wire this to email/CRM without changing the frontend payload.
    console.log('[EOI] edible-gardens', {
      receivedAt: new Date().toISOString(),
      page: body?.page,
      utm: body?.utm,
      form: body?.form,
    })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }
}


