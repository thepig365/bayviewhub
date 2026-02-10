import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { Button } from '@/components/ui/Button'
import { LAST_UPDATED } from '@/lib/seo'

export const metadata = genMeta({
  title: `Founding Edible Garden Ops Lead | ${SITE_CONFIG.name}`,
  description:
    'Build and operate the edible gardens subscription system at Bayview Hub. Design seasonal harvest, garden days, workshops. Founding partnership opportunity.',
  path: '/partners/garden-ops',
})

const faqs = [
  {
    q: 'What does the Edible Garden Ops Lead role involve?',
    a: 'Build and operate the edible gardens subscription system. Design seasonal harvest and delivery systems, manage subscriber experiences and events, build family-friendly garden programs, ensure operational reliability.',
  },
  {
    q: 'What does Bayview Hub provide?',
    a: 'Land allocation, water access, marketing inclusion, visitor flow and cross-promo. Estimated 50k+ annual visitors (see Evidence). You design the subscription model, pricing, and delivery.',
  },
  {
    q: 'Is this the same as the Edible Gardens EOI?',
    a: 'Yes. The Founding Edible Garden Ops Lead opportunity is detailed at /partners/edible-gardens. That page includes the expression of interest form.',
  },
  {
    q: 'How do I express interest?',
    a: 'Apply via the dedicated Edible Gardens expression of interest at bayviewhub.me/partners/edible-gardens, or use the main partners form at bayviewhub.me/partners#apply and select the relevant role.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function GardenOpsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-white dark:bg-primary-900">
        {/* Answer Capsule */}
        <section className="py-8 bg-natural-50 dark:bg-primary-800/30 border-b border-natural-200 dark:border-primary-700">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <AnswerCapsule
                definition="Founding Edible Garden Ops Lead: build and operate the edible gardens subscription system at Bayview Hub. Design seasonal harvest, garden days, and family-friendly programs."
                facts={[
                  'Design seasonal harvest and delivery systems.',
                  'Manage subscriber experiences and events.',
                  'Build family-friendly garden programs.',
                  'Ensure operational reliability.',
                  'Bayview provides land, infrastructure, estimated 50k+ visitor context (see Evidence).',
                ]}
                sources={[
                  { label: 'Edible Gardens', href: `${SITE_CONFIG.url}/edible-gardens` },
                  { label: 'How It Works', href: `${SITE_CONFIG.url}/edible-gardens/how-it-works` },
                  { label: 'Founding Partner EOI', href: `${SITE_CONFIG.url}/partners/edible-gardens` },
                  { label: 'Partners', href: `${SITE_CONFIG.url}/partners` },
                  { label: 'Visitor Traffic Evidence', href: `${SITE_CONFIG.url}/evidence/visitor-traffic` },
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
                Founding Edible Garden Ops Lead
              </h1>
              <p className="text-xl text-natural-600 leading-relaxed dark:text-natural-300">
                Turn gardens into a subscription model with reliable delivery. Design seasonal harvest and delivery systems, manage subscriber experiences and events.
              </p>
            </div>
          </div>
        </section>

        {/* Responsibilities */}
        <section className="py-16 bg-natural-50 dark:bg-primary-800/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
                Responsibilities
              </h2>
              <ul className="space-y-4">
                {[
                  'Design seasonal harvest and delivery systems',
                  'Manage subscriber experiences and events',
                  'Build family-friendly garden programs',
                  'Ensure operational reliability',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                    <p className="text-natural-700 dark:text-natural-300">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
                Register Interest
              </h2>
              <p className="text-natural-600 mb-8 dark:text-natural-300">
                Apply via the Edible Gardens expression of interest.
              </p>
              <Button href="/partners/edible-gardens" variant="primary" size="lg">
                Edible Gardens EOI
              </Button>
              <span className="mx-2">or</span>
              <Button href="/partners#apply" variant="outline" size="lg">
                Main Partners Form
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-natural-50 dark:bg-primary-800/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
                FAQ
              </h2>
              <dl className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 dark:bg-primary-900/60 dark:border dark:border-primary-700">
                    <dt className="font-bold text-natural-900 mb-2 dark:text-natural-50">{faq.q}</dt>
                    <dd className="text-natural-700 dark:text-natural-300">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
