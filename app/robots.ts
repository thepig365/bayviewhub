import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bayviewhub.me'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Explicit allow for OpenAI search crawler
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Gemini',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

