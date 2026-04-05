import React, { Suspense } from 'react'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { SsdHubContent } from '@/components/ssd/SsdHubContent'
import { SsdHubCtas } from '@/components/ssd/SsdHubCtas'
import { SsdHubFraming } from '@/components/ssd/SsdHubFraming'
import { SsdHubHouseArchetypes } from '@/components/ssd/SsdHubHouseArchetypes'
import { SsdProgrammeMap } from '@/components/ssd/SsdProgrammeMap'
import { SsdPageShare } from '@/components/ssd/SsdPageShare'
import { SsdHubCampaignAnalytics } from '@/components/ssd/SsdHubCampaignAnalytics'

export const metadata = {
  ...genMeta({
    title: `Backyard Small Second Home (Victorian SSD) | Rules, Feasibility & Next Steps | ${SITE_CONFIG.name}`,
    description:
      'Victorian SSD (Small Second Dwelling): up to 60 sqm GFA, same title, behind front wall, all-electric. Planning permit may be omitted only when fully Deemed-to-Comply; overlays often change that. Building permit still required. Rules, cost context, checklist.',
    path: '/backyard-small-second-home',
    image: `${SITE_CONFIG.url}/og-second-home.png`,
  }),
  title: {
    absolute: 'Backyard Small Second Home | Bayview Hub',
  },
}

const ssdExpertJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'LocalBusiness'],
  name: 'Victorian SSD Regulatory Compliance Service',
  alternateName: 'Bayview Hub Backyard Small Second Home',
  url: `${SITE_CONFIG.url}/backyard-small-second-home`,
  description:
    'Public information on Victorian Small Second Dwellings (SSD) under VC253/VC282: Deemed-to-Comply, VicSmart, and standard planning contexts. Main Ridge, Mornington Peninsula; content relevant statewide — confirm on your title and council scheme.',
  image: `${SITE_CONFIG.url}/og-second-home.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '365 Purves Road',
    addressLocality: 'Main Ridge',
    addressRegion: 'VIC',
    postalCode: '3928',
    addressCountry: 'AU',
  },
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  priceRange: '$$',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Victoria, Australia',
  },
  makesOffer: {
    '@type': 'Offer',
    description: 'Public SSD pathway information and on-site interactive checklist; optional contact via published channels',
    priceCurrency: 'AUD',
    price: '0',
  },
  knowsAbout: [
    'Victorian Planning Provisions',
    'Clause 54.03 Deemed-to-Comply',
    'VC253 Small Second Dwelling regulations',
    'VC282 VicSmart expedited pathway',
    'Residential development Victoria',
    '60 sqm dwelling compliance',
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a Small Second Dwelling (SSD) in Victoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Small Second Dwelling (SSD) is a second home built on an existing residential title in Victoria under the State SSD planning framework. It has a capped footprint of 60sqm GFA, must be all-electric, sit behind the front wall of the primary dwelling, and cannot be sold as a separate title.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a planning permit to build an SSD in Victoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A planning permit may be omitted only if every relevant Deemed-to-Comply requirement is met for your specific land. Overlays, bushfire zones, and other site-specific conditions often require a planning permit regardless. A building permit is always required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What planning rules apply to SSDs in Victoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The key instruments are VC253 and VC282, which introduced and refined the Small Second Dwelling Deemed-to-Comply pathway under the Victorian Planning Provisions. These set the 60sqm cap, siting rules, energy requirements, and the Green Lane fast-track process for compliant applications.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I build an SSD on the Mornington Peninsula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, subject to your specific land conditions, overlays, and council requirements. The Mornington Peninsula Shire applies the State SSD framework, but Heritage overlays, Vegetation Protection overlays, and Bushfire Management overlays may affect eligibility. A feasibility check is the correct first step.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to build an SSD in Victoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical SSD build costs in Victoria range from approximately $180,000 (Tier 1 compact/compliant) to $350,000+ (Tier 3 architectural). Rental yields on a 60sqm SSD typically range from $350–$550 per week depending on location and specification.',
      },
    },
  ],
}

export default function BackyardSmallSecondHomePage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ssdExpertJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SsdHubCampaignAnalytics>
      <div className="border-b border-border bg-natural-50 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold leading-tight text-fg dark:text-white sm:text-4xl md:text-[2.25rem]">
              What is a Backyard Small Second Home in Victoria?
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted dark:text-white/75 sm:text-lg">
              It is the everyday name we use for a Victorian{' '}
              <strong className="text-fg dark:text-white">Small Second Dwelling (SSD)</strong>: a second small home on
              your existing title, within the State SSD framework (capped footprint, siting and energy rules, same title,
              not a separate lot). The <strong className="text-fg dark:text-white">Quick Answer</strong> below states the
              permit split and non‑negotiables; this hub tracks published instruments — your council maps and overlays
              still decide what applies to you.
            </p>
            <Suspense fallback={<div className="mt-6 h-12 animate-pulse rounded-lg bg-natural-200/80 dark:bg-white/10" />}>
              <SsdHubCtas />
            </Suspense>

            <div className="mt-10 border-t border-border pt-8 dark:border-neutral-700">
              <AnswerCapsule
                id="quick-answer"
                definition="It is a second dwelling on the same residential title, assessed under the planning scheme’s Small Second Dwelling tests. A planning permit may be omitted only if every relevant Deemed-to-Comply requirement is met for your land; overlays and site facts often mean planning, VicSmart, or a standard permit path instead. A building permit and National Construction Code compliance are still required for construction. Confirm current instruments and survey on your title before acting."
                facts={[
                  'Non-negotiable SSD lines: 60 sqm GFA for the second dwelling, behind the front wall, all-electric, same title, no separate-title sale.',
                  'Planning: omitted only when fully Deemed-to-Comply; otherwise assume council involvement until proven on title.',
                  'Verify: scheme maps, overlays, covenants, bushfire and drainage, and how your surveyor reads GFA and siting tests.',
                ]}
                sources={[
                  { label: 'DTP Planning Portal', href: 'https://www.planning.vic.gov.au/' },
                  { label: 'Understand Victoria rules', href: `${baseUrl}/backyard-small-second-home/victoria-rules` },
                  { label: 'Explore likely costs', href: `${baseUrl}/backyard-small-second-home/cost-rent-roi` },
                  { label: 'Run feasibility check', href: `${baseUrl}/backyard-small-second-home/feasibility-check` },
                ]}
                lastUpdated={LAST_UPDATED}
              />
              <SsdPageShare path="/backyard-small-second-home" className="mt-8" />
              <p className="mt-5 text-sm leading-relaxed text-muted">
                <Link href="/backyard-small-second-home/feasibility-check" className="font-medium text-accent underline-offset-4 hover:underline">
                  Run the feasibility check
                </Link>
                <span className="mx-2 text-border" aria-hidden>
                  ·
                </span>
                <Link href="/backyard-small-second-home" className="underline-offset-4 hover:underline">
                  See the full SSD overview
                </Link>
                <span className="mx-2 text-border" aria-hidden>
                  ·
                </span>
                <Link href="/visit" className="underline-offset-4 hover:underline">
                  Visit the estate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <SsdHubFraming />
      <SsdHubHouseArchetypes />
      <SsdProgrammeMap />
      <SsdHubContent />
      </SsdHubCampaignAnalytics>
    </>
  )
}
