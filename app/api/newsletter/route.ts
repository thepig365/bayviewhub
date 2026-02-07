import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, interests } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Save to Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        )

        const headers = request.headers
        const source_page = headers.get('referer') || 'unknown'
        const user_agent = headers.get('user-agent') || ''

        const { error } = await supabase
          .from('newsletter_subscriptions')
          .upsert({
            email: email.toLowerCase().trim(),
            interests: Array.isArray(interests) ? interests : [],
            source_page,
            user_agent,
            status: 'active',
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'email'
          })

        if (error) {
          console.error('[Newsletter] Supabase upsert error:', error)
          return NextResponse.json(
            { error: 'Failed to subscribe. Please try again.' },
            { status: 500 }
          )
        }
      } catch (e) {
        console.error('[Newsletter] Supabase error:', e)
        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          { status: 500 }
        )
      }
    } else {
      console.warn('[Newsletter] Supabase not configured')
      return NextResponse.json(
        { error: 'Service not available' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

