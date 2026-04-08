import { distributionCompleteness, distributionItemIsIncomplete } from '@/lib/distribution/completeness'
import type { DistributionHistoryItem, DistributionManualMetrics, DistributionPageType, DistributionPlatform } from '@/lib/distribution/types'

export type DistributionAggregateRow<Key extends string> = {
  key: Key
  totalActions: number
  totalPostedResults: number
  totalIncompleteItems: number
}

export type DistributionPerformanceSummary = {
  totalActions: number
  totalResults: number
  totalActionsWithoutResult: number
  draftedCount: number
  postedCount: number
  cancelledCount: number
  manualMetricTotals: DistributionManualMetrics
  byPlatform: DistributionAggregateRow<DistributionPlatform>[]
  byPageType: DistributionAggregateRow<DistributionPageType>[]
}

const METRIC_KEYS = ['likes', 'comments', 'shares', 'opens', 'subscribers'] as const

function addMetrics(target: DistributionManualMetrics, source: DistributionManualMetrics | null | undefined) {
  if (!source) return
  for (const key of METRIC_KEYS) {
    const value = source[key]
    if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
      target[key] = (target[key] || 0) + value
    }
  }
}

function aggregateBy<Key extends string>(
  items: DistributionHistoryItem[],
  selectKey: (item: DistributionHistoryItem) => Key
): DistributionAggregateRow<Key>[] {
  const rows = new Map<Key, DistributionAggregateRow<Key>>()
  for (const item of items) {
    const key = selectKey(item)
    const row =
      rows.get(key) ||
      ({
        key,
        totalActions: 0,
        totalPostedResults: 0,
        totalIncompleteItems: 0,
      } satisfies DistributionAggregateRow<Key>)

    row.totalActions += 1
    if (item.result?.status === 'posted') row.totalPostedResults += 1
    if (distributionItemIsIncomplete(item)) row.totalIncompleteItems += 1
    rows.set(key, row)
  }

  return Array.from(rows.values()).sort((a, b) => b.totalActions - a.totalActions || a.key.localeCompare(b.key))
}

export function summarizeDistributionPerformance(items: DistributionHistoryItem[]): DistributionPerformanceSummary {
  const summary: DistributionPerformanceSummary = {
    totalActions: items.length,
    totalResults: 0,
    totalActionsWithoutResult: 0,
    draftedCount: 0,
    postedCount: 0,
    cancelledCount: 0,
    manualMetricTotals: {},
    byPlatform: [],
    byPageType: [],
  }

  for (const item of items) {
    if (!item.result) {
      summary.totalActionsWithoutResult += 1
      continue
    }

    summary.totalResults += 1
    const completeness = distributionCompleteness(item)

    switch (item.result.status) {
      case 'drafted':
        summary.draftedCount += 1
        break
      case 'posted':
        summary.postedCount += 1
        break
      case 'cancelled':
        summary.cancelledCount += 1
        break
    }

    if (completeness.state === 'posted_complete' || completeness.state === 'posted_missing_metrics') {
      addMetrics(summary.manualMetricTotals, item.result.manualMetrics)
    }
  }

  summary.byPlatform = aggregateBy(items, (item) => item.action.platform)
  summary.byPageType = aggregateBy(items, (item) => item.action.pageType)

  return summary
}
