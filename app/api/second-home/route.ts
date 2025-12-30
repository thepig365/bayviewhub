import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const form = body?.form ?? body
    const utm = body?.utm
    const page = body?.page

    const { name, email, phone, suburb, backyardSize, propertyType, usage, timeframe } = form

    // Validate required fields
    if (!name || !email || !suburb || !backyardSize || !propertyType) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // TODO: Send email notification
    // This is where you'd integrate with your email service
    
    // Example: SendGrid integration
    /*
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
    const SENDGRID_TO_EMAIL = process.env.SENDGRID_TO_EMAIL || 'leonzh@bayviewestate.com.au'
    
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: SENDGRID_TO_EMAIL }],
          subject: `New Second Home Inquiry from ${name}`,
        }],
        from: { email: 'noreply@bayviewestate.com.au', name: 'Bayview Second Home' },
        content: [{
          type: 'text/html',
          value: `
            <h2>New Second Home Registration</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Location:</strong> ${suburb}</p>
            <p><strong>Backyard Size:</strong> ${backyardSize}</p>
            <p><strong>Property Type:</strong> ${propertyType}</p>
            <p><strong>Intended Use:</strong> ${usage || 'Not specified'}</p>
            <p><strong>Timeframe:</strong> ${timeframe || 'Not specified'}</p>
          `,
        }],
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }
    */

    // Log the submission (you can save to database here)
    console.log('Second Home Registration:', {
      page,
      utm,
      name,
      email,
      phone,
      suburb,
      backyardSize,
      propertyType,
      usage,
      timeframe,
      timestamp: new Date().toISOString(),
    })

    // Return success
    return NextResponse.json(
      { 
        message: 'Thank you for your interest! We will contact you soon.',
        success: true 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Second Home registration error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}

