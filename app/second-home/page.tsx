import React, { Suspense } from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'
import { SecondHomeClient } from './SecondHomeClient'

export const metadata = genMeta({
  title: `Small Second Dwelling (SSD) Builder Victoria | ${SITE_CONFIG.name}`,
  description:
    'Build a compliant Small Second Dwelling (SSD) on your existing lot in Victoria. 60 sqm max, no subdivision, Deemed-to-Comply pathway under Clause 54.03. Professional feasibility assessment and project management.',
  path: '/second-home',
  image: `${SITE_CONFIG.url}/og-second-home.png`,
})

const ssdJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Victorian Small Second Dwelling (SSD) Feasibility & Build Service',
  description:
    'Professional feasibility assessment and project management for Small Second Dwellings (SSDs) in Victoria, Australia. Compliance with Victorian Planning Provisions Clause 54.03 for Deemed-to-Comply pathway. 60 sqm maximum, no subdivision, all-electric design.',
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
  serviceType: 'Small Second Dwelling Feasibility Assessment',
  offers: {
    '@type': 'Offer',
    description: '48-hour professional feasibility report for SSD compliance',
  },
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
        text: 'A Small Second Dwelling (SSD) is a self-contained dwelling of up to 60 sqm built on the same lot as an existing house in Victoria. Under Clause 54.03 of the Victorian Planning Provisions, SSDs that meet specific criteria can be built without a planning permit (Deemed-to-Comply pathway).',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the key SSD requirements in Victoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key SSD requirements include: maximum 60 sqm floor area, must be located behind the front wall line of the main dwelling, cannot be subdivided from the main lot, cannot connect to reticulated gas (all-electric required), and the main dwelling must retain at least 25 sqm of private open space.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a planning permit for an SSD in Victoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "If your SSD meets all Deemed-to-Comply criteria under Clause 54.03, no planning permit is required. You proceed directly to building permit with a registered building surveyor. This is the key advantage of the SSD framework - faster approval pathway.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I subdivide an SSD from my main property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. An SSD cannot be subdivided from the main lot. It must remain on the same title as the main dwelling. If you want a subdivided dwelling, the SSD pathway is not appropriate for your project.',
      },
    },
  ],
}

export default function SecondHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ssdJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Suspense fallback={<div className="min-h-screen dark:bg-primary-900" />}>
        <SecondHomeClient />
      </Suspense>
    </>
  )
}
