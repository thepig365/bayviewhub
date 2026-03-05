import { NextResponse } from 'next/server'

const BASE = 'https://www.bayviewhub.me'
const GALLERY = 'https://gallery.bayviewhub.me'

const PAGES: { url: string; label: string }[] = [
  { url: '', label: 'Home' },
  { url: '/zh', label: 'Chinese' },
  { url: '/visit', label: 'Visit' },
  { url: '/experiences', label: 'Experiences' },
  { url: '/experiences/gallery', label: 'Gallery experience' },
  { url: '/cellar-door', label: 'Cellar Door' },
  { url: '/events', label: 'Events' },
  { url: '/partners', label: 'Partners' },
  { url: '/partners/founding', label: 'Founding Partners' },
  { url: '/partners/curator', label: 'Curator Role' },
  { url: '/partners/edible-gardens', label: 'Edible Gardens Partner' },
  { url: '/partners/art-therapy', label: 'Art Therapy Partner' },
  { url: '/partners/garden-ops', label: 'Garden Operations' },
  { url: '/backyard-small-second-home', label: 'Small Second Home' },
  { url: '/backyard-small-second-home/victoria-rules', label: 'Victoria Rules' },
  { url: '/backyard-small-second-home/cost-rent-roi', label: 'Cost & ROI' },
  { url: '/backyard-small-second-home/feasibility-check', label: 'Feasibility Check' },
  { url: '/art-gallery/founding-partners', label: 'Gallery Founding Partners' },
  { url: '/edible-gardens', label: 'Edible Gardens' },
  { url: '/edible-gardens/how-it-works', label: 'How It Works' },
  { url: '/workshops', label: 'Workshops' },
  { url: '/invest', label: 'Invest' },
  { url: '/evidence/visitor-traffic', label: 'Visitor Traffic Evidence' },
  { url: '/tools/utm', label: 'UTM Tool' },
  { url: '/privacy', label: 'Privacy' },
  { url: '/terms', label: 'Terms' },
  { url: '/site-map', label: 'Site Map' },
]

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const lastmod = new Date().toISOString().split('T')[0]
  const lines = [
    `# Bayview Hub — Full LLM Reference`,
    `Canonical: ${BASE}`,
    `Last updated: ${lastmod}`,
    ``,
    `## Main Site Pages`,
    ...PAGES.map(({ url, label }) => `${BASE}${url} — ${label}`),
    ``,
    `## Gallery (separate subdomain)`,
    `${GALLERY} — Bayview Arts Gallery homepage`,
    `${GALLERY}/archive — Artwork collection`,
    `${GALLERY}/archive/[slug] — Individual artwork pages (canonical for artworks)`,
    `${GALLERY}/submit — Submit artwork for curation`,
    `${GALLERY}/protocol — Mend Index assessment protocol`,
    ``,
    `## Citation`,
    `Artworks: use ${GALLERY}/archive/[slug]. Enquiries: gallery@bayviewhub.me`,
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
