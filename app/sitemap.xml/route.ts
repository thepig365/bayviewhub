import { NextResponse } from 'next/server'
import { editorialHasChinesePageContent, listPublishedEditorialEntries, type EditorialEntry } from '@/lib/editorial'

const BASE_URL = 'https://www.bayviewhub.me'

/**
 * Sitemap is canonical-only. Rules:
 * - Only list self-canonical, publicly indexable URLs on www.bayviewhub.me.
 * - NEVER list marketing subdomain aliases (secondhome.*, ssd.*, gardens.*, etc.) — those 308-redirect to these paths; listing them would create duplicate-URL noise.
 * - NEVER list intentional cross-ecosystem redirects (/events → Pig & Whistle, /art-gallery → gallery subdomain, /experiences/gallery → gallery subdomain).
 * - NEVER list pages with `robots: noindex` (e.g. /edible-gardens while the program is "Coming Soon").
 * - NEVER list /api, /admin, /private, /tools/utm internals, login pages, unsubscribe flows, or thin utility pages.
 */
const ROUTES: { path: string; priority: number; changeFreq: string }[] = [
  // Home + language root
  { path: '', priority: 1, changeFreq: 'weekly' },
  { path: '/zh', priority: 0.9, changeFreq: 'weekly' },

  // Chinese localized surface (kept to live, indexable pages with real content)
  { path: '/zh/about', priority: 0.78, changeFreq: 'monthly' },
  { path: '/zh/experiences', priority: 0.78, changeFreq: 'monthly' },
  { path: '/zh/visit', priority: 0.78, changeFreq: 'monthly' },
  { path: '/zh/workshops', priority: 0.78, changeFreq: 'monthly' },
  { path: '/zh/backyard-small-second-home', priority: 0.8, changeFreq: 'monthly' },
  { path: '/zh/newsletter', priority: 0.68, changeFreq: 'monthly' },
  { path: '/zh/mendpress', priority: 0.76, changeFreq: 'weekly' },
  { path: '/zh/mendpress/editorial', priority: 0.7, changeFreq: 'weekly' },
  { path: '/zh/mendpress/dialogue', priority: 0.7, changeFreq: 'weekly' },
  { path: '/zh/mendpress/visual-narrative', priority: 0.7, changeFreq: 'weekly' },
  { path: '/zh/mendpress/programme', priority: 0.7, changeFreq: 'weekly' },
  { path: '/zh/mendpress/listen', priority: 0.68, changeFreq: 'weekly' },
  { path: '/zh/partners', priority: 0.78, changeFreq: 'monthly' },
  { path: '/zh/partners/founding', priority: 0.78, changeFreq: 'monthly' },
  { path: '/zh/invest', priority: 0.74, changeFreq: 'monthly' },
  { path: '/zh/privacy', priority: 0.4, changeFreq: 'yearly' },
  { path: '/zh/terms', priority: 0.4, changeFreq: 'yearly' },
  // /zh/edible-gardens intentionally omitted: parent English /edible-gardens is noindex (program pre-launch).

  // SSD cluster – commercially highest priority
  { path: '/backyard-small-second-home', priority: 0.95, changeFreq: 'weekly' },
  { path: '/backyard-small-second-home/approach', priority: 0.86, changeFreq: 'monthly' },
  { path: '/backyard-small-second-home/is-this-for-you', priority: 0.86, changeFreq: 'monthly' },
  { path: '/backyard-small-second-home/victoria-rules', priority: 0.82, changeFreq: 'monthly' },
  { path: '/backyard-small-second-home/cost-rent-roi', priority: 0.82, changeFreq: 'monthly' },
  { path: '/backyard-small-second-home/feasibility-check', priority: 0.9, changeFreq: 'monthly' },
  { path: '/backyard-small-second-home/granny-flat-victoria', priority: 0.78, changeFreq: 'monthly' },
  { path: '/backyard-small-second-home/mornington-peninsula', priority: 0.72, changeFreq: 'monthly' },

  // Gallery partnership role (gallery itself lives on gallery.bayviewhub.me — not listed here)
  { path: '/art-gallery/founding-partners', priority: 0.88, changeFreq: 'monthly' },

  // About / visit / hospitality
  { path: '/about', priority: 0.7, changeFreq: 'yearly' },
  { path: '/visit', priority: 0.85, changeFreq: 'monthly' },
  { path: '/cellar-door', priority: 0.8, changeFreq: 'monthly' },
  { path: '/experiences', priority: 0.76, changeFreq: 'monthly' },

  // Edible Gardens: hub page is noindex while the program is pre-launch; how-it-works stays live
  { path: '/edible-gardens/how-it-works', priority: 0.72, changeFreq: 'monthly' },

  // Mendpress editorial publication
  { path: '/mendpress', priority: 0.82, changeFreq: 'weekly' },
  { path: '/mendpress/editorial', priority: 0.76, changeFreq: 'weekly' },
  { path: '/mendpress/dialogue', priority: 0.76, changeFreq: 'weekly' },
  { path: '/mendpress/visual-narrative', priority: 0.76, changeFreq: 'weekly' },
  { path: '/mendpress/programme', priority: 0.76, changeFreq: 'weekly' },
  { path: '/mendpress/listen', priority: 0.7, changeFreq: 'weekly' },

  // Partnerships / investment
  { path: '/partners', priority: 0.85, changeFreq: 'monthly' },
  { path: '/partners/founding', priority: 0.82, changeFreq: 'monthly' },
  { path: '/partners/edible-gardens', priority: 0.8, changeFreq: 'monthly' },
  { path: '/partners/curator', priority: 0.8, changeFreq: 'monthly' },
  { path: '/partners/art-therapy', priority: 0.78, changeFreq: 'monthly' },
  { path: '/partners/garden-ops', priority: 0.78, changeFreq: 'monthly' },
  { path: '/invest', priority: 0.82, changeFreq: 'monthly' },

  // Workshops (live programme)
  { path: '/workshops', priority: 0.8, changeFreq: 'monthly' },

  // Supporting surfaces
  { path: '/newsletter', priority: 0.6, changeFreq: 'monthly' },
  { path: '/evidence/visitor-traffic', priority: 0.55, changeFreq: 'monthly' },

  // Legal
  { path: '/privacy', priority: 0.4, changeFreq: 'yearly' },
  { path: '/terms', priority: 0.4, changeFreq: 'yearly' },

  // NOTE: intentionally EXCLUDED:
  //  - /events          (307 → Pig & Whistle /what-s-on; listing it would point crawlers at an external host)
  //  - /edible-gardens  (hub page robots: noindex,nofollow while the program is pre-launch)
  //  - /experiences/gallery, /art-gallery (redirects to gallery.bayviewhub.me — separate project)
  //  - /tools/utm       (internal utility for campaign URLs, not a content page)
  //  - /newsletter/unsubscribe, /private/*, /admin/*, /api/*  (auth, flows, or internal)
]

function urlEntry(loc: string, lastmod: string, changeFreq: string, priority: number): string {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

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

  const editorialUrlBlocks = editorialEntries.flatMap((entry: EditorialEntry) => {
    const entryLastmod = (entry.updatedAt || entry.publishedAt || lastmod).split('T')[0]
    const en = urlEntry(`${BASE_URL}${entry.path}`, entryLastmod, 'monthly', 0.74)
    if (editorialHasChinesePageContent(entry)) {
      const zh = urlEntry(`${BASE_URL}/zh/mendpress/${entry.slug}`, entryLastmod, 'monthly', 0.72)
      return [en, zh]
    }
    return [en]
  })

  const urls = [
    ...ROUTES.map(({ path, priority, changeFreq }) => {
      const loc = `${BASE_URL}${path}`
      return urlEntry(loc, lastmod, changeFreq, priority)
    }),
    ...editorialUrlBlocks,
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
