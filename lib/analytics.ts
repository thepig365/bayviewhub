export type Attribution = Record<string, string>

const ATTR_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'msclkid',
] as const

const STORAGE_KEY = 'bayviewhub_attribution_v1'

export function pickAttributionFromSearchParams(params: URLSearchParams): Attribution {
  const out: Attribution = {}
  for (const k of ATTR_KEYS) {
    const v = params.get(k)
    if (v) out[k] = v
  }
  return out
}

export function mergeAttribution(a: Attribution, b: Attribution): Attribution {
  return { ...a, ...b }
}

export function readStoredAttribution(): Attribution {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    return parsed as Attribution
  } catch {
    return {}
  }
}

export function storeAttribution(attribution: Attribution) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    // ignore
  }
}

export function getAttribution(params?: URLSearchParams): Attribution {
  const stored = readStoredAttribution()
  if (!params) return stored
  const fromParams = pickAttributionFromSearchParams(params)
  const merged = mergeAttribution(stored, fromParams)
  storeAttribution(merged)
  return merged
}

export function track(eventName: string, props?: Record<string, string>) {
  if (typeof window === 'undefined') return

  // Prefer Plausible if present
  if (typeof window.plausible === 'function') {
    window.plausible(eventName, props ? { props } : undefined)
    return
  }

  // Fallback to GA4 if installed
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, props || {})
  }
}


