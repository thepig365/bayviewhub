import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { Button } from '@/components/ui/Button'
import { LAST_UPDATED } from '@/lib/seo'

export const metadata = genMeta({
  title: `Founding Art Therapy Program Lead | ${SITE_CONFIG.name}`,
  description:
    'Design safe, ethical expressive arts and wellbeing programs. Create and lead art therapy workshops at Bayview Hub. Founding partnership opportunity.',
  path: '/partners/art-therapy',
})

const faqs = [
  {
    q: 'What does the Art Therapy Program Lead role involve?',
    a: 'Create and lead expressive arts and wellbeing programs. Design and deliver art therapy workshops, ensure ethical and safe program delivery, build scalable workshop systems, manage practitioner credentials and insurance.',
  },
  {
    q: 'What qualifications are required?',
    a: 'Qualified art therapist or equivalent. Professional indemnity insurance is required.',
  },
  {
    q: 'Is this a clinical or non-clinical role?',
    a: 'Bayview Hub describes its workshops as therapeutic arts (non-clinical). Program design should be safe and ethical; engage qualified professionals for clinical scope.',
  },
  {
    q: 'How do I express interest?',
    a: 'Apply via the main partners form at bayviewhub.me/partners#apply. Select "Founding Art Therapy Program Lead" as the role.',
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

export default function ArtTherapyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-white dark:bg-primary-900">
        {/* Answer Capsule */}
        <section className="py-8 bg-natural-50 dark:bg-primary-800/30 border-b border-natural-200 dark:border-primary-700">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <AnswerCapsule
                definition="Founding Art Therapy Program Lead: create and lead expressive arts and wellbeing programs at Bayview Hub. Design safe, ethical workshop systems. Therapeutic arts (non-clinical)."
                facts={[
                  'Design and deliver art therapy workshops.',
                  'Ensure ethical and safe program delivery.',
                  'Build scalable workshop systems.',
                  'Manage practitioner credentials and insurance.',
                  'Qualified art therapist or equivalent required.',
                ]}
                sources={[
                  { label: 'Founding Partners', href: `${SITE_CONFIG.url}/art-gallery/founding-partners` },
                  { label: 'Workshops', href: `${SITE_CONFIG.url}/workshops` },
                  { label: 'Partners', href: `${SITE_CONFIG.url}/partners` },
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
                Founding Art Therapy Program Lead
              </h1>
              <p className="text-xl text-natural-600 leading-relaxed dark:text-natural-300">
                Design safe, ethical programs and scalable workshop systems. Create and lead expressive arts and wellbeing programs.
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
                  'Design and deliver art therapy workshops',
                  'Ensure ethical and safe program delivery',
                  'Build scalable workshop systems',
                  'Manage practitioner credentials and insurance',
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
                Become a Founding Partner
              </h2>
              <p className="text-natural-600 mb-8 dark:text-natural-300">
                Register your interest and apply for this role.
              </p>
              <Button href="/partners#apply" variant="primary" size="lg">
                Apply Now
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
