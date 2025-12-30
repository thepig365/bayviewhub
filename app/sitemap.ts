import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bayviewhub.me'
  
  const routes = [
    '',
    '/experiences',
    '/cellar-door',
    '/events',
    '/second-home',
    '/partners',
    '/partners/edible-gardens',
    '/tools/utm',
    '/invest',
    '/visit',
    '/gardens',
    '/workshops',
    '/privacy',
    '/terms',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}

