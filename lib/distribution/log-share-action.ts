import { getSupabaseServer } from '@/lib/ssd-campaign-server'
import { mapDistributionShareActionRecord } from '@/lib/distribution/history'
import type { DistributionLogPayload } from '@/lib/distribution/types'

function sanitize(value: unknown, max = 240): string | null {
  if (typeof value !== 'string') return null
  const clean = value.trim()
  if (!clean) return null
  return clean.slice(0, max)
}

export async function logDistributionShareAction(
  payload: DistributionLogPayload
): Promise<
  | {
      ok: true
      action: NonNullable<ReturnType<typeof mapDistributionShareActionRecord>>
    }
  | {
      ok: false
      error: string
    }
> {
  const supabase = getSupabaseServer()
  if (!supabase) {
    return { ok: false, error: 'Database not configured.' }
  }

  const row = {
    url: sanitize(payload.url, 500),
    canonical_url: sanitize(payload.canonicalUrl, 500),
    hostname: sanitize(payload.hostname, 160),
    pathname: sanitize(payload.pathname, 240),
    page_type: sanitize(payload.pageType, 80),
    page_locale: sanitize(payload.pageLocale, 16),
    platform: sanitize(payload.platform, 40),
    share_mode: sanitize(payload.shareMode, 80),
    utm_source: sanitize(payload.utmSource, 120),
    utm_medium: sanitize(payload.utmMedium, 120),
    utm_campaign: sanitize(payload.utmCampaign, 120),
    utm_content: sanitize(payload.utmContent, 120),
    share_text_variant: sanitize(payload.shareTextVariant ?? null, 2000),
    metadata_snapshot: payload.metadataSnapshot,
  }

  const { data, error } = await supabase
    .from('share_actions')
    .insert(row)
    .select(
      'id, created_at, url, canonical_url, hostname, pathname, page_type, page_locale, platform, share_mode, utm_source, utm_medium, utm_campaign, utm_content, share_text_variant'
    )
    .single()
  if (error) {
    console.warn('[Distribution] share action log failed', error)
    return {
      ok: false,
      error: error.message || 'Insert failed.',
    }
  }

  const action = mapDistributionShareActionRecord((data || {}) as Record<string, unknown>)
  if (!action) {
    return {
      ok: false,
      error: 'Insert succeeded but returned an unexpected action payload.',
    }
  }

  return { ok: true, action }
}
