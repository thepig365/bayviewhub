import type {
  DistributionCompletenessState,
  DistributionHistoryItem,
  DistributionManualMetrics,
} from '@/lib/distribution/types'

type CompletenessMeta = {
  state: DistributionCompletenessState
  label: string
  description: string
}

function hasMetrics(metrics: DistributionManualMetrics | null | undefined): boolean {
  if (!metrics) return false
  return ['likes', 'comments', 'shares', 'opens', 'subscribers'].some((key) => {
    const value = metrics[key as keyof DistributionManualMetrics]
    return typeof value === 'number' && Number.isFinite(value) && value >= 0
  })
}

export function distributionCompleteness(item: DistributionHistoryItem): CompletenessMeta {
  const result = item.result
  if (!result) {
    return {
      state: 'no_result',
      label: 'No result yet',
      description: 'Action was logged, but no outcome has been recorded yet.',
    }
  }

  if (result.status === 'cancelled') {
    return {
      state: 'cancelled',
      label: 'Cancelled',
      description: 'Outcome was recorded as cancelled.',
    }
  }

  if (result.status === 'drafted') {
    return {
      state: 'drafted_incomplete',
      label: 'Drafted, still incomplete',
      description: 'A draft result exists, but posting evidence is still incomplete.',
    }
  }

  if (!result.externalPostUrl) {
    return {
      state: 'posted_missing_url',
      label: 'Posted, missing URL',
      description: 'Marked posted, but no external post URL has been captured.',
    }
  }

  if (!hasMetrics(result.manualMetrics)) {
    return {
      state: 'posted_missing_metrics',
      label: 'Posted, missing metrics',
      description: 'Marked posted with a URL, but no manual metrics have been entered.',
    }
  }

  return {
    state: 'posted_complete',
    label: 'Posted, review-complete',
    description: 'Posted with external URL and manual metrics captured.',
  }
}

export function distributionCompletenessTone(state: DistributionCompletenessState): string {
  switch (state) {
    case 'posted_complete':
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
    case 'cancelled':
      return 'border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300'
    case 'posted_missing_metrics':
      return 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300'
    case 'posted_missing_url':
    case 'drafted_incomplete':
    case 'no_result':
    default:
      return 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
  }
}

export function distributionItemIsIncomplete(item: DistributionHistoryItem): boolean {
  const state = distributionCompleteness(item).state
  return state !== 'posted_complete' && state !== 'cancelled'
}
