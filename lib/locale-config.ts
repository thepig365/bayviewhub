/**
 * Public Chinese locale (/zh/*) gate.
 *
 * Disabled by default until all Chinese pages are reviewed and approved.
 * Re-enable without a deploy-time code change:
 *   NEXT_PUBLIC_CHINESE_LOCALE_ENABLED=true
 *
 * Source files under app/zh/ are intentionally kept — only public access is gated.
 */
export function isChineseLocalePublicEnabled(): boolean {
  const env = process.env.NEXT_PUBLIC_CHINESE_LOCALE_ENABLED
  if (env === 'true') return true
  if (env === 'false') return false
  return false
}
