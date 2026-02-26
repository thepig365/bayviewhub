import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { ArtGalleryClient } from '../ArtGalleryClient'

export const metadata = genMeta({
  title: `Art Gallery Founding Partnership | ${SITE_CONFIG.name}`,
  description:
    'Contemporary gallery within Bayview Hub\'s 30-acre estate. Estimated 50k+ annual visitors annually. Evidence available on-site. Founding partnership opportunity for curator — no commercial rent, revenue share.',
  path: '/art-gallery/founding-partners',
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

export default function ArtGalleryFoundingPartnersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <div className="min-h-screen bg-bg dark">
        {/* Top bar: Logo + Back to home */}
        <section className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <Image
                  src="/images/bayview-estate-logo.jpg"
                  alt="Bayview Estate"
                  width={120}
                  height={36}
                  className="h-10 w-auto md:h-12"
                />
                <span className="text-fg font-serif font-bold text-lg md:text-xl group-hover:text-accent transition-colors">
                  Bayview Hub
                </span>
              </Link>
              <Link
                href="/"
                className="text-sm text-muted hover:text-accent transition-colors uppercase tracking-wider"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </section>

        {/* Answer Capsule - above the fold */}
        <section className="border-b border-border bg-surface/50">
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
                  { label: 'Gallery', href: 'https://gallery.bayviewhub.me' },
                  { label: 'Visitor Traffic Evidence', href: `${SITE_CONFIG.url}/evidence/visitor-traffic` },
                ]}
                lastUpdated={LAST_UPDATED}
                className="border-border bg-surface/50"
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
