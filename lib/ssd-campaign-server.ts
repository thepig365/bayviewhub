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

export function campaignOwnerEmail(): string {
  return process.env.SSD_CAMPAIGN_OWNER_EMAIL?.trim() || 'ileonzh@gmail.com'
}

export function parseFeasibilityNotifyEmails(): string[] {
  const raw =
    process.env.FEASIBILITY_NOTIFY_TO ||
    'leonzh@bayviewestate.com.au,ileonzh@gmail.com'
  return raw
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean)
}
