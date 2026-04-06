import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { localizedAlternates, type SiteLocale } from '@/lib/language-routing'

export type SharePackType = 'website' | 'article'
export type ShareCardTheme = 'bayview' | 'mendpress'

export type SharePack = {
  shareTitle: string
  shareSummary: string
  shareImage: string
  shareType: SharePackType
  canonicalUrl: string
  locale: SiteLocale
  languages?: Record<string, string>
}

type ShareImageInput = {
  title: string
  summary: string
  eyebrow?: string
  footer?: string
  theme?: ShareCardTheme
}

export type ShareCardPayload = {
  title: string
  summary: string
  eyebrow?: string
  footer?: string
  theme?: ShareCardTheme
}

type SharePackInput = {
  title: string
  summary: string
  path: string
  image?: string | null
  type?: SharePackType
  locale?: SiteLocale
  eyebrow?: string
  footer?: string
  theme?: ShareCardTheme
}

function cleanText(value: string, maxLength = 300): string {
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

export function clampShareSummary(value: string, minWords = 60, maxWords = 90): string {
  const clean = cleanText(value, 1200)
  const words = clean.split(/\s+/).filter(Boolean)
  if (!words.length) return ''
  if (words.length <= 3) {
    return clean.length > 260 ? `${clean.slice(0, 257).trimEnd()}...` : clean
  }
  if (words.length <= maxWords) return words.join(' ')
  return `${words.slice(0, Math.max(minWords, maxWords - 2)).join(' ')}...`
}

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl
  return `${SITE_CONFIG.url}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}

export function encodeShareCardPayload(payload: ShareCardPayload): string {
  return encodeURIComponent(JSON.stringify(payload))
}

export function decodeShareCardPayload(encoded: string | null): ShareCardPayload | null {
  if (!encoded) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(encoded))
    if (!parsed || typeof parsed !== 'object') return null
    return {
      title: cleanText(typeof parsed.title === 'string' ? parsed.title : 'Bayview Hub', 140),
      summary: cleanText(
        typeof parsed.summary === 'string'
          ? parsed.summary
          : 'A place for art, music, gardens, food, wine, workshops, beauty, and shared experience — shaped by gathering, community, and slower forms of connection on the Bayview Estate.',
        360
      ),
      eyebrow: typeof parsed.eyebrow === 'string' ? cleanText(parsed.eyebrow, 90) : undefined,
      footer: typeof parsed.footer === 'string' ? cleanText(parsed.footer, 90) : undefined,
      theme: parsed.theme === 'mendpress' ? 'mendpress' : 'bayview',
    }
  } catch {
    return null
  }
}

export function buildShareImageUrl({
  title,
  summary,
  eyebrow,
  footer,
  theme = 'bayview',
}: ShareImageInput): string {
  const params = new URLSearchParams()
  params.set(
    'payload',
    encodeShareCardPayload({
      title: cleanText(title, 140),
      summary: cleanText(summary, 360),
      eyebrow: eyebrow ? cleanText(eyebrow, 90) : undefined,
      footer: footer ? cleanText(footer, 90) : undefined,
      theme,
    })
  )
  return `${SITE_CONFIG.url}/share-card.png?${params.toString()}`
}

export function buildSharePack({
  title,
  summary,
  path,
  image,
  type = 'website',
  locale,
  eyebrow,
  footer,
  theme = 'bayview',
}: SharePackInput): SharePack {
  const alternateMeta = localizedAlternates(path || '/')
  const canonicalUrl = `${SITE_CONFIG.url}${alternateMeta.canonicalPath}`
  return {
    shareTitle: cleanText(title, 180),
    shareSummary: clampShareSummary(summary),
    shareImage:
      image && image.trim()
        ? absoluteUrl(image.trim())
        : buildShareImageUrl({
            title,
            summary,
            eyebrow,
            footer,
            theme,
          }),
    shareType: type,
    canonicalUrl,
    locale: locale || alternateMeta.locale,
    languages: alternateMeta.languages,
  }
}

export function metadataFromSharePack(
  pack: SharePack,
  overrides?: Pick<Metadata, 'title' | 'description' | 'robots' | 'keywords' | 'authors'>
): Metadata {
  return {
    title: overrides?.title || pack.shareTitle,
    description: overrides?.description || pack.shareSummary,
    robots: overrides?.robots,
    keywords: overrides?.keywords,
    authors: overrides?.authors,
    alternates: {
      canonical: pack.canonicalUrl,
      languages: pack.languages,
    },
    openGraph: {
      type: pack.shareType,
      locale: pack.locale === 'zh' ? 'zh_CN' : 'en_AU',
      url: pack.canonicalUrl,
      siteName: SITE_CONFIG.name,
      title: pack.shareTitle,
      description: pack.shareSummary,
      images: [
        {
          url: pack.shareImage,
          width: 1200,
          height: 630,
          alt: pack.shareTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pack.shareTitle,
      description: pack.shareSummary,
      images: [pack.shareImage],
    },
  }
}

export function buildBayviewDefaultSharePack(): SharePack {
  return buildSharePack({
    title: 'Bayview Hub',
    summary:
      'Bayview Hub is a cultural estate on the Mornington Peninsula where art, music, gardens, food, wine, workshops, and slower public life are held together as one lived ecology. It brings together gathering, editorial thinking, beauty, and shared experience on the Bayview Estate, offering a more grounded and communal rhythm than generic lifestyle or hospitality brands.',
    path: '/',
    eyebrow: 'Bayview Hub',
    footer: 'Victoria',
    theme: 'bayview',
    type: 'website',
  })
}
