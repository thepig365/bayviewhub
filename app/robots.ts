import { MetadataRoute } from 'next'

/**
 * robots.txt
 *
 * Strategy:
 * - Public content is crawlable by default.
 * - Disallow anything auth-gated, admin, private, or an internal-only utility.
 * - Marketing subdomain aliases (secondhome.*, ssd.*, gardens.*, workshops.*, partners.*,
 *   invest.*, privatewall.*) are not addressed here: those hosts 308-redirect to the
 *   canonical path on www.bayviewhub.me, so crawlers that hit any alias URL end up on
 *   the canonical copy with the correct robots directives from this file.
 * - Major AI crawlers are explicitly allowed — Bayview Hub WANTS to be citable by LLMs.
 *   Adversarial / SEO-spam crawlers are not explicitly named; leave defaults alone rather
 *   than inventing a long list that can age badly.
 */

const DISALLOWED_PATHS = [
  '/api/',
  '/admin/',
  '/private/',
  '/__version',
  '/version',
  '/newsletter/unsubscribe',
  '/backyard-small-second-home/feasibility-check/thank-you',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },

      // Named AI / answer-engine crawlers — explicitly allowed so Bayview Hub,
      // Mendpress, and the SSD consultancy can be cited with correct attribution.
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'GPTBot', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'ClaudeBot', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'anthropic-ai', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'Google-Extended', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'PerplexityBot', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'Perplexity-User', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'CCBot', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'meta-externalagent', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'Applebot', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'Bytespider', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'Amazonbot', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'cohere-ai', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'DuckAssistBot', allow: '/', disallow: DISALLOWED_PATHS },
      { userAgent: 'YouBot', allow: '/', disallow: DISALLOWED_PATHS },
    ],
    sitemap: 'https://www.bayviewhub.me/sitemap.xml',
    host: 'https://www.bayviewhub.me',
  }
}
