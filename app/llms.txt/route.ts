import { NextResponse } from 'next/server'

const BASE = 'https://www.bayviewhub.me'
const EMAIL = 'leonzh@bayviewestate.com.au'

const PAGES: { url: string; label: string }[] = [
  { url: '', label: 'Home — destination hub overview' },
  { url: '/zh', label: 'Chinese — 中文首页' },
  { url: '/visit', label: 'Visit — hours, directions, contact' },
  { url: '/experiences', label: 'Experiences — dining, wine, gallery, gardens' },
  { url: '/cellar-door', label: 'Cellar Door — wine tasting, bookings' },
  { url: '/events', label: "What's On — events calendar" },
  { url: '/partners', label: 'Partners — founding partner opportunities' },
  { url: '/partners/founding', label: 'Founding Partners — roles and terms' },
  { url: '/backyard-small-second-home', label: 'Small Second Home — Victorian SSD feasibility' },
  { url: '/backyard-small-second-home/victoria-rules', label: 'Victoria Rules — SSD constraints' },
  { url: '/backyard-small-second-home/feasibility-check', label: 'Feasibility Check — deemed-to-comply validation' },
  { url: '/art-gallery/founding-partners', label: 'Gallery Founding Partners — curator role' },
  { url: '/edible-gardens', label: 'Edible Gardens — subscriptions' },
  { url: '/workshops', label: 'Workshops — art therapy programs' },
  { url: '/invest', label: 'Invest — investment opportunity' },
  { url: '/evidence/visitor-traffic', label: 'Visitor Traffic — 50k+ annual visitors evidence' },
  { url: '/privacy', label: 'Privacy Policy' },
  { url: '/terms', label: 'Terms of Service' },
]

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const lastmod = new Date().toISOString().split('T')[0]
  const lines = [
    `# Bayview Hub — LLM Navigation`,
    `Canonical: ${BASE}`,
    `Last updated: ${lastmod}`,
    ``,
    `## Description`,
    `Bayview Hub is a destination hub on the Mornington Peninsula (Main Ridge VIC) with winery dining, cellar door, art gallery, edible gardens, workshops, and accommodation. Founding partner opportunities available for gallery curator, edible gardens, and art programs.`,
    ``,
    `## Top Pages`,
    ...PAGES.map(({ url, label }) => `${BASE}${url} — ${label}`),
    ``,
    `## Contact`,
    `Email: ${EMAIL}`,
    `Preferred enquiry: /partners for founding partner inquiries; email for general contact.`,
    ``,
    `## Citation Guidance`,
    `Use canonical URLs; prefer linking to /experiences and /partners pages.`,
  ]
  const body = lines.join('\n')
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
