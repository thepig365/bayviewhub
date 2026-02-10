import React, { Suspense } from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { ArtGalleryClient } from './ArtGalleryClient'

export const metadata = genMeta({
  title: `Art Gallery | Founding Partnership | ${SITE_CONFIG.name}`,
  description:
    'Contemporary gallery within Bayview Hub\'s 30-acre estate. Estimated 50k+ annual visitors annually. Evidence available on-site. Founding partnership opportunity for curator — no commercial rent, revenue share.',
  path: '/art-gallery',
})

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bayview Arts Gallery',
  description: 'Contemporary gallery within a living destination. Founding partnership opportunity.',
  provider: {
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  areaServed: { '@type': 'State', name: 'Victoria', containedInPlace: { '@type': 'Country', name: 'Australia' } },
  offers: {
    '@type': 'Offer',
    description: 'Founding curator partnership — revenue share, no commercial rent',
  },
}

export default function ArtGalleryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <div className="min-h-screen bg-[#121212]">
        {/* Answer Capsule - above the fold */}
        <section className="border-b border-neutral-800 bg-neutral-900/50">
          <div className="container mx-auto px-6 py-6">
            <div className="max-w-4xl mx-auto">
              <AnswerCapsule
                definition="A contemporary gallery within Bayview Hub's 30-acre estate on Mornington Peninsula. Founding partnership opportunity for curator/gallery director."
                facts={[
                  'Integrated into living destination (restaurant, cellar door, music, gardens).',
                  'Estimated 50k+ annual visitors (see Evidence).',
                  'Revenue share or equity hybrid. No commercial rent.',
                  'Founding curator role: exhibitions, artist relationships, sales.',
                ]}
                sources={[
                  { label: 'Founding Partners', href: `${SITE_CONFIG.url}/art-gallery/founding-partners` },
                  { label: 'Visitor Traffic Evidence', href: `${SITE_CONFIG.url}/evidence/visitor-traffic` },
                ]}
                lastUpdated={LAST_UPDATED}
                className="border-neutral-700 bg-neutral-800/50"
              />
            </div>
          </div>
        </section>
        <Suspense fallback={<div className="min-h-[80vh]" />}>
          <ArtGalleryClient />
        </Suspense>
      </div>
    </>
  )
}
