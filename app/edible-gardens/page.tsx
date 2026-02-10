import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { EdibleGardensClient } from './EdibleGardensClient'

export const metadata = genMeta({
  title: `Edible Gardens | Subscription Program | ${SITE_CONFIG.name}`,
  description:
    'Connect with seasonal food through harvest boxes, garden days, and hands-on growing experiences at Bayview Hub. Organic, regenerative practices.',
  path: '/edible-gardens',
})

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I pause my subscription?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, you can pause for up to one season with 2 weeks notice.' },
    },
    {
      '@type': 'Question',
      name: 'What happens in bad weather?',
      acceptedAnswer: { '@type': 'Answer', text: 'Garden days are rescheduled. Harvest boxes are delivered rain or shine.' },
    },
    {
      '@type': 'Question',
      name: 'Are the gardens organic?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, we use organic and regenerative farming practices.' },
    },
    {
      '@type': 'Question',
      name: 'Can I transfer my subscription?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, subscriptions can be transferred to friends or family with notice.' },
    },
  ],
}

export default function EdibleGardensPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-white dark:bg-primary-900">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <AnswerCapsule
                definition="Subscription-based edible gardens at Bayview Hub. Seasonal harvest boxes, garden days, and hands-on growing experiences within the estate."
                facts={[
                  'Seasonal harvest boxes delivered on a regular cycle.',
                  'Garden days: planting, harvesting, or simply being present.',
                  'Cooking workshops with visiting chefs.',
                  'Organic and regenerative farming practices.',
                ]}
                sources={[
                  { label: 'How It Works', href: `${SITE_CONFIG.url}/edible-gardens/how-it-works` },
                  { label: 'Founding Partner', href: `${SITE_CONFIG.url}/partners/edible-gardens` },
                ]}
                lastUpdated="2025-02-10"
                className="mb-12"
              />
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
                Edible Gardens
              </h1>
              <p className="text-xl text-natural-600 leading-relaxed dark:text-natural-300">
                Connect with seasonal food through harvest boxes, garden days, and hands-on growing experiences within the estate.
              </p>
            </div>
          </div>
        </section>
        <EdibleGardensClient />
      </main>
    </>
  )
}
