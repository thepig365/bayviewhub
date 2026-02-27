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
    <main className="min-h-screen bg-white dark:bg-bg">
      {/* Answer Capsule */}
      <section className="py-8 bg-natural-50 dark:bg-surface/50 border-b border-natural-200 dark:border-border">
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 dark:text-fg">
              How It Works
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              The edible gardens program is built around three core experiences: harvest boxes, garden days, and workshops.
            </p>
          </div>
        </div>
      </section>

      {/* Model */}
      <section className="py-16 bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-fg">
              The Model
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-xl dark:bg-surface dark:border dark:border-border">
                <h3 className="font-bold text-natural-900 mb-2 dark:text-fg">Seasonal Harvest Boxes</h3>
                <p className="text-muted">
                  Fresh produce from the gardens, delivered to you on a regular cycle. Rain or shine.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl dark:bg-surface dark:border dark:border-border">
                <h3 className="font-bold text-natural-900 mb-2 dark:text-fg">Garden Days</h3>
                <p className="text-muted">
                  Time spent in the gardens — planting, harvesting, or simply being present. Family-friendly.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl dark:bg-surface dark:border dark:border-border">
                <h3 className="font-bold text-natural-900 mb-2 dark:text-fg">Cooking Workshops</h3>
                <p className="text-muted">
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
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-fg">
              Founding Partner
            </h2>
            <p className="text-muted mb-6">
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
