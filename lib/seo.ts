/**
 * SEO / LLM discoverability constants.
 * Single source of truth for "Last updated" dates.
 * Format: YYYY-MM-DD
 */
export const LAST_UPDATED = '2026-02-10'

export function robotsByEnv() {
  const isProd = process.env.NODE_ENV === 'production'
  return {
    index: isProd,
    follow: isProd,
  }
}
