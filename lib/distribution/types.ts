import type { SiteLocale } from '@/lib/language-routing'

export const DISTRIBUTION_ALLOWED_HOSTNAMES = ['bayviewhub.me', 'www.bayviewhub.me', 'gallery.bayviewhub.me'] as const

export type DistributionAllowedHostname = (typeof DISTRIBUTION_ALLOWED_HOSTNAMES)[number]

export type DistributionPageType =
  | 'editorial_article'
  | 'dialogue_article'
  | 'visual_narrative'
  | 'report_article'
  | 'gallery_landing'
  | 'gallery_protocol'
  | 'ssd_landing'
  | 'campaign_landing'
  | 'hub_page'
  | 'generic_page'

export type DistributionPlatform =
  | 'linkedin'
  | 'facebook'
  | 'email'
  | 'wechat'
  | 'xiaohongshu'
  | 'reddit'
  | 'substack'

export type DistributionShareMode =
  | 'copy_text'
  | 'copy_url'
  | 'open_platform'
  | 'copy_wechat_pack'
  | 'copy_xiaohongshu_pack'
  | 'copy_email_pack'

export type DistributionRecommendationStatus = 'recommended' | 'use_with_care' | 'not_primary'

export type DistributionMetadata = {
  title: string
  metaDescription: string
  canonical: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogImage: string | null
  twitterTitle: string | null
  twitterDescription: string | null
  twitterImage: string | null
  htmlLang: string | null
  h1: string | null
  jsonLdTypes: string[]
}

export type DistributionAnalysisResult = {
  normalizedUrl: string
  hostname: string
  pathname: string
  locale: SiteLocale
  metadata: DistributionMetadata
  pageType: DistributionPageType
  warnings: string[]
  recommendedPlatforms: DistributionPlatform[]
}

export type DistributionUtmFields = {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
}

export type DistributionSharePack = {
  platform: DistributionPlatform
  platformLabel: string
  recommendationStatus: DistributionRecommendationStatus
  suggestedTitle: string
  suggestedBody: string
  ctaNote: string
  postingNote: string
  trackedUrl: string
  copyMode: DistributionShareMode
  openActionUrl?: string | null
  chineseCopyPack?: string | null
  qrUrl?: string | null
  titleVariants?: string[]
  subtitle?: string | null
  introParagraph?: string | null
}

export type DistributionLogPayload = {
  url: string
  canonicalUrl: string
  hostname: string
  pathname: string
  pageType: DistributionPageType
  pageLocale: SiteLocale
  platform: DistributionPlatform
  shareMode: DistributionShareMode
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmContent: string
  shareTextVariant?: string | null
  metadataSnapshot: Record<string, unknown>
}
