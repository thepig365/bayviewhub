import React from 'react'
import { generateMetadata as genMeta } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'
import { EdibleGardensEOIForm } from './EdibleGardensEOIForm'

export const metadata = genMeta({
  title: `Founding Partner Opportunity — Edible Gardens | ${SITE_CONFIG.name}`,
  description:
    'Build your own subscription-based edible garden business within a thriving destination. Expressions of interest now open for a founding partner.',
  path: '/partners/edible-gardens',
})

export default function EdibleGardensFoundingPartnerPage() {
  return (
    <div className="min-h-screen dark:bg-primary-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent-50 to-primary-50 py-20 dark:from-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-xs font-bold tracking-wide uppercase text-accent-800 dark:text-accent-200">
                Founding Partner Opportunity
              </p>
              <h1 className="mt-4 text-5xl md:text-6xl font-serif font-bold text-natural-900 dark:text-natural-50">
                Edible Gardens at Bayview Hub
              </h1>
              <p className="mt-6 text-xl text-natural-700 leading-relaxed dark:text-natural-200">
                Build your own subscription-based edible garden business — within a thriving destination.
              </p>
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

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl p-4 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                  <p className="font-semibold text-natural-900 dark:text-natural-50">This is not a job.</p>
                </div>
                <div className="rounded-xl p-4 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                  <p className="font-semibold text-natural-900 dark:text-natural-50">This is not a franchise.</p>
                </div>
                <div className="rounded-xl p-4 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                  <p className="font-semibold text-natural-900 dark:text-natural-50">This is not a pay-to-rent scheme.</p>
                </div>
              </div>

              <p className="mt-6 text-natural-700 leading-relaxed dark:text-natural-200">
                This is a partner-led collaboration, designed for someone who wants to build, grow, and own what they
                create.
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
              <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200">
                <li>hospitality and wine</li>
                <li>arts and creative programs</li>
                <li>music and cultural gatherings</li>
                <li>nature-based and slow-living experiences</li>
              </ul>
              <p className="mt-6 text-natural-700 leading-relaxed dark:text-natural-200">
                We already welcome significant visitor traffic through our restaurant, cellar door, and events. Our next
                chapter is to activate the land — not with short-term hires, but with long-term, mission-aligned
                partners.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 dark:text-natural-50">
                🌱 The Opportunity: Edible Gardens
              </h2>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                We are offering dedicated land and shared resources to a founding partner to design, launch, and operate
                an Edible Gardens program that may include:
              </p>
              <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200">
                <li>subscription-based garden memberships</li>
                <li>family and children’s gardening programs</li>
                <li>seasonal planting and harvest experiences</li>
                <li>hands-on workshops and talks</li>
                <li>produce-based offerings or garden events</li>
                <li>community-driven food education</li>
              </ul>
              <p className="mt-6 text-natural-700 leading-relaxed dark:text-natural-200">The exact model is yours to design.</p>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                We are not prescribing a formula. We are offering a platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl p-8 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                <h3 className="text-2xl font-serif font-bold text-natural-900 dark:text-natural-50">
                  🏡 What Bayview Hub Provides
                </h3>
                <p className="mt-4 text-natural-700 dark:text-natural-200">
                  We provide the infrastructure and context, including:
                </p>
                <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200">
                  <li>Dedicated land suitable for edible gardens</li>
                  <li>A destination with existing foot traffic</li>
                  <li>Shared amenities and operational support</li>
                  <li>Visibility under the Bayview Hub brand</li>
                  <li>A supportive ecosystem of food, wine, art, and music</li>
                  <li>Freedom to test, iterate, and grow organically</li>
                </ul>
              </div>

              <div className="rounded-2xl p-8 bg-natural-50 dark:bg-primary-800/30 dark:border dark:border-primary-700">
                <h3 className="text-2xl font-serif font-bold text-natural-900 dark:text-natural-50">
                  🌾 What the Partner Builds
                </h3>
                <p className="mt-4 text-natural-700 dark:text-natural-200">
                  You build and operate the business, including:
                </p>
                <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200">
                  <li>program structure and offerings</li>
                  <li>pricing and subscription models</li>
                  <li>day-to-day operations</li>
                  <li>community engagement</li>
                  <li>growth direction and long-term vision</li>
                </ul>
                <p className="mt-6 text-natural-700 dark:text-natural-200">
                  You remain an independent operator. This is your business.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 dark:text-natural-50">
                👩‍🌾👨‍🌾 Who This Is For
              </h2>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                This opportunity is suited to someone who:
              </p>
              <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200">
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

            <div className="rounded-2xl p-8 bg-accent-50 border border-accent-200 dark:bg-primary-800/30 dark:border-primary-700">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-natural-900 dark:text-natural-50">
                🚫 What This Is Not
              </h2>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                To avoid confusion, Bayview Hub is not offering:
              </p>
              <ul className="mt-4 space-y-2 text-natural-700 dark:text-natural-200">
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

            <div id="apply">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 dark:text-natural-50">
                ✍️ Expression of Interest
              </h2>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
                If this opportunity resonates with you, we’d love to hear from you.
              </p>
              <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">Please tell us:</p>
              <ul className="mt-2 space-y-2 text-natural-700 dark:text-natural-200">
                <li>who you are</li>
                <li>what you want to build</li>
                <li>how you see an edible garden serving people and community</li>
              </ul>
              <p className="mt-6 text-natural-700 leading-relaxed dark:text-natural-200">
                👉 Submit your Expression of Interest below
              </p>

              <div className="mt-8">
                <EdibleGardensEOIForm />
              </div>

              <p className="mt-8 text-xs text-natural-600 dark:text-natural-300">
                <strong>Footer Note:</strong> Bayview Hub partners with independent operators on a pilot-first basis. All
                collaborations are subject to mutual agreement and alignment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


