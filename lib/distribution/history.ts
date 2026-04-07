import { getSupabaseServer } from '@/lib/ssd-campaign-server'
import type {
  DistributionHistoryItem,
  DistributionManualMetrics,
  DistributionShareActionRecord,
  DistributionShareActionResultRecord,
  DistributionShareMode,
  DistributionShareResultStatus,
} from '@/lib/distribution/types'
import { isDistributionShareResultStatus } from '@/lib/distribution/result-status'

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function asMetrics(value: unknown): DistributionManualMetrics {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const record = value as Record<string, unknown>
  const next: DistributionManualMetrics = {}
  for (const key of ['likes', 'comments', 'shares', 'opens', 'subscribers'] as const) {
    const raw = record[key]
    if (typeof raw === 'number' && Number.isFinite(raw) && raw >= 0) {
      next[key] = raw
    }
  }
  return next
}

export function mapDistributionShareActionRecord(row: Record<string, unknown>): DistributionShareActionRecord | null {
  const id = asString(row.id)
  const createdAt = asString(row.created_at)
  const url = asString(row.url)
  const canonicalUrl = asString(row.canonical_url)
  const hostname = asString(row.hostname)
  const pathname = asString(row.pathname)
  const pageType = asString(row.page_type)
  const pageLocale = asString(row.page_locale)
  const platform = asString(row.platform)
  const shareMode = asString(row.share_mode)
  if (!id || !createdAt || !url || !canonicalUrl || !hostname || !pathname || !pageType || !pageLocale || !platform || !shareMode) {
    return null
  }

  return {
    id,
    createdAt,
    url,
    canonicalUrl,
    hostname,
    pathname,
    pageType: pageType as DistributionShareActionRecord['pageType'],
    pageLocale: pageLocale as DistributionShareActionRecord['pageLocale'],
    platform: platform as DistributionShareActionRecord['platform'],
    shareMode: shareMode as DistributionShareMode,
    utmSource: asString(row.utm_source),
    utmMedium: asString(row.utm_medium),
    utmCampaign: asString(row.utm_campaign),
    utmContent: asString(row.utm_content),
    shareTextVariant: asString(row.share_text_variant),
  }
}

export function mapDistributionShareActionResultRecord(row: Record<string, unknown>): DistributionShareActionResultRecord | null {
  const id = asString(row.id)
  const createdAt = asString(row.created_at)
  const shareActionId = asString(row.share_action_id)
  const platform = asString(row.platform)
  const status = asString(row.status)
  if (!id || !createdAt || !shareActionId || !platform || !status || !isDistributionShareResultStatus(status)) {
    return null
  }

  return {
    id,
    createdAt,
    shareActionId,
    platform: platform as DistributionShareActionResultRecord['platform'],
    status: status as DistributionShareResultStatus,
    externalPostUrl: asString(row.external_post_url),
    externalPostNotes: asString(row.external_post_notes),
    manualMetrics: asMetrics(row.manual_metrics),
    lastCheckedAt: asString(row.last_checked_at),
  }
}

export async function listRecentDistributionHistory(limit = 18): Promise<DistributionHistoryItem[]> {
  const supabase = getSupabaseServer()
  if (!supabase) return []

  const { data: actionRows, error: actionsError } = await supabase
    .from('share_actions')
    .select(
      'id, created_at, url, canonical_url, hostname, pathname, page_type, page_locale, platform, share_mode, utm_source, utm_medium, utm_campaign, utm_content, share_text_variant'
    )
    .order('created_at', { ascending: false })
    .limit(limit)

  if (actionsError) {
    console.warn('[Distribution] recent history load failed', actionsError)
    return []
  }

  const actions = (actionRows || [])
    .map((row) => mapDistributionShareActionRecord((row || {}) as Record<string, unknown>))
    .filter((row): row is DistributionShareActionRecord => Boolean(row))

  if (!actions.length) return []

  const { data: resultRows, error: resultsError } = await supabase
    .from('share_action_results')
    .select('id, created_at, share_action_id, platform, status, external_post_url, external_post_notes, manual_metrics, last_checked_at')
    .in(
      'share_action_id',
      actions.map((item) => item.id)
    )

  if (resultsError) {
    console.warn('[Distribution] recent result load failed', resultsError)
  }

  const resultsByActionId = new Map<string, DistributionShareActionResultRecord>()
  for (const row of resultRows || []) {
    const mapped = mapDistributionShareActionResultRecord((row || {}) as Record<string, unknown>)
    if (mapped) resultsByActionId.set(mapped.shareActionId, mapped)
  }

  return actions.map((action) => ({
    action,
    result: resultsByActionId.get(action.id) || null,
  }))
}
