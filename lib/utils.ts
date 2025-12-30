import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate social media share URLs
export function generateShareUrl(platform: string, url: string, title: string, description?: string) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDesc = description ? encodeURIComponent(description) : ''

  const urls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`,
  }

  return urls[platform as keyof typeof urls] || encodedUrl
}

// SEO metadata generator
export function generateMetadata(page: {
  title: string
  description: string
  image?: string
  path?: string
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bayviewhub.com.au'
  const fullUrl = `${baseUrl}${page.path || ''}`
  const ogImage = page.image || `${baseUrl}/og-image.png`

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: fullUrl,
      siteName: 'Bayview Hub',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

