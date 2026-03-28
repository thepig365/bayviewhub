import React, { Suspense } from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { ShareStrip } from '@/components/ui/ShareStrip'
import { SecondHomeClient } from './SecondHomeClient'

export const metadata = genMeta({
  title: `Backyard Small Second Home | SSD Builder Victoria | 60 sqm. No Planning Permit. | ${SITE_CONFIG.name}`,
  description:
    'Victorian Small Second Dwelling (SSD) feasibility and build. Backyard Small Second Home — 60 sqm max under VC253/VC282. Deemed-to-Comply pathway under Clause 54.03 bypasses planning permit. We navigate the constraints.',
  path: '/backyard-small-second-home',
  image: `${SITE_CONFIG.url}/og-second-home.png`,
})

// Victorian SSD Regulatory Expert Schema
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
        text: 'The Victorian SSD framework under VC253/VC282 allows Small Second Dwellings up to 60 sqm on existing residential lots. Hard constraints: maximum 60 sqm GFA, siting behind front wall, all-electric (no gas), no subdivision, main dwelling retains 25 sqm POS. Compliant projects bypass planning permit via Deemed-to-Comply pathway.',
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
      <div className="bg-natural-50 dark:bg-neutral-900 border-b border-border dark:border-neutral-800">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-fg dark:text-white mb-6">
              Backyard Small Second Home
            </h1>
            <AnswerCapsule
              definition="Backyard Small Second Home: Victorian Small Second Dwelling (SSD) feasibility and Path to Approval. Overview of deemed-to-comply pathway and key constraints. See Evidence on the rules page."
              facts={[
                'Max 60 sqm GFA. Siting behind front wall. All-electric. No subdivision.',
                'Green Lane: full compliance → no planning permit. Building permit required.',
                'VicSmart: minor overlays → 10-day council decision.',
                'Multi-generational housing or rental yield. Same title.',
              ]}
              sources={[
                { label: 'DTP Planning Portal', href: 'https://www.planning.vic.gov.au/' },
                { label: 'Victoria Rules', href: `${baseUrl}/backyard-small-second-home/victoria-rules` },
                { label: 'Cost & ROI', href: `${baseUrl}/backyard-small-second-home/cost-rent-roi` },
                { label: 'Feasibility Check', href: `${baseUrl}/backyard-small-second-home/feasibility-check` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <ShareStrip
              className="mt-8"
              url={`${baseUrl}/backyard-small-second-home`}
              mailtoSubject="Backyard Small Second Home — Bayview Hub"
              mailtoIntro="Sharing Bayview Hub’s Victorian Backyard Small Second Home (SSD) overview — feasibility, rules, and cost tools."
            />
          </div>
        </div>
      </div>
      <Suspense fallback={<div className="min-h-screen bg-bg" />}>
        <SecondHomeClient />
      </Suspense>
    </>
  )
}
