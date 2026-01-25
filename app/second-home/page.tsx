import React, { Suspense } from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'
import { SecondHomeClient } from './SecondHomeClient'

export const metadata = genMeta({
  title: `SSD Builder Victoria | 60 sqm. No Planning Permit. | ${SITE_CONFIG.name}`,
  description:
    'Victorian Small Second Dwelling (SSD) feasibility and build. 60 sqm max under VC253/VC282. Deemed-to-Comply pathway under Clause 54.03 bypasses planning permit. We navigate the constraints.',
  path: '/second-home',
  image: `${SITE_CONFIG.url}/og-second-home.png`,
})

// Victorian SSD Regulatory Expert Schema
const ssdExpertJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Victorian SSD Regulatory Compliance Service',
  alternateName: 'Bayview Hub SSD',
  description:
    'Small Second Dwelling feasibility assessment and project management under Victorian Planning Provisions VC253/VC282. Clause 54.03 Deemed-to-Comply specialist. Green Lane, VicSmart, and standard pathway analysis.',
  provider: {
    '@type': 'Organization',
    name: 'Bayview Hub',
    url: SITE_CONFIG.url,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Victoria',
      addressCountry: 'AU',
    },
  },
  areaServed: {
    '@type': 'State',
    name: 'Victoria',
    containedInPlace: {
      '@type': 'Country',
      name: 'Australia',
    },
  },
  serviceType: [
    'SSD Feasibility Assessment',
    'Path to Approval Analysis',
    'Clause 54.03 Compliance',
    'VicSmart Pathway Provider',
    'Small Second Dwelling Project Management',
  ],
  offers: {
    '@type': 'Offer',
    description: '48-hour feasibility assessment with Path to Approval determination',
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

// FAQ Schema with regulatory focus
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

export default function SecondHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ssdExpertJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-neutral-900" />}>
        <SecondHomeClient />
      </Suspense>
    </>
  )
}
