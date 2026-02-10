import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { Button } from '@/components/ui/Button'

export const metadata = genMeta({
  title: `How Edible Gardens Work | ${SITE_CONFIG.name}`,
  description:
    'How Bayview Hub edible gardens work: harvest boxes, garden days, subscriptions, founding partner model. Seasonal produce and hands-on experiences.',
  path: '/edible-gardens/how-it-works',
})

export default function EdibleGardensHowItWorksPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-primary-900">
      {/* Answer Capsule */}
      <section className="py-8 bg-natural-50 dark:bg-primary-800/30 border-b border-natural-200 dark:border-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnswerCapsule
              definition="Edible Gardens at Bayview Hub operates as a subscription model: seasonal harvest boxes, garden days for planting and harvesting, and cooking workshops."
              facts={[
                'Seasonal harvest boxes delivered on a regular cycle.',
                'Garden days: time in the gardens — planting, harvesting, or being present.',
                'Cooking workshops with visiting chefs.',
                'Subscriptions can be paused (up to one season with 2 weeks notice).',
                'Founding partner operates the program. Expressions of interest open.',
              ]}
              sources={[
                { label: 'Edible Gardens', href: `${SITE_CONFIG.url}/edible-gardens` },
                { label: 'Founding Partner', href: `${SITE_CONFIG.url}/partners/edible-gardens` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              How It Works
            </h1>
            <p className="text-xl text-natural-600 leading-relaxed dark:text-natural-300">
              The edible gardens program is built around three core experiences: harvest boxes, garden days, and workshops.
            </p>
          </div>
        </div>
      </section>

      {/* Model */}
      <section className="py-16 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              The Model
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">Seasonal Harvest Boxes</h3>
                <p className="text-natural-700 dark:text-natural-300">
                  Fresh produce from the gardens, delivered to you on a regular cycle. Rain or shine.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">Garden Days</h3>
                <p className="text-natural-700 dark:text-natural-300">
                  Time spent in the gardens — planting, harvesting, or simply being present. Family-friendly.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">Cooking Workshops</h3>
                <p className="text-natural-700 dark:text-natural-300">
                  Learn to prepare seasonal produce with guidance from visiting chefs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Partner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Founding Partner
            </h2>
            <p className="text-natural-700 dark:text-natural-300 mb-6">
              The program is operated by a founding partner — an entrepreneurial operator who designs the membership offer, pricing, and delivery. Bayview Hub provides land, infrastructure, and an existing visitor context (50k+ annual visitors).
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/partners/edible-gardens" variant="primary" size="lg">
                Learn About Partnership
              </Button>
              <Button href="/edible-gardens" variant="outline" size="lg">
                Back to Edible Gardens
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
