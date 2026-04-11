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

type TrackProps = Record<string, string | number | boolean | undefined | null>

/** Flattens props for Plausible (strings only) and GA4. */
export function track(eventName: string, props?: TrackProps) {
  if (typeof window === 'undefined') return

  const flat: Record<string, string> = {}
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v === undefined || v === null) continue
      flat[k] = typeof v === 'boolean' ? (v ? 'true' : 'false') : String(v).slice(0, 200)
    }
  }

  if (typeof window.plausible === 'function') {
    window.plausible(eventName, Object.keys(flat).length ? { props: flat } : undefined)
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, flat)
  }
}


