/** Direct share targets for a canonical page URL (no client required). */

export function facebookShareUrl(pageUrl: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
}

export function linkedInShareUrl(pageUrl: string) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`
}

/** X (Twitter) intent — url + optional short line (keep under ~200 chars for UX) */
export function twitterIntentShareUrl(pageUrl: string, text?: string) {
  const params = new URLSearchParams()
  params.set('url', pageUrl)
  if (text?.trim()) {
    params.set('text', text.trim().slice(0, 220))
  }
  return `https://twitter.com/intent/tweet?${params.toString()}`
}

/** WhatsApp web / app handoff */
export function whatsappShareUrl(pageUrl: string, text?: string) {
  const line = [text?.trim(), pageUrl].filter(Boolean).join('\n\n')
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(line)}`
}

export function buildShareMailto(opts: { subject: string; intro: string; url: string }) {
  const body = `${opts.intro.trim()}\n\n${opts.url}`
  return `mailto:?subject=${encodeURIComponent(opts.subject)}&body=${encodeURIComponent(body)}`
}

/**
 * QR image URL for “scan to open this page” helpers (WeChat / phone handoff).
 * Uses a public QR API so we avoid extra npm weight; data is only the page URL.
 */
export function sharePageQrImageUrl(pageUrl: string, size = 200) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(pageUrl)}`
}
