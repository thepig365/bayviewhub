import React, { Suspense } from 'react'
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
import { SSD_HUB_FAQ } from '@/lib/ssd-hub-faq'

export const metadata = genMeta({
  title: `Backyard Small Second Home (Victorian SSD) | Rules, Feasibility & Next Steps | ${SITE_CONFIG.name}`,
  description:
    'Victorian SSD (Small Second Dwelling): up to 60 sqm GFA, same title, behind front wall, all-electric. Planning permit may be omitted only when fully Deemed-to-Comply; overlays often change that. Building permit still required. Rules, cost context, checklist.',
  path: '/backyard-small-second-home',
  image: `${SITE_CONFIG.url}/og-second-home.png`,
})

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
  mainEntity: SSD_HUB_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}

export default function BackyardSmallSecondHomePage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ssdExpertJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="border-b border-border bg-natural-50 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold leading-tight text-fg dark:text-white sm:text-4xl md:text-[2.25rem]">
              What is a Backyard Small Second Home in Victoria?
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted dark:text-white/75 sm:text-lg">
              It is the everyday name we use for a Victorian{' '}
              <strong className="text-fg dark:text-white">Small Second Dwelling (SSD)</strong>: a second small home on
              your existing title, capped at <strong className="text-fg dark:text-white">60 sqm gross floor area</strong>
              , usually behind the front wall, <strong className="text-fg dark:text-white">all-electric</strong>, not
              sold off on its own lot. This page summarises the pathway; your council scheme and overlays decide what
              applies to you.
            </p>
            <Suspense fallback={<div className="mt-6 h-12 animate-pulse rounded-lg bg-natural-200/80 dark:bg-white/10" />}>
              <SsdHubCtas />
            </Suspense>

            <div className="mt-10 border-t border-border pt-8 dark:border-neutral-700">
              <AnswerCapsule
                definition="A Backyard Small Second Home is a Victorian Small Second Dwelling (SSD): a second residence on the same title as your main house, up to 60 sqm gross floor area, generally behind the front wall, all-electric, with no subdivision of that dwelling onto a separate lot. You might avoid a planning permit only if your proposal meets every relevant Deemed-to-Comply test in the planning scheme for your land — overlays (heritage, flood, bushfire, and others), siting, services, and title details can all mean you still need planning approval, VicSmart, or a standard permit path instead. A building permit is still required for construction and compliance regardless. Always confirm against current scheme provisions and your title before acting."
                facts={[
                  'Non-negotiable SSD lines: 60 sqm GFA for the second dwelling, behind the front wall, all-electric, same title, no separate-title sale.',
                  'Planning permit: omitted only in full-compliance cases; if anything in the scheme is not met, assume council involvement until proven otherwise.',
                  'Still to verify: scheme maps, overlays, covenant, bushfire and drainage, and how your surveyor reads the Deemed-to-Comply tests.',
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
            </div>
          </div>
        </div>
      </div>
      <SsdHubFraming />
      <SsdHubHouseArchetypes />
      <SsdProgrammeMap />
      <SsdHubContent />
    </>
  )
}
