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
    <div className="min-h-screen dark:bg-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-100 to-neutral-50 py-20 dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-xs font-bold tracking-wide uppercase text-fg">
                Founding Partner Opportunity
              </p>
              <h1 className="mt-4 text-4xl md:text-5xl font-serif font-bold text-fg">
                Build a subscription-based edible gardens program — currently in Concept Plan stage.
              </h1>
              <Suspense fallback={<div className="mt-8 h-12" />}>
                <EdibleGardensHeroCtas
                  email={SITE_CONFIG.email}
                  subject="Edible Gardens Founding Partner — 10-min Call"
                />
              </Suspense>
            </div>

            <div className="mt-10 rounded-2xl p-8 bg-white shadow-lg border border-natural-200 dark:bg-surface dark:border-border">
              <p className="text-muted leading-relaxed">
                We're seeking one Founding Partner to design, build, and operate the first version of Edible Gardens at Bayview Hub.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                This is not an existing program being handed over. It's a founding build: you shape the offer, validate it with a pilot cohort, and scale it into a durable subscription business.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                The mission: help families (especially kids) trade passive screen time for real, repeatable time outdoors — planting, watering, harvesting, and taking produce home for the family table.
              </p>

              <div className="mt-6 rounded-xl p-4 bg-natural-50 text-center dark:bg-surface/50 dark:border dark:border-border">
                <p className="font-semibold text-fg">
                  Not employment. Not a franchise. Not pay-to-rent.
                </p>
              </div>

              <p className="mt-6 text-muted leading-relaxed">
                This is an independent operator partnership, built step-by-step on mutual fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof / Context */}
      <section className="bg-white border-y border-natural-200 dark:bg-bg dark:border-border">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 bg-natural-50 dark:bg-surface/50 dark:border dark:border-border">
              <p className="text-3xl font-bold text-primary-700 dark:text-primary-300">50k+</p>
              <p className="mt-1 text-sm text-muted ">
                <a href="/evidence/visitor-traffic" className="text-primary-600 hover:underline dark:text-primary-400">Estimated 50k+ annual visitors</a> (see Evidence) — existing destination
              </p>
            </div>
            <div className="rounded-2xl p-6 bg-natural-50 dark:bg-surface/50 dark:border dark:border-border">
              <p className="font-semibold text-fg ">Established destination context</p>
              <p className="mt-2 text-sm text-muted ">
                Restaurant, cellar door, and events provide year-round visitor flow.
              </p>
            </div>
            <div className="rounded-2xl p-6 bg-natural-50 dark:bg-surface/50 dark:border dark:border-border">
              <p className="font-semibold text-fg ">Hospitality ecosystem</p>
              <p className="mt-2 text-sm text-muted ">
                On-site offerings + cross-promo to support subscription and workshop demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white dark:bg-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-14">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg ">
                🌿 About Bayview Hub
              </h2>
              <p className="mt-4 text-muted leading-relaxed ">
                Bayview Hub is a growing destination that brings together:
              </p>
              <ul className="mt-4 space-y-2 text-muted  list-disc ml-5">
                <li>hospitality and wine</li>
                <li>arts and creative programs</li>
                <li>music and cultural gatherings</li>
                <li>nature-based and slow-living experiences</li>
              </ul>
              <p className="mt-6 text-muted leading-relaxed ">
                We already welcome significant visitor traffic through our restaurant, cellar door, and events.
              </p>
              <ul className="mt-4 space-y-2 text-muted  list-disc ml-5">
                <li>
                  <span className="font-semibold text-fg ">Proof:</span> Bayview Hub welcomes{' '}
                  <a href="/evidence/visitor-traffic" className="text-primary-600 hover:underline dark:text-primary-400 font-semibold">estimated 50k+ annual visitors</a> (see Evidence) through restaurant, cellar door and events.
                </li>
                <li>Our next chapter is to activate the land with long-term, mission-aligned partners.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg">
                🌱 The Opportunity: Edible Gardens
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                We are offering a dedicated area of land (pilot allocation) and shared estate context to a Founding Partner to prototype and launch an Edible Gardens subscription program.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                This program is in Concept Plan stage — so the exact operating model is not fixed. The partner will lead the design and delivery, starting with a 90-day pilot, then moving to an ongoing structure if results are strong.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                The program may include memberships, family garden sessions, seasonal planting/harvest moments, education, and workshops — but the core is a subscription habit that families can rely on.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl p-8 bg-natural-50 dark:bg-surface/50 dark:border dark:border-border">
                <h3 className="text-2xl font-serif font-bold text-fg">
                  🏡 Bayview provides
                </h3>
                <ul className="mt-4 space-y-2 text-muted list-disc ml-5">
                  <li>Land allocation + access schedule (agreed during pilot)</li>
                  <li>Water access / storage / basic amenities (confirm on-site; may be TBC)</li>
                  <li>Marketing inclusion (website)</li>
                  <li>Visitor flow + cross-promo via the hub</li>
                  <li>Shared context: parking, guest flow, safety expectations</li>
                </ul>
              </div>

              <div className="rounded-2xl p-8 bg-natural-50 dark:bg-surface/50 dark:border dark:border-border">
                <h3 className="text-2xl font-serif font-bold text-fg">
                  🌾 Partner provides
                </h3>
                <ul className="mt-4 space-y-2 text-muted list-disc ml-5">
                  <li>Program design + customer service + day-to-day operations</li>
                  <li>Tools / team / operations to deliver consistently</li>
                  <li>Pricing, subscriptions, workshop delivery</li>
                  <li>Compliance with site rules, safety, access requirements</li>
                  <li>Insurance and compliance if required (e.g., public liability)</li>
                </ul>
                <p className="mt-6 text-muted">
                  You remain an independent operator. This is your business.
                </p>
              </div>
            </div>

            <div className="rounded-2xl p-8 bg-primary-50 border border-primary-200 dark:bg-primary-900/20 dark:border-primary-800">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-fg">
                👨‍👩‍👧‍👦 Suggested Model: Founding 100 Families (Subscription)
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                To make the launch concrete, we recommend a Founding 100 Families cohort for the first full season.
              </p>

              <h3 className="mt-6 text-lg font-bold text-fg">What families subscribe to</h3>
              <ul className="mt-3 space-y-2 text-muted list-disc ml-5">
                <li>Seasonal produce share (weekly or fortnightly harvest box) for the family table</li>
                <li>Garden Days (screen-free, repeatable): guided planting + harvesting sessions</li>
                <li>Kids Grow Experiences: age-appropriate tasks that teach 'seed → food → table'</li>
                <li>Simple take-home recipes (optional): turn harvest into dinner, not just an activity</li>
              </ul>

              <h3 className="mt-6 text-lg font-bold text-fg">Why this works</h3>
              <ul className="mt-3 space-y-2 text-muted list-disc ml-5">
                <li>Creates a weekly/fortnightly ritual that replaces screen time with real-world responsibility and curiosity</li>
                <li>Kids learn patience, care, and cause-and-effect by watching growth over time</li>
                <li>Families leave with something tangible: food they grew, not just a nice outing</li>
              </ul>

              <h3 className="mt-6 text-lg font-bold text-fg">Founding cohort perks (optional)</h3>
              <ul className="mt-3 space-y-2 text-muted list-disc ml-5">
                <li>Founding member priority bookings</li>
                <li>Early access to crop plans / seasonal events</li>
                <li>Recognition on-site as 'Founding Families' (tasteful, not salesy)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg">
                💡 Example models (starting points — not prescriptive)
              </h2>
              <div className="mt-6 grid md:grid-cols-3 gap-6">
                <div className="rounded-2xl p-6 bg-natural-50 dark:bg-surface/50 dark:border dark:border-border">
                  <p className="font-semibold text-fg">Founding 100 Families Membership</p>
                  <p className="mt-2 text-sm text-muted">
                    Seasonal produce + scheduled Garden Days + kids grow sessions.
                  </p>
                </div>
                <div className="rounded-2xl p-6 bg-natural-50 dark:bg-surface/50 dark:border dark:border-border">
                  <p className="font-semibold text-fg">Market Garden Subscription</p>
                  <p className="mt-2 text-sm text-muted">
                    Monthly/fortnightly harvest + optional add-on workshops and community days.
                  </p>
                </div>
                <div className="rounded-2xl p-6 bg-natural-50 dark:bg-surface/50 dark:border dark:border-border">
                  <p className="font-semibold text-fg">Education + Workshops Layer</p>
                  <p className="mt-2 text-sm text-muted">
                    Kids programs, beginner growing classes, permaculture intro, seasonal skills.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg ">
                👩‍🌾👨‍🌾 Who This Is For
              </h2>
              <p className="mt-4 text-muted leading-relaxed ">
                This opportunity is suited to someone who:
              </p>
              <ul className="mt-4 space-y-2 text-muted  list-disc ml-5">
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
              <p className="mt-6 text-muted leading-relaxed ">
                You do not need a perfect résumé. You do need ownership mindset.
              </p>
            </div>

            <div className="rounded-2xl p-8 bg-neutral-100 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-fg ">
                🚫 What This Is Not
              </h2>
              <p className="mt-4 text-muted leading-relaxed ">
                To avoid confusion, Bayview Hub is not offering:
              </p>
              <ul className="mt-4 space-y-2 text-muted  list-disc ml-5">
                <li>employment or salary</li>
                <li>a franchise or license</li>
                <li>a short-term pop-up rental</li>
                <li>a “pay to participate” listing</li>
              </ul>
              <p className="mt-6 text-muted leading-relaxed ">
                There are no upfront fees to apply or pilot.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg ">
                🔄 How Collaboration Works
              </h2>
              <p className="mt-4 text-muted leading-relaxed ">
                Our process is simple and transparent:
              </p>
              <ol className="mt-4 space-y-2 text-muted  list-decimal ml-5">
                <li>Expression of Interest</li>
                <li>Short alignment conversation</li>
                <li>Discussion of pilot concept</li>
                <li>Trial activation on site</li>
                <li>Agreement on ongoing structure if successful</li>
              </ol>
              <p className="mt-6 text-muted leading-relaxed ">
                Everything is built step by step, based on mutual fit.
              </p>
            </div>

            <div className="rounded-2xl p-8 bg-natural-50 dark:bg-surface/50 dark:border dark:border-border">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg">
                ✅ 90-Day Pilot (First 3 Months)
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                This is an operator-led pilot. Example focus points:
              </p>
              <ul className="mt-4 space-y-2 text-muted list-disc ml-5">
                <li>Define the membership offer + pricing</li>
                <li>Prepare initial beds / planting plan</li>
                <li>Recruit a Founding cohort (30–100 families) via waitlist + on-site conversion</li>
                <li>Run 1–2 garden sessions or workshops</li>
                <li>Agree simple operations, safety, and access rules</li>
              </ul>
            </div>

            <div id="apply">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg ">
                ✍️ Expression of Interest
              </h2>
              <p className="mt-4 text-muted leading-relaxed ">
                If this opportunity resonates with you, we’d love to hear from you.
              </p>
              <p className="mt-4 text-muted leading-relaxed ">Please tell us:</p>
              <ul className="mt-2 space-y-2 text-muted  list-disc ml-5">
                <li>who you are</li>
                <li>what you want to build</li>
                <li>how you see an edible garden serving people and community</li>
              </ul>
              <p className="mt-6 text-muted leading-relaxed ">
                👉 Submit your Expression of Interest below
              </p>

              <div className="mt-8">
                <Suspense fallback={<div className="rounded-2xl p-8 bg-white shadow-lg border border-natural-200 dark:bg-surface dark:border-border" />}>
                  <EdibleGardensEOIForm />
                </Suspense>
              </div>

              <p className="mt-8 text-xs text-muted">
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


