import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { ArtGalleryClient } from '../ArtGalleryClient'

const FP_DESCRIPTION =
  'Founding curator partnership for Bayview Arts Gallery: integrated into a 30-acre Mornington Peninsula estate with hospitality, wine, music, and gardens. No commercial rent; revenue-share or equity-style terms. Visitor traffic evidence on-site. EOI for serious curator/gallery operators only.'

export const metadata: Metadata = {
  ...genMeta({
    title: `Gallery founding curator partnership | ${SITE_CONFIG.name}`,
    description: FP_DESCRIPTION,
    path: '/art-gallery/founding-partners',
  }),
  title: {
    absolute: 'Gallery founding curator partnership | Bayview Hub',
  },
  description: FP_DESCRIPTION,
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bayview Arts Gallery — founding curator partnership',
  description:
    'Curatorial and gallery operations partnership embedded in Bayview Hub estate context; revenue-oriented terms without commercial rent.',
  provider: {
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  areaServed: { '@type': 'State', name: 'Victoria', containedInPlace: { '@type': 'Country', name: 'Australia' } },
  offers: {
    '@type': 'Offer',
    description: 'Founding curator partnership — revenue share or equity-style hybrid; no commercial rent',
  },
}

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Gallery founding curator partnership',
  description: FP_DESCRIPTION,
  url: `${SITE_CONFIG.url}/art-gallery/founding-partners`,
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_CONFIG.url,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Gallery founding partnership',
      item: `${SITE_CONFIG.url}/art-gallery/founding-partners`,
    },
  ],
}

export default function ArtGalleryFoundingPartnersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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

        <section className="border-b border-border bg-bg py-12 md:py-14">
          <div className="container mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl font-semibold text-fg md:text-3xl">Partner fit — three lines</h2>
            <ul className="mt-6 space-y-4 text-[1.05rem] leading-8 text-fg/90 dark:text-white/88">
              <li>
                <strong className="text-fg dark:text-white">Founding curator / operator</strong> — exhibitions, artist
                relationships, and sales aligned with a destination audience (not a remote leaseholder).
              </li>
              <li>
                <strong className="text-fg dark:text-white">Economics</strong> — revenue share or equity-style hybrid;
                no commercial rent. Terms are negotiated against visitor context and programme load.
              </li>
              <li>
                <strong className="text-fg dark:text-white">Artists</strong> — public collection and submission live on{' '}
                <a href="https://gallery.bayviewhub.me" className="text-accent underline underline-offset-4">
                  gallery.bayviewhub.me
                </a>
                ; this page is for the <em>founding gallery partnership</em> role, not per-artwork submissions.
              </li>
            </ul>
            <p className="mt-8 text-base leading-7 text-muted">
              Evidence-led visitor context:{' '}
              <Link href="/evidence/visitor-traffic" className="text-accent underline underline-offset-4">
                visitor traffic
              </Link>
              . EOI below is for partnership inquiries only.
            </p>
          </div>
        </section>

        <Suspense fallback={<div className="min-h-[80vh]" />}>
          <ArtGalleryClient />
        </Suspense>
      </div>
    </>
  )
}
