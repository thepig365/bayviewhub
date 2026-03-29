import { getAttribution } from '@/lib/analytics'

const STORAGE_SESSION = 'ssd_campaign_session_v1'

export function getOrCreateSsdSessionId(): string {
  if (typeof window === 'undefined') return ''
  try {
    let s = sessionStorage.getItem(STORAGE_SESSION)
    if (!s) {
      s = `ssd_${crypto.randomUUID().replace(/-/g, '').slice(0, 20)}`
      sessionStorage.setItem(STORAGE_SESSION, s)
    }
    return s
  } catch {
    return `ssd_t_${Date.now()}`
  }
}

export function referrerHost(): string {
  if (typeof document === 'undefined') return ''
  try {
    if (!document.referrer) return ''
    return new URL(document.referrer).hostname.slice(0, 120)
  } catch {
    return ''
  }
}

export function postSsdCampaignEvent(payload: Record<string, unknown>) {
  const json = JSON.stringify(payload)
  try {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([json], { type: 'application/json' })
      if (navigator.sendBeacon('/api/ssd-campaign/event', blob)) return
    }
  } catch {
    /* fall through */
  }
  void fetch('/api/ssd-campaign/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: json,
    keepalive: true,
  })
}

export function buildSsdPayload(
  event: string,
  path: string,
  extra: Record<string, unknown> = {}
) {
  const params =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : undefined
  const attr = params ? getAttribution(params) : getAttribution(undefined)
  return {
    event,
    path,
    session_id: getOrCreateSsdSessionId(),
    referrer_host: referrerHost(),
    utm_source: attr.utm_source ?? '',
    utm_medium: attr.utm_medium ?? '',
    utm_campaign: attr.utm_campaign ?? '',
    ...extra,
  }
}
