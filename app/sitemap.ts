import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bayviewhub.com.au'
  
  const routes = [
    '',
    '/experiences',
    '/cellar-door',
    '/events',
    '/second-home',
    '/partners',
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

