import { defaultLocaleForDistributionPath, detectDistributionPageType, recommendedPlatformsForPageType } from '@/lib/distribution/detect-page-type'
import {
  DISTRIBUTION_ALLOWED_HOSTNAMES,
  type DistributionAllowedHostname,
  type DistributionAnalysisResult,
  type DistributionMetadata,
} from '@/lib/distribution/types'
import { normalizePathname } from '@/lib/language-routing'

const USER_AGENT = 'Bayview Share Engine MVP/1.0 (+https://www.bayviewhub.me)'

export function isAllowedDistributionHostname(hostname: string): hostname is DistributionAllowedHostname {
  return (DISTRIBUTION_ALLOWED_HOSTNAMES as readonly string[]).includes(hostname)
}

export function normalizeDistributionUrl(input: string): URL {
  const trimmed = input.trim()
  if (!trimmed) {
    throw new Error('Please enter a Bayview URL.')
  }
  const withScheme = /^[a-z]+:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  let url: URL
  try {
    url = new URL(withScheme)
  } catch {
    throw new Error('The URL could not be parsed.')
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Only http and https URLs are supported.')
  }
  if (!isAllowedDistributionHostname(url.hostname)) {
    throw new Error(`Only Bayview-owned hostnames are allowed: ${DISTRIBUTION_ALLOWED_HOSTNAMES.join(', ')}.`)
  }
  url.hash = ''
  url.pathname = normalizePathname(url.pathname)
  return url
}

function decodeHtml(value: string | null): string {
  if (!value) return ''
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function containsChinese(value: string | null | undefined): boolean {
  return Boolean(value && /[\u3400-\u9fff]/.test(value))
}

function containsLatin(value: string | null | undefined): boolean {
  return Boolean(value && /[A-Za-z]/.test(value))
}

function looksEnglishFirst(value: string | null | undefined): boolean {
  return Boolean(value && containsLatin(value) && !containsChinese(value))
}

function stripTags(value: string | null): string {
  if (!value) return ''
  return decodeHtml(value.replace(/<[^>]+>/g, ' '))
}

function matchAttr(tag: string, attr: string): string | null {
  const regex = new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, 'i')
  return tag.match(regex)?.[1] || null
}

function firstMatch(html: string, pattern: RegExp): string | null {
  return html.match(pattern)?.[1] || null
}

function extractMetaContent(html: string, attrName: 'name' | 'property', attrValue: string): string | null {
  const tags = html.match(/<meta\b[^>]*>/gi) || []
  for (const tag of tags) {
    const attr = matchAttr(tag, attrName)
    if (attr?.toLowerCase() === attrValue.toLowerCase()) {
      return decodeHtml(matchAttr(tag, 'content'))
    }
  }
  return null
}

function extractCanonical(html: string): string | null {
  const tags = html.match(/<link\b[^>]*>/gi) || []
  for (const tag of tags) {
    const rel = matchAttr(tag, 'rel')
    if (rel?.toLowerCase().includes('canonical')) {
      return matchAttr(tag, 'href')
    }
  }
  return null
}

function extractLeadParagraph(html: string): string | null {
  const matches = html.match(/<p\b[^>]*>([\s\S]*?)<\/p>/gi) || []
  for (const match of matches) {
    const body = match.replace(/^<p\b[^>]*>/i, '').replace(/<\/p>$/i, '')
    const text = stripTags(body)
    if (text.length >= 80) return text
  }
  return null
}

function extractJsonLdTypes(html: string): string[] {
  const matches = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || []
  const types = new Set<string>()
  for (const chunk of matches) {
    const raw = chunk.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '').trim()
    if (!raw) continue
    try {
      const parsed = JSON.parse(raw) as unknown
      for (const value of flattenJsonLdTypes(parsed)) {
        if (typeof value === 'string' && value.trim()) {
          types.add(value.trim())
        }
      }
    } catch {
      continue
    }
  }
  return Array.from(types)
}

function flattenJsonLdTypes(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => flattenJsonLdTypes(item))
  }
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    const own = typeof record['@type'] === 'string' ? [record['@type']] : Array.isArray(record['@type']) ? record['@type'].filter((item): item is string => typeof item === 'string') : []
    return [...own, ...Object.values(record).flatMap((item) => flattenJsonLdTypes(item))]
  }
  return []
}

function extractMetadata(html: string): DistributionMetadata {
  return {
    title: decodeHtml(stripTags(firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i))),
    metaDescription: extractMetaContent(html, 'name', 'description') || '',
    canonical: extractCanonical(html),
    ogTitle: extractMetaContent(html, 'property', 'og:title'),
    ogDescription: extractMetaContent(html, 'property', 'og:description'),
    ogImage: extractMetaContent(html, 'property', 'og:image'),
    twitterTitle: extractMetaContent(html, 'name', 'twitter:title'),
    twitterDescription: extractMetaContent(html, 'name', 'twitter:description'),
    twitterImage: extractMetaContent(html, 'name', 'twitter:image'),
    htmlLang: matchAttr(firstMatch(html, /<html\b[^>]*>/i) || '', 'lang'),
    h1: stripTags(firstMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)),
    leadParagraph: extractLeadParagraph(html),
    jsonLdTypes: extractJsonLdTypes(html),
  }
}

