import { distributionCompleteness } from '@/lib/distribution/completeness'
import type {
  DistributionCompletenessState,
  DistributionHistoryItem,
  DistributionPageType,
  DistributionPlatform,
  DistributionShareResultStatus,
} from '@/lib/distribution/types'

export type DistributionDateRange = 'all' | '7d' | '30d' | '90d'
export type DistributionReviewSort = 'newest' | 'oldest'

export type DistributionReviewFilters = {
  platform: DistributionPlatform | 'all'
  pageType: DistributionPageType | 'all'
  resultStatus: DistributionShareResultStatus | 'none' | 'all'
  completeness: DistributionCompletenessState | 'all'
  dateRange: DistributionDateRange
  keyword: string
  sort: DistributionReviewSort
}

function lower(value: string | null | undefined): string {
  return (value || '').trim().toLowerCase()
}

function dateRangeThreshold(range: DistributionDateRange): number | null {
  const now = Date.now()
  switch (range) {
    case '7d':
      return now - 7 * 24 * 60 * 60 * 1000
    case '30d':
      return now - 30 * 24 * 60 * 60 * 1000
    case '90d':
      return now - 90 * 24 * 60 * 60 * 1000
    case 'all':
    default:
      return null
  }
}

export function filterDistributionHistory(items: DistributionHistoryItem[], filters: DistributionReviewFilters): DistributionHistoryItem[] {
  const keyword = lower(filters.keyword)
  const threshold = dateRangeThreshold(filters.dateRange)

  const filtered = items.filter((item) => {
    if (filters.platform !== 'all' && item.action.platform !== filters.platform) return false
    if (filters.pageType !== 'all' && item.action.pageType !== filters.pageType) return false
    if (filters.resultStatus === 'none' && item.result) return false
    if (filters.resultStatus !== 'all' && filters.resultStatus !== 'none' && item.result?.status !== filters.resultStatus) return false
    if (filters.completeness !== 'all' && distributionCompleteness(item).state !== filters.completeness) return false
    if (threshold) {
      const createdAt = new Date(item.action.createdAt).getTime()
      if (!Number.isFinite(createdAt) || createdAt < threshold) return false
    }

    if (keyword) {
      const haystack = [
        item.action.pathname,
        item.action.url,
        item.action.canonicalUrl,
        item.result?.externalPostUrl,
        item.result?.externalPostNotes,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      if (!haystack.includes(keyword)) return false
    }

    return true
  })

  filtered.sort((a, b) => {
    const left = new Date(a.action.createdAt).getTime()
    const right = new Date(b.action.createdAt).getTime()
    return filters.sort === 'oldest' ? left - right : right - left
  })

  return filtered
}
