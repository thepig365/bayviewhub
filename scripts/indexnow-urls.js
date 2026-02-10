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
  '/second-home',
  '/second-home/victoria-rules',
  '/second-home/cost-rent-roi',
  '/second-home/feasibility-check',
  '/backyard-second-home/feasibility-checklist',
  '/art-gallery',
  '/art-gallery/founding-partners',
  '/edible-gardens',
  '/edible-gardens/how-it-works',
  '/experiences',
  '/partners',
  '/partners/founding',
  '/partners/edible-gardens',
  '/cellar-door',
  '/events',
  '/tools/utm',
  '/invest',
  '/visit',
  '/workshops',
  '/privacy',
  '/terms',
]

const urls = routes.map((path) => `${baseUrl}${path}`)
urls.forEach((url) => console.log(url))
