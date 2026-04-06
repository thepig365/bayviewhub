import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { localizedAlternates } from '@/lib/language-routing'
import { buildSharePack, metadataFromSharePack, type SharePackType } from '@/lib/share-pack'

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
  type?: SharePackType
  shareTitle?: string
  shareSummary?: string
  shareImage?: string
  shareEyebrow?: string
  shareFooter?: string
  theme?: 'bayview' | 'mendpress'
}) {
  const resolvedPath = page.path || ''
  const sharePack = buildSharePack({
    title: page.shareTitle || page.title,
    summary: page.shareSummary || page.description,
    path: resolvedPath || '/',
    image: page.shareImage || page.image,
    type: page.type || 'website',
    eyebrow: page.shareEyebrow || 'Bayview Hub',
    footer: page.shareFooter || 'Victoria',
    theme: page.theme || 'bayview',
  })
  const alternateMeta = localizedAlternates(resolvedPath || '/')
  const metadata = metadataFromSharePack(sharePack, {
    title: page.title,
    description: page.description,
  })

  return {
    ...metadata,
    alternates: {
      canonical: metadata.alternates?.canonical || sharePack.canonicalUrl,
      languages: alternateMeta.languages,
    },
  }
}

