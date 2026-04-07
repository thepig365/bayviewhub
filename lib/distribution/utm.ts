import type { DistributionPageType, DistributionPlatform, DistributionUtmFields } from '@/lib/distribution/types'

const DEFAULT_CAMPAIGN = 'bayview-share-2026q2'

export function distributionMediumForPlatform(platform: DistributionPlatform): string {
  switch (platform) {
    case 'email':
      return 'email'
    case 'wechat':
    case 'xiaohongshu':
      return 'qr'
    default:
      return 'social'
  }
}

export function defaultDistributionUtmFields(
  platform: DistributionPlatform,
  pageType: DistributionPageType
): DistributionUtmFields {
  return {
    utm_source: platform,
    utm_medium: distributionMediumForPlatform(platform),
    utm_campaign: DEFAULT_CAMPAIGN,
    utm_content: pageType.replace(/_/g, '-'),
  }
}

export function sanitizeUtmValue(value: unknown, fallback = ''): string {
  if (typeof value !== 'string') return fallback
  return value.trim().replace(/\s+/g, '-').slice(0, 120)
}

export function normalizeDistributionUtmFields(
  value: Partial<DistributionUtmFields> | null | undefined,
  fallback: DistributionUtmFields
): DistributionUtmFields {
  return {
    utm_source: sanitizeUtmValue(value?.utm_source, fallback.utm_source),
    utm_medium: sanitizeUtmValue(value?.utm_medium, fallback.utm_medium),
    utm_campaign: sanitizeUtmValue(value?.utm_campaign, fallback.utm_campaign),
    utm_content: sanitizeUtmValue(value?.utm_content, fallback.utm_content),
  }
}

export function buildTrackedDistributionUrl(baseUrl: string, fields: DistributionUtmFields): string {
  const url = new URL(baseUrl)
  url.searchParams.set('utm_source', fields.utm_source)
  url.searchParams.set('utm_medium', fields.utm_medium)
  url.searchParams.set('utm_campaign', fields.utm_campaign)
  url.searchParams.set('utm_content', fields.utm_content)
  return url.toString()
}
