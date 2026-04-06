import { NextResponse } from 'next/server'
import { listPublishedEditorialEntries } from '@/lib/editorial'

const BASE_URL = 'https://www.bayviewhub.me'

const ROUTES: { path: string; priority: number; changeFreq: string }[] = [
  { path: '', priority: 1, changeFreq: 'weekly' },
  { path: '/zh', priority: 0.95, changeFreq: 'weekly' },
  { path: '/zh/about', priority: 0.82, changeFreq: 'monthly' },
  { path: '/zh/experiences', priority: 0.82, changeFreq: 'monthly' },
  { path: '/zh/visit', priority: 0.82, changeFreq: 'monthly' },
  { path: '/zh/workshops', priority: 0.82, changeFreq: 'monthly' },
  { path: '/zh/edible-gardens', priority: 0.82, changeFreq: 'monthly' },
  { path: '/zh/backyard-small-second-home', priority: 0.82, changeFreq: 'monthly' },
  { path: '/zh/newsletter', priority: 0.72, changeFreq: 'monthly' },
  { path: '/zh/mendpress', priority: 0.78, changeFreq: 'weekly' },
  { path: '/zh/mendpress/editorial', priority: 0.72, changeFreq: 'weekly' },
  { path: '/zh/mendpress/dialogue', priority: 0.72, changeFreq: 'weekly' },
  { path: '/zh/mendpress/visual-narrative', priority: 0.72, changeFreq: 'weekly' },
  { path: '/zh/mendpress/programme', priority: 0.72, changeFreq: 'weekly' },
  { path: '/zh/partners', priority: 0.8, changeFreq: 'monthly' },
  { path: '/zh/partners/founding', priority: 0.8, changeFreq: 'monthly' },
  { path: '/zh/invest', priority: 0.76, changeFreq: 'monthly' },
  { path: '/zh/privacy', priority: 0.5, changeFreq: 'yearly' },
  { path: '/zh/terms', priority: 0.5, changeFreq: 'yearly' },
  { path: '/backyard-small-second-home', priority: 0.95, changeFreq: 'weekly' },
  { path: '/backyard-small-second-home/approach', priority: 0.88, changeFreq: 'monthly' },
  { path: '/backyard-small-second-home/is-this-for-you', priority: 0.88, changeFreq: 'monthly' },
  { path: '/backyard-small-second-home/victoria-rules', priority: 0.8, changeFreq: 'monthly' },
  { path: '/backyard-small-second-home/cost-rent-roi', priority: 0.8, changeFreq: 'monthly' },
  { path: '/backyard-small-second-home/feasibility-check', priority: 0.9, changeFreq: 'monthly' },
  { path: '/backyard-small-second-home/granny-flat-victoria', priority: 0.8, changeFreq: 'monthly' },
  { path: '/backyard-small-second-home/mornington-peninsula', priority: 0.7, changeFreq: 'monthly' },
  { path: '/art-gallery/founding-partners', priority: 0.9, changeFreq: 'monthly' },
  { path: '/about', priority: 0.6, changeFreq: 'yearly' },
  { path: '/edible-gardens', priority: 0.9, changeFreq: 'monthly' },
  { path: '/edible-gardens/how-it-works', priority: 0.85, changeFreq: 'monthly' },
  { path: '/experiences', priority: 0.8, changeFreq: 'monthly' },
  { path: '/cellar-door', priority: 0.8, changeFreq: 'monthly' },
  { path: '/events', priority: 0.8, changeFreq: 'monthly' },
  { path: '/newsletter', priority: 0.65, changeFreq: 'monthly' },
  { path: '/mendpress', priority: 0.78, changeFreq: 'weekly' },
  { path: '/mendpress/editorial', priority: 0.72, changeFreq: 'weekly' },
  { path: '/mendpress/dialogue', priority: 0.72, changeFreq: 'weekly' },
  { path: '/mendpress/visual-narrative', priority: 0.72, changeFreq: 'weekly' },
  { path: '/mendpress/programme', priority: 0.72, changeFreq: 'weekly' },
  { path: '/partners', priority: 0.85, changeFreq: 'monthly' },
  { path: '/partners/founding', priority: 0.85, changeFreq: 'monthly' },
  { path: '/partners/edible-gardens', priority: 0.85, changeFreq: 'monthly' },
  { path: '/partners/curator', priority: 0.85, changeFreq: 'monthly' },
  { path: '/partners/art-therapy', priority: 0.85, changeFreq: 'monthly' },
  { path: '/partners/garden-ops', priority: 0.85, changeFreq: 'monthly' },
  { path: '/tools/utm', priority: 0.6, changeFreq: 'yearly' },
  { path: '/invest', priority: 0.8, changeFreq: 'monthly' },
  { path: '/visit', priority: 0.8, changeFreq: 'monthly' },
  { path: '/workshops', priority: 0.7, changeFreq: 'monthly' },
  { path: '/privacy', priority: 0.5, changeFreq: 'yearly' },
  { path: '/terms', priority: 0.5, changeFreq: 'yearly' },
  { path: '/evidence/visitor-traffic', priority: 0.6, changeFreq: 'monthly' },
]

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const lastmod = new Date().toISOString().split('T')[0]
  const editorialEntries = await listPublishedEditorialEntries({ limit: 200 })

  const urls = [
    ...ROUTES.map(({ path, priority, changeFreq }) => {
      const loc = `${BASE_URL}${path}`
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    }),
    ...editorialEntries.map((entry) => {
      const loc = `${BASE_URL}${entry.path}`
      const entryLastmod = (entry.updatedAt || entry.publishedAt || lastmod).split('T')[0]
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${entryLastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.74</priority>
  </url>`
    }),
  ].join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
