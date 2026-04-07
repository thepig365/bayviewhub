import type { DistributionShareResultStatus } from '@/lib/distribution/types'

export const DISTRIBUTION_SHARE_RESULT_STATUSES = ['drafted', 'posted', 'cancelled'] as const

export function isDistributionShareResultStatus(value: unknown): value is DistributionShareResultStatus {
  return typeof value === 'string' && DISTRIBUTION_SHARE_RESULT_STATUSES.includes(value as DistributionShareResultStatus)
}

export function distributionShareResultStatusLabel(status: DistributionShareResultStatus): string {
  switch (status) {
    case 'drafted':
      return 'Drafted'
    case 'posted':
      return 'Posted'
    case 'cancelled':
      return 'Cancelled'
  }
}
