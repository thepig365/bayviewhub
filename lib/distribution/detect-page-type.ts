import { localeFromPathname, normalizePathname, toEnglishPathname, type SiteLocale } from '@/lib/language-routing'
import type { DistributionMetadata, DistributionPageType, DistributionPlatform } from '@/lib/distribution/types'

type DetectPageTypeInput = {
  hostname: string
  pathname: string
  metadata: DistributionMetadata
}

export function detectDistributionPageType({ hostname, pathname, metadata }: DetectPageTypeInput): DistributionPageType {
  const normalizedPath = normalizePathname(pathname)
  const englishPath = toEnglishPathname(normalizedPath)
  const jsonLdTypes = metadata.jsonLdTypes.map((value) => value.toLowerCase())
  const haystack = [
    metadata.title,
    metadata.ogTitle,
    metadata.h1,
    metadata.metaDescription,
    metadata.ogDescription,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  if (hostname === 'gallery.bayviewhub.me') {
    if (englishPath === '/open-your-wall' || englishPath.startsWith('/open-your-wall/')) return 'gallery_landing'
    if (englishPath === '/protocol' || englishPath.startsWith('/protocol/')) return 'gallery_protocol'
    return 'hub_page'
  }

  if (englishPath === '/backyard-small-second-home' || englishPath.startsWith('/backyard-small-second-home/')) {
    return 'ssd_landing'
  }

  if (
    englishPath === '/newsletter' ||
    englishPath === '/events' ||
    englishPath.startsWith('/partners/') ||
    englishPath === '/partners'
  ) {
    return 'campaign_landing'
  }

  if (englishPath === '/mendpress/visual-narrative') return 'visual_narrative'
  if (englishPath === '/mendpress/reports') return 'report_article'

  if (englishPath.startsWith('/mendpress/')) {
    if (englishPath === '/mendpress/dialogue' || englishPath === '/mendpress/listen') return 'hub_page'
    if (englishPath === '/mendpress/editorial' || englishPath === '/mendpress/programme') return 'hub_page'
    if (jsonLdTypes.includes('podcastepisode') || /\bdialogue\b|\bpodcast\b|\b对话\b|\b播客\b/.test(haystack)) {
      return 'dialogue_article'
    }
    if (/\bvisual narrative\b|\b视觉叙事\b/.test(haystack) || englishPath.includes('visual')) {
      return 'visual_narrative'
    }
    if (/\breport\b|\b报告\b/.test(haystack) || englishPath.includes('report')) {
      return 'report_article'
    }
    return 'editorial_article'
  }

  if (englishPath === '/' || ['/about', '/visit', '/experiences', '/workshops', '/edible-gardens', '/invest'].includes(englishPath)) {
    return 'hub_page'
  }

  return 'generic_page'
}

export function recommendedPlatformsForPageType(pageType: DistributionPageType, locale: SiteLocale): DistributionPlatform[] {
  switch (pageType) {
    case 'editorial_article':
      return locale === 'zh'
        ? ['wechat', 'xiaohongshu', 'linkedin', 'email', 'substack', 'facebook']
        : ['linkedin', 'email', 'substack', 'facebook', 'reddit', 'wechat']
    case 'dialogue_article':
      return locale === 'zh'
        ? ['wechat', 'xiaohongshu', 'linkedin', 'email', 'reddit', 'facebook']
        : ['linkedin', 'reddit', 'email', 'facebook', 'wechat', 'xiaohongshu']
    case 'visual_narrative':
      return locale === 'zh'
        ? ['xiaohongshu', 'wechat', 'facebook', 'linkedin', 'email']
        : ['facebook', 'linkedin', 'email', 'reddit', 'wechat', 'xiaohongshu']
    case 'report_article':
      return ['linkedin', 'email', 'reddit', 'substack', 'facebook']
    case 'gallery_landing':
      return locale === 'zh'
        ? ['xiaohongshu', 'wechat', 'linkedin', 'facebook', 'email']
        : ['linkedin', 'facebook', 'email', 'wechat', 'xiaohongshu']
    case 'gallery_protocol':
      return ['linkedin', 'email', 'reddit', 'facebook']
    case 'ssd_landing':
      return ['linkedin', 'facebook', 'email', 'reddit', 'substack']
    case 'campaign_landing':
      return ['linkedin', 'facebook', 'email', 'wechat']
    case 'hub_page':
      return locale === 'zh'
        ? ['wechat', 'xiaohongshu', 'linkedin', 'facebook', 'email']
        : ['linkedin', 'facebook', 'email', 'wechat', 'reddit']
    case 'generic_page':
    default:
      return ['linkedin', 'email', 'facebook']
  }
}

export function defaultLocaleForDistributionPath(pathname: string): SiteLocale {
  return localeFromPathname(pathname)
}
