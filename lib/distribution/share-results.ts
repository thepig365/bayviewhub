import { mapDistributionShareActionResultRecord } from '@/lib/distribution/history'
import { isDistributionShareResultStatus } from '@/lib/distribution/result-status'
import type { DistributionManualMetrics, DistributionResultPayload } from '@/lib/distribution/types'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

function sanitizeText(value: unknown, max = 240): string | null {
  if (typeof value !== 'string') return null
  const clean = value.trim()
  if (!clean) return null
  return clean.slice(0, max)
}

export function sanitizeDistributionManualMetrics(value: unknown): DistributionManualMetrics {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const record = value as Record<string, unknown>
  const next: DistributionManualMetrics = {}

  for (const key of ['likes', 'comments', 'shares', 'opens', 'subscribers'] as const) {
    const raw = record[key]
    if (typeof raw !== 'number' || !Number.isFinite(raw) || raw < 0) continue
    next[key] = Math.round(raw)
  }

  return next
}

export async function upsertDistributionShareResult(
  payload: DistributionResultPayload
): Promise<{ ok: true; result: NonNullable<ReturnType<typeof mapDistributionShareActionResultRecord>> } | { ok: false; error: string }> {
  const supabase = getSupabaseServer()
  if (!supabase) {
    return { ok: false, error: 'Database not configured.' }
  }

  if (!payload.shareActionId || typeof payload.shareActionId !== 'string') {
    return { ok: false, error: 'shareActionId is required.' }
  }
  if (!isDistributionShareResultStatus(payload.status)) {
    return { ok: false, error: 'Invalid result status.' }
  }

  const row = {
    share_action_id: payload.shareActionId.trim(),
    platform: sanitizeText(payload.platform, 40),
    status: payload.status,
    external_post_url: sanitizeText(payload.externalPostUrl ?? null, 1000),
    external_post_notes: sanitizeText(payload.externalPostNotes ?? null, 2000),
    manual_metrics: sanitizeDistributionManualMetrics(payload.manualMetrics),
    last_checked_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('share_action_results')
    .upsert(row, { onConflict: 'share_action_id' })
    .select('id, created_at, share_action_id, platform, status, external_post_url, external_post_notes, manual_metrics, last_checked_at')
    .single()

  if (error) {
    console.warn('[Distribution] share result upsert failed', error)
    return { ok: false, error: error.message || 'Result save failed.' }
  }

  const result = mapDistributionShareActionResultRecord((data || {}) as Record<string, unknown>)
  if (!result) {
    return { ok: false, error: 'Result save returned an unexpected payload.' }
  }

  return { ok: true, result }
}
