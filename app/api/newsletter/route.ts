import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 10

function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  return ip
}

function isRateLimited(request: Request): boolean {
  const key = getRateLimitKey(request)
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  record.count++
  if (record.count > RATE_LIMIT_MAX_REQUESTS) {
    return true
  }
  return false
}

async function sendResendEmail(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM
  if (!apiKey || !from) return false

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  })

  return res.ok
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    if (isRateLimited(request)) {
      console.log('[Newsletter API] Rate limited')
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    console.log('[Newsletter API] Request body:', body)
    const { email, interests, website } = body

    // Honeypot check
    if (website) {
      console.log('[Newsletter API] Honeypot triggered')
      return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 200 })
    }

    // Validate email
    if (!email || !email.includes('@')) {
      console.log('[Newsletter API] Invalid email:', email)
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Save to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    console.log('[Newsletter API] Supabase config:', { 
      hasUrl: !!supabaseUrl, 
      hasKey: !!supabaseKey,
      urlPrefix: supabaseUrl?.substring(0, 30)
    })
    
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey)

        const headers = request.headers
        const source_page = headers.get('referer') || 'unknown'
        const user_agent = headers.get('user-agent') || ''

        const insertData = {
          email: email.toLowerCase().trim(),
          interests: Array.isArray(interests) ? interests : [],
          source_page,
          user_agent,
          status: 'active',
          updated_at: new Date().toISOString(),
        }
        console.log('[Newsletter API] Attempting upsert:', insertData)

        const { data, error } = await supabase
          .from('newsletter_subscriptions')
          .upsert(insertData, {
            onConflict: 'email'
          })
          .select()

        console.log('[Newsletter API] Supabase response:', { data, error })

        if (error) {
          console.error('[Newsletter API] Supabase upsert error:', error)
          return NextResponse.json(
            { error: 'Failed to subscribe. Please try again.' },
            { status: 500 }
          )
        }

        // Send notification email to admin after successful DB insert
        const notifyEmail = 'leonzh@bayviewestate.com.au'
        const timestamp = new Date().toISOString()
        const interestsStr = Array.isArray(interests) && interests.length > 0 
          ? interests.join(', ') 
          : 'None selected'

        try {
          await sendResendEmail({
            to: notifyEmail,
            subject: `[SUBSCRIBE] ${email} — ${interestsStr}`,
            html: `
              <div style="font-family: system-ui, -apple-system, sans-serif; line-height:1.6; max-width:600px;">
                <h2 style="color:#1a365d;">New Newsletter Subscription</h2>
                
                <table style="width:100%; border-collapse:collapse; margin:20px 0;">
                  <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold; width:140px;">Timestamp</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${timestamp}</td></tr>
                  <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Email</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${email}</td></tr>
                  <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Interests</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${interestsStr}</td></tr>
                  <tr><td style="padding:8px 0; border-bottom:1px solid #e2e8f0; font-weight:bold;">Source Page</td><td style="padding:8px 0; border-bottom:1px solid #e2e8f0;">${source_page}</td></tr>
                </table>

                <p style="color:#718096; font-size:12px; margin-top:24px;">Summary: New subscriber interested in ${interestsStr || 'general updates'}</p>
              </div>
            `,
          })
          console.log('[Newsletter API] Admin email sent successfully')
        } catch (e) {
          console.warn('[Newsletter API] Admin email failed:', e)
        }

      } catch (e) {
        console.error('[Newsletter API] Supabase error:', e)
        return NextResponse.json(
          { error: 'Failed to subscribe. Please try again.' },
          { status: 500 }
        )
      }
    } else {
      console.warn('[Newsletter API] Supabase not configured')
      return NextResponse.json(
        { error: 'Service not available' },
        { status: 503 }
      )
    }

    console.log('[Newsletter API] Success')
    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Newsletter API] Top-level error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

