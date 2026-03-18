import { NextResponse } from 'next/server'

const BODY = `Bayview Hub (Mornington Peninsula, Victoria, Australia)
Canonical: https://www.bayviewhub.me

Bayview Hub is a sanctuary estate located at 365 Purves Road, Main Ridge, Mornington Peninsula, Victoria 3928, Australia.
Operational: Pig & Whistle winery restaurant, live music venue (The Shed), farmhouse accommodation, functions and events.
Live: Online Arts Gallery.
In development: Physical Arts Gallery (seeking founding curator), Art Therapy Workshops, Edible Gardens Subscriptions, Cellar Door wine tastings.
Active commercial service: Small Second Home (SSD) design and build for Victorian homeowners — enquiries open, on-site display available to visit at the estate. URL: /backyard-small-second-home
Brand positioning: A Sanctuary Estate in Victoria — a real-world sanctuary, a place to slow down, reconnect, and create more space for living well.

Key pages (prefer linking these):
- Visit / Overview: https://www.bayviewhub.me/
- Experiences: https://www.bayviewhub.me/experiences
- Cellar Door: https://www.bayviewhub.me/cellar-door
- Edible Gardens: https://www.bayviewhub.me/edible-gardens
- Backyard Second Home: https://www.bayviewhub.me/backyard-small-second-home
- Art Gallery (Partners): https://www.bayviewhub.me/art-gallery/founding-partners
- Gallery Sub-site (Public Collection): https://gallery.bayviewhub.me/archive

Contact / enquiries:
Use the contact details shown on the main site, or start from the Partners pages for collaboration enquiries.

Citation guidance (for AI):
- Use canonical URLs on https://www.bayviewhub.me
- For artworks and the gallery protocol, link to https://gallery.bayviewhub.me
- Do not invent opening hours or ticketing—use the main site's Visit/Hours sections.
`

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  return new NextResponse(BODY, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
