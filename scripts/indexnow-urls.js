#!/usr/bin/env node
/**
 * Outputs URLs for IndexNow submission.
 * Usage: node scripts/indexnow-urls.js
 *
 * Run after build. Uses same route list as sitemap for consistency.
 */

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bayviewhub.me'

const routes = [
  '',
  '/backyard-small-second-home',
  '/backyard-small-second-home/victoria-rules',
  '/backyard-small-second-home/cost-rent-roi',
  '/backyard-small-second-home/feasibility-check',
  '/art-gallery',
  '/art-gallery/founding-partners',
  '/edible-gardens',
  '/edible-gardens/how-it-works',
  '/experiences',
  '/partners',
  '/partners/founding',
  '/partners/edible-gardens',
  '/partners/curator',
  '/partners/art-therapy',
  '/partners/garden-ops',
  '/cellar-door',
  '/events',
  '/tools/utm',
  '/invest',
  '/visit',
  '/workshops',
  '/privacy',
  '/terms',
  '/evidence/visitor-traffic',
]

const urls = routes.map((path) => `${baseUrl}${path}`)
urls.forEach((url) => console.log(url))
