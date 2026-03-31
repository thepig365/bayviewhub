import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/** Server-only: anonymous SSD funnel telemetry (no PII). */
export const SSD_CAMPAIGN_ALLOWED_EVENTS = new Set([
  'ssd_hub_page_view',
  'ssd_hub_scroll',
  'ssd_hub_link_click',
  'ssd_hub_share_click',
  'ssd_hub_engagement',
  'ssd_feasibility_page_view',
  'ssd_feasibility_form_start',
  'ssd_feasibility_form_submit',
])

export type SsdCampaignEventRow = {
  event_name: string
  path: string
  referrer_host: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  link_target: string | null
  link_category: string | null
  zone: string | null
  scroll_depth: string | null
  share_channel: string | null
  visible_seconds: number | null
  session_id: string | null
}

const MAX_LEN = 240

export function sanitizeCampaignString(value: unknown, max = MAX_LEN): string | null {
  if (typeof value !== 'string') return null
  const t = value.trim()
  if (!t) return null
  return t.slice(0, max)
}

export function sanitizeSessionId(value: unknown): string | null {
  const s = sanitizeCampaignString(value, 80)
  if (!s || !/^[\w-]{8,80}$/.test(s)) return null
  return s
}

export function getSupabaseServer(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

/** Safe diagnostics only — never includes the raw key. For SSD_INSERT_DEBUG=1. */
export type SsdSupabaseRuntimeDiagnostics = {
  supabase_host: string | null
  url_env_source: 'SUPABASE_URL' | 'NEXT_PUBLIC_SUPABASE_URL' | 'none'
  key_env_source: 'SUPABASE_SECRET_KEY' | 'SUPABASE_SERVICE_ROLE_KEY' | 'none'
  key_kind_guess: string
  both_key_envs_non_empty: boolean
  env_precedence_note: string
}

function inferSupabaseKeyKind(key: string): string {
  const t = key.trim()
  if (!t) return 'empty'
  if (t.startsWith('sb_secret_')) {
    return 'format: sb_secret_* (Supabase newer secret key shape; must match project that owns URL)'
  }
  if (t.startsWith('eyJ')) {
    const parts = t.split('.')
    if (parts.length < 2) return 'JWT-shaped prefix (eyJ) but invalid segment count'
    try {
      let b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
      while (b64.length % 4) b64 += '='
      const payload = JSON.parse(Buffer.from(b64, 'base64').toString('utf8')) as { role?: string }
      const role = payload.role
      if (role === 'service_role') return 'JWT role claim: service_role (expected for server inserts)'
      if (role === 'anon') return 'JWT role claim: anon — PostgREST acts as anon; often causes permission denied on public'
      if (role === 'authenticated')
        return 'JWT role claim: authenticated — not service_role; may lack table/schema privileges'
      return `JWT role claim: ${String(role ?? 'missing')}`
    } catch {
      return 'JWT-shaped (eyJ); payload decode failed'
    }
  }
  return 'unknown format (not eyJ… JWT, not sb_secret_…)'
}

/**
 * Which env vars won at runtime (same precedence as getSupabaseServer).
 * Does not expose key material.
 */
export function getSsdSupabaseRuntimeDiagnostics(): SsdSupabaseRuntimeDiagnostics {
  const hasUrlPrimary = Boolean(process.env.SUPABASE_URL?.trim())
  const hasUrlFallback = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim())
  const hasKeyPrimary = Boolean(process.env.SUPABASE_SECRET_KEY?.trim())
  const hasKeyFallback = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim())

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

  let host: string | null = null
  if (url?.trim()) {
    try {
      host = new URL(url.trim()).host
    } catch {
      host = 'invalid_url'
    }
  }

  return {
    supabase_host: host,
    url_env_source: hasUrlPrimary
      ? 'SUPABASE_URL'
      : hasUrlFallback
        ? 'NEXT_PUBLIC_SUPABASE_URL'
        : 'none',
    key_env_source: hasKeyPrimary
      ? 'SUPABASE_SECRET_KEY'
      : hasKeyFallback
        ? 'SUPABASE_SERVICE_ROLE_KEY'
        : 'none',
    key_kind_guess: inferSupabaseKeyKind(key?.trim() ?? ''),
    both_key_envs_non_empty: hasKeyPrimary && hasKeyFallback,
    env_precedence_note:
      'URL uses SUPABASE_URL first else NEXT_PUBLIC_SUPABASE_URL; key uses SUPABASE_SECRET_KEY first else SUPABASE_SERVICE_ROLE_KEY. Vercel: Project env overrides Team Shared for the same variable name.',
  }
}

export function campaignOwnerEmail(): string {
  return process.env.SSD_CAMPAIGN_OWNER_EMAIL?.trim() || 'ileonzh@gmail.com'
}

export function parseFeasibilityNotifyEmails(): string[] {
  const raw =
    process.env.FEASIBILITY_NOTIFY_TO ||
    'info@bayviewestate.com.au,leonzh@bayviewestate.com.au,ileonzh@gmail.com'
  return raw
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean)
}