function resolveMaybeUrl(value: string | null, baseUrl: string): string | null {
  if (!value) return null
  try {
    return new URL(value, baseUrl).toString()
  } catch {
    return value
  }
}

function buildWarnings(
  url: URL,
  metadata: DistributionMetadata,
  responseUrl: string,
  pageType: DistributionAnalysisResult['pageType'],
  locale: DistributionAnalysisResult['locale']
): string[] {
  const warnings: string[] = []
  const descriptionCandidates = [metadata.ogDescription, metadata.twitterDescription, metadata.metaDescription].filter(
    (value): value is string => Boolean(value?.trim())
  )
  const strongestDescription = descriptionCandidates.sort((a, b) => b.length - a.length)[0] || ''

  if (!metadata.title) warnings.push('Missing <title> tag.')
  if (!metadata.metaDescription) warnings.push('Missing meta description.')
  if (!metadata.canonical) warnings.push('Missing canonical link.')
  if (!metadata.ogTitle) warnings.push('Missing og:title.')
  if (!metadata.ogDescription) warnings.push('Missing og:description.')
  if (!metadata.ogImage) warnings.push('Missing og:image.')
  if (!metadata.h1) warnings.push('No H1 detected in the HTML response.')
  if (!metadata.leadParagraph) warnings.push('No strong lead paragraph detected in the HTML response.')
  if (!metadata.ogTitle && !metadata.twitterTitle) {
    warnings.push('Share title metadata is weak; packs may fall back to H1 or HTML title.')
  }
  if (!strongestDescription) {
    warnings.push('Description metadata is weak; some packs may fall back to a minimal neutral summary.')
  } else if (strongestDescription.length < 90) {
    warnings.push('Description metadata is short; some platform packs may read as thin or generic.')
  }
  if (metadata.canonical) {
    try {
      const canonical = new URL(metadata.canonical, responseUrl).toString()
      if (canonical !== responseUrl) warnings.push('Canonical URL differs from the fetched page URL.')
    } catch {
      warnings.push('Canonical URL could not be parsed.')
    }
  }
  if (metadata.htmlLang && metadata.htmlLang.toLowerCase().startsWith('zh') !== url.pathname.startsWith('/zh')) {
    warnings.push('html lang and pathname locale do not fully agree.')
  }
  if (locale === 'zh') {
    if (!metadata.htmlLang?.toLowerCase().startsWith('zh')) {
      warnings.push('Chinese path is paired with non-Chinese html lang metadata.')
    }
    if (
      containsChinese(metadata.h1) &&
      [metadata.ogTitle, metadata.twitterTitle].some((value) => looksEnglishFirst(value))
    ) {
      warnings.push('Chinese path has English-first social title metadata; localized packs will prefer the on-page Chinese title.')
    }
    if (containsChinese(metadata.h1) && looksEnglishFirst(metadata.title)) {
      warnings.push('Chinese path has an English HTML title; localized packs will avoid it when a Chinese on-page title exists.')
    }
    if (!descriptionCandidates.some((value) => containsChinese(value)) && !containsChinese(metadata.leadParagraph)) {
      warnings.push('Chinese path lacks Chinese summary metadata; localized packs will use a conservative Chinese fallback.')
    }
  }
  if (locale === 'en' && descriptionCandidates.some((value) => containsChinese(value)) && !containsLatin(strongestDescription)) {
    warnings.push('English path is relying on non-English description metadata; output tone may need manual review.')
  }
  if (pageType === 'generic_page') warnings.push('Page type fell back to generic_page; review the platform mix manually.')
  return warnings
}

export async function analyzeDistributionUrl(input: string): Promise<DistributionAnalysisResult> {
  const normalizedInput = normalizeDistributionUrl(input)
  const response = await fetch(normalizedInput.toString(), {
    headers: { 'user-agent': USER_AGENT },
    redirect: 'follow',
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Target page responded with ${response.status}.`)
  }

  const finalUrl = normalizeDistributionUrl(response.url)
  const html = await response.text()
  const rawMetadata = extractMetadata(html)
  const metadata: DistributionMetadata = {
    ...rawMetadata,
    canonical: resolveMaybeUrl(rawMetadata.canonical, finalUrl.toString()),
    ogImage: resolveMaybeUrl(rawMetadata.ogImage, finalUrl.toString()),
    twitterImage: resolveMaybeUrl(rawMetadata.twitterImage, finalUrl.toString()),
  }
  const pathname = normalizePathname(finalUrl.pathname)
  const locale = defaultLocaleForDistributionPath(pathname)
  const pageType = detectDistributionPageType({
    hostname: finalUrl.hostname,
    pathname,
    metadata,
  })
  const warnings = buildWarnings(finalUrl, metadata, finalUrl.toString(), pageType, locale)

  return {
    normalizedUrl: finalUrl.toString(),
    hostname: finalUrl.hostname,
    pathname,
    locale,
    metadata,
    pageType,
    warnings,
    recommendedPlatforms: recommendedPlatformsForPageType(pageType, locale),
  }
}
