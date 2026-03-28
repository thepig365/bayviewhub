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

export const metadata = genMeta({
  title: `Backyard Small Second Home | SSD Builder Victoria | 60 sqm. No Planning Permit. | ${SITE_CONFIG.name}`,
  description:
    'Victorian Small Second Dwelling (SSD) on your lot: up to 60 sqm, same title, all-electric. When you meet the rules you may skip a planning permit. Feasibility check and plain-English programme pages.',
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
    'Small Second Dwelling feasibility assessment and project management under Victorian Planning Provisions VC253/VC282. Clause 54.03 Deemed-to-Comply specialist. Green Lane, VicSmart, and standard pathway analysis.',
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
    description: '48-hour feasibility assessment with Path to Approval determination',
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
      name: 'What is the Victorian SSD framework (VC253/VC282)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Victorian SSD framework under VC253/VC282 allows Small Second Dwellings up to 60 sqm on existing residential lots. Hard constraints: maximum 60 sqm GFA, siting behind front wall, all-electric (no gas), no subdivision, main dwelling retains 25 sqm POS. Compliant projects may bypass planning permit via Deemed-to-Comply pathway.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Green Lane approval pathway?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Green Lane means your SSD meets all Deemed-to-Comply criteria under Clause 54.03. No planning permit required. Proceed directly to building permit with a registered building surveyor. This is the primary advantage of the SSD framework: constraints in exchange for certainty.',
      },
    },
    {
      '@type': 'Question',
      name: 'What triggers VicSmart instead of Green Lane?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VicSmart applies when your SSD is otherwise compliant but triggers minor overlays (Heritage, Flood, etc.) or requires minor setback variations. Under VC282, council must decide within 10 business days. No neighbor notification required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I subdivide an SSD from my main property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Under VC253/VC282, SSDs cannot be subdivided from the main lot. The dwelling must remain on the same title as the main dwelling. Subdivision intent disqualifies you from the SSD framework entirely.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I need more than 60 sqm?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The SSD pathway is not for you. Projects exceeding 60 sqm fall outside the framework and require standard planning permit process: expect 12-18 months, neighbor notification, potential objections, and VCAT risk. Consider engaging a traditional developer.',
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
      <div className="border-b border-border bg-natural-50 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold leading-tight text-fg dark:text-white sm:text-4xl md:text-[2.25rem]">
              Backyard Small Second Home
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted dark:text-white/75 sm:text-lg">
              A Victorian <strong className="text-fg dark:text-white">Small Second Dwelling (SSD)</strong> on your
              existing lot: up to 60 sqm, behind the front wall, all-electric, same title — no subdivision. When you
              meet the published tests, you may not need a planning permit; you still need a building permit.
            </p>
            <Suspense fallback={<div className="mt-6 h-12 animate-pulse rounded-lg bg-natural-200/80 dark:bg-white/10" />}>
              <SsdHubCtas />
            </Suspense>

            <div className="mt-10 border-t border-border pt-8 dark:border-neutral-700">
              <AnswerCapsule
                definition="Quick read: SSD is a State-planned route for a small second building on the same title. It only works when siting, size, services, and overlays line up — which is why we separate rules, cost, and fit onto their own pages."
                facts={[
                  'Hard limits: 60 sqm GFA, behind the front wall, all-electric, same title, no subdivision.',
                  'If you meet every Deemed-to-Comply test, you may skip a planning permit and go to a building permit.',
                  'Heritage, flood, bushfire, and other overlays can change the path — the feasibility check sorts that.',
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
