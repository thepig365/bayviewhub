import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bayviewhub.me'

  const routes: { path: string; priority: number; changeFreq: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1, changeFreq: 'weekly' },
    { path: '/second-home', priority: 0.95, changeFreq: 'weekly' },
    { path: '/second-home/victoria-rules', priority: 0.9, changeFreq: 'monthly' },
    { path: '/second-home/cost-rent-roi', priority: 0.9, changeFreq: 'monthly' },
    { path: '/backyard-second-home/feasibility-checklist', priority: 0.9, changeFreq: 'monthly' },
    { path: '/art-gallery', priority: 0.9, changeFreq: 'monthly' },
    { path: '/art-gallery/founding-partners', priority: 0.85, changeFreq: 'monthly' },
    { path: '/edible-gardens', priority: 0.9, changeFreq: 'monthly' },
    { path: '/edible-gardens/how-it-works', priority: 0.85, changeFreq: 'monthly' },
    { path: '/experiences', priority: 0.8, changeFreq: 'monthly' },
    { path: '/cellar-door', priority: 0.8, changeFreq: 'monthly' },
    { path: '/events', priority: 0.8, changeFreq: 'monthly' },
    { path: '/partners', priority: 0.85, changeFreq: 'monthly' },
    { path: '/partners/founding', priority: 0.85, changeFreq: 'monthly' },
    { path: '/partners/edible-gardens', priority: 0.85, changeFreq: 'monthly' },
    { path: '/tools/utm', priority: 0.6, changeFreq: 'yearly' },
    { path: '/invest', priority: 0.8, changeFreq: 'monthly' },
    { path: '/visit', priority: 0.8, changeFreq: 'monthly' },
    { path: '/workshops', priority: 0.8, changeFreq: 'monthly' },
    { path: '/privacy', priority: 0.5, changeFreq: 'yearly' },
    { path: '/terms', priority: 0.5, changeFreq: 'yearly' },
  ]

  return routes.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }))
}

