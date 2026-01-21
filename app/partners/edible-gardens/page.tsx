import React, { Suspense } from 'react'
import { generateMetadata as genMeta } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'
import { EdibleGardensEOIForm } from './EdibleGardensEOIForm'
import { EdibleGardensHeroCtas } from './EdibleGardensHeroCtas'

export const metadata = genMeta({
  title: `Founding Partner Opportunity — Edible Gardens | ${SITE_CONFIG.name}`,
  description:
    'Build a subscription-based edible gardens program within an established destination with hospitality, wine, and events. Expressions of interest now open for a founding partner.',
  path: '/partners/edible-gardens',
})

export default function EdibleGardensFoundingPartnerPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SITE_CONFIG.url

  const pageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Founding Partner Opportunity — Edible Gardens | ${SITE_CONFIG.name}`,
    url: `${baseUrl}/partners/edible-gardens`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: baseUrl,
    },
    about: [
      { '@type': 'Thing', name: 'Edible gardens' },
      { '@type': 'Thing', name: 'Subscription program' },
      { '@type': 'Thing', name: 'Founding partner opportunity' },
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: baseUrl,
    },
    potentialAction: {
      '@type': 'ApplyAction',
      name: 'Submit Expression of Interest',
      target: `${baseUrl}/partners/edible-gardens#apply`,
    },
  }

  return (
    <div className="min-h-screen dark:bg-primary-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-100 to-neutral-50 py-20 dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-xs font-bold tracking-wide uppercase text-neutral-800 dark:text-neutral-200">
                Founding Partner Opportunity
              </p>
              <h1 className="mt-4 text-5xl md:text-6xl font-serif font-bold text-natural-900 dark:text-natural-50">
                Edible Gardens at Bayview Hub
              </h1>
              <p className="mt-6 text-xl text-natural-700 leading-relaxed dark:text-natural-200">
                Build a subscription-based edible gardens program — with land, audience, and real-world infrastructure
                behind you.
              </p>
              <Suspense fallback={<div className="mt-8 h-12" />}>
                <EdibleGardensHeroCtas
                  email={SITE_CONFIG.email}
                  subject="Edible Gardens Founding Partner — 10-min Call"
                />
              </Suspense>
            </div>

            <div className="mt-10 rounded-2xl p-8 bg-white shadow-lg border border-natural-200 dark:bg-primary-900/60 dark:border-primary-700">
              <p className="text-natural-700 leading-relaxed dark:text-natural-200">
                Bayview Hub is inviting expressions of interest from one founding partner to establish and operate a
                subscription-based Edible Gardens program within our estate.
              </p>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                This is an opportunity for an entrepreneurial, self-directed operator to build a real, independent
                business — supported by land, space, and an existing destination audience.
              </p>

              <div className="mt-6 rounded-xl p-4 bg-natural-50 text-center dark:bg-primary-800/30 dark:border dark:border-primary-700">
                <p className="font-semibold text-natural-900 dark:text-natural-50">
                  Not employment. Not a franchise. Not pay-to-rent.
                </p>
              </div>

              <p className="mt-6 text-natural-700 leading-relaxed dark:text-natural-200">
                This is a partner-led collaboration, designed for someone who wants to build, grow, and own what they
                create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof / Context */}
      <section className="bg-white border-y border-natural-200 dark:bg-primary-900 dark:border-primary-700">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
              <p className="text-3xl font-bold text-primary-700 dark:text-primary-300">50k+</p>
              <p className="mt-1 text-sm text-natural-600 dark:text-natural-200">annual visitors (existing destination)</p>
            </div>
            <div className="rounded-2xl p-6 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
              <p className="font-semibold text-natural-900 dark:text-natural-50">Established destination context</p>
              <p className="mt-2 text-sm text-natural-600 dark:text-natural-200">
                Restaurant, cellar door, and events provide year-round visitor flow.
              </p>
            </div>
            <div className="rounded-2xl p-6 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
              <p className="font-semibold text-natural-900 dark:text-natural-50">Hospitality ecosystem</p>
              <p className="mt-2 text-sm text-natural-600 dark:text-natural-200">
                On-site offerings + cross-promo to support subscription and workshop demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-14">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 dark:text-natural-50">
                🌿 About Bayview Hub
              </h2>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                Bayview Hub is a growing destination that brings together:
              </p>
              <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200 list-disc ml-5">
                <li>hospitality and wine</li>
                <li>arts and creative programs</li>
                <li>music and cultural gatherings</li>
                <li>nature-based and slow-living experiences</li>
              </ul>
              <p className="mt-6 text-natural-700 leading-relaxed dark:text-natural-200">
                We already welcome significant visitor traffic through our restaurant, cellar door, and events.
              </p>
              <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200 list-disc ml-5">
                <li>
                  <span className="font-semibold text-natural-900 dark:text-natural-50">Proof:</span> Bayview Hub welcomes{' '}
                  <span className="font-semibold text-natural-900 dark:text-natural-50">50k+</span> visitors per year
                  through restaurant, cellar door and events.
                </li>
                <li>Our next chapter is to activate the land with long-term, mission-aligned partners.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 dark:text-natural-50">
                🌱 The Opportunity: Edible Gardens
              </h2>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                We are offering dedicated land and shared resources to a founding partner to design, launch, and operate
                an Edible Gardens program that may include:
              </p>
              <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200 list-disc ml-5">
                <li>subscription-based garden memberships</li>
                <li>family and children’s gardening programs</li>
                <li>seasonal planting and harvest experiences</li>
                <li>hands-on workshops and talks</li>
                <li>produce-based offerings or garden events</li>
                <li>community-driven food education</li>
              </ul>
              <ul className="mt-6 space-y-2 text-natural-700 dark:text-natural-200 list-disc ml-5">
                <li>
                  <span className="font-semibold text-natural-900 dark:text-natural-50">The exact model is yours to design.</span>
                </li>
                <li>
                  <span className="font-semibold text-natural-900 dark:text-natural-50">
                    We are not prescribing a formula. We are offering a platform.
                  </span>
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl p-8 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                <h3 className="text-2xl font-serif font-bold text-natural-900 dark:text-natural-50">
                  🏡 Bayview provides
                </h3>
                <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200 list-disc ml-5">
                  <li>Land allocation + access schedule (agreed during pilot)</li>
                  <li>Water access / storage / basic amenities (confirm on-site; may be TBC)</li>
                  <li>Marketing inclusion (website)</li>
                  <li>Visitor flow + cross-promo via the hub</li>
                  <li>Shared context: parking, guest flow, safety expectations</li>
                </ul>
              </div>

              <div className="rounded-2xl p-8 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                <h3 className="text-2xl font-serif font-bold text-natural-900 dark:text-natural-50">
                  🌾 Partner provides
                </h3>
                <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200 list-disc ml-5">
                  <li>Program design + customer service + day-to-day operations</li>
                  <li>Tools / team / operations to deliver consistently</li>
                  <li>Pricing, subscriptions, workshop delivery</li>
                  <li>Compliance with site rules, safety, access requirements</li>
                  <li>Insurance and compliance if required (e.g., public liability)</li>
                </ul>
                <p className="mt-6 text-natural-700 dark:text-natural-200">
                  You remain an independent operator. This is your business.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 dark:text-natural-50">
                💡 Example models (not prescriptive)
              </h2>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                Some great candidates don’t apply because they can’t picture the model. Here are three examples you could
                adapt:
              </p>
              <div className="mt-6 grid md:grid-cols-3 gap-6">
                <div className="rounded-2xl p-6 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                  <p className="font-semibold text-natural-900 dark:text-natural-50">Family Plot Memberships</p>
                  <p className="mt-2 text-sm text-natural-600 dark:text-natural-200">
                    Weekly access + seasonal planting days + family routines.
                  </p>
                </div>
                <div className="rounded-2xl p-6 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                  <p className="font-semibold text-natural-900 dark:text-natural-50">Market Garden Subscription</p>
                  <p className="mt-2 text-sm text-natural-600 dark:text-natural-200">
                    Monthly produce + garden meetups + harvest moments.
                  </p>
                </div>
                <div className="rounded-2xl p-6 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                  <p className="font-semibold text-natural-900 dark:text-natural-50">Workshops &amp; Education</p>
                  <p className="mt-2 text-sm text-natural-600 dark:text-natural-200">
                    Kids programs, permaculture intro, seasonal classes.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 dark:text-natural-50">
                👩‍🌾👨‍🌾 Who This Is For
              </h2>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                This opportunity is suited to someone who:
              </p>
              <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200 list-disc ml-5">
                <li>is entrepreneurial and self-motivated</li>
                <li>
                  has experience (or strong capability) in:
                  <ul className="mt-2 ml-5 list-disc space-y-1">
                    <li>food growing</li>
                    <li>regenerative or market gardening</li>
                    <li>education or community programs</li>
                    <li>subscription-based or workshop-led models</li>
                  </ul>
                </li>
                <li>is comfortable starting with a pilot phase</li>
                <li>wants to build something meaningful, practical, and sustainable</li>
              </ul>
              <p className="mt-6 text-natural-700 leading-relaxed dark:text-natural-200">
                You do not need a perfect résumé. You do need ownership mindset.
              </p>
            </div>

            <div className="rounded-2xl p-8 bg-neutral-100 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-natural-900 dark:text-natural-50">
                🚫 What This Is Not
              </h2>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                To avoid confusion, Bayview Hub is not offering:
              </p>
              <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200 list-disc ml-5">
                <li>employment or salary</li>
                <li>a franchise or license</li>
                <li>a short-term pop-up rental</li>
                <li>a “pay to participate” listing</li>
              </ul>
              <p className="mt-6 text-natural-700 leading-relaxed dark:text-natural-200">
                There are no upfront fees to apply or pilot.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 dark:text-natural-50">
                🔄 How Collaboration Works
              </h2>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                Our process is simple and transparent:
              </p>
              <ol className="mt-4 space-y-2 text-natural-700 dark:text-natural-200 list-decimal ml-5">
                <li>Expression of Interest</li>
                <li>Short alignment conversation</li>
                <li>Discussion of pilot concept</li>
                <li>Trial activation on site</li>
                <li>Agreement on ongoing structure if successful</li>
              </ol>
              <p className="mt-6 text-natural-700 leading-relaxed dark:text-natural-200">
                Everything is built step by step, based on mutual fit.
              </p>
            </div>

            <div className="rounded-2xl p-8 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 dark:text-natural-50">
                ✅ 90-Day Pilot Focus
              </h2>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                This is an operator-led pilot. Example focus points:
              </p>
              <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200 list-disc ml-5">
                <li>Define the membership offer + pricing</li>
                <li>Prepare initial beds / planting plan</li>
                <li>Recruit first 30–100 founding subscribers (waitlist counts)</li>
                <li>Run 1–2 garden sessions or workshops</li>
                <li>Agree simple operations, safety, and access rules</li>
              </ul>
            </div>

            <div id="apply">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 dark:text-natural-50">
                ✍️ Expression of Interest
              </h2>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                If this opportunity resonates with you, we’d love to hear from you.
              </p>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">Please tell us:</p>
              <ul className="mt-2 space-y-2 text-natural-700 dark:text-natural-200 list-disc ml-5">
                <li>who you are</li>
                <li>what you want to build</li>
                <li>how you see an edible garden serving people and community</li>
              </ul>
              <p className="mt-6 text-natural-700 leading-relaxed dark:text-natural-200">
                👉 Submit your Expression of Interest below
              </p>

              <div className="mt-8">
                <Suspense fallback={<div className="rounded-2xl p-8 bg-white shadow-lg border border-natural-200 dark:bg-primary-900/60 dark:border-primary-700" />}>
                  <EdibleGardensEOIForm />
                </Suspense>
              </div>

              <p className="mt-8 text-xs text-natural-600 dark:text-natural-300">
                <strong>Footer Note:</strong> Bayview Hub partners with independent operators on a pilot-first basis. All
                collaborations are subject to mutual agreement and alignment.
                <span> Submitting an EOI does not create any obligation for either party.</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


