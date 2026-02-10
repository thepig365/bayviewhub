import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { Button } from '@/components/ui/Button'

export const metadata = genMeta({
  title: `Founding Curator / Gallery Director | ${SITE_CONFIG.name}`,
  description:
    'Build the Bayview Arts Gallery from the ground up. Curate exhibitions, manage artist relationships, develop sales. Founding partnership opportunity with estimated 50k+ annual visitors annually. Evidence available on-site.',
  path: '/partners/curator',
})

const faqs = [
  {
    q: 'What does the Founding Curator role involve?',
    a: 'Lead the establishment of Bayview Arts Gallery: curate exhibitions, manage artist relationships, develop sales operations and collector network, design gallery programs and events calendar, build partnerships with art institutions.',
  },
  {
    q: 'What support does Bayview Hub provide?',
    a: 'Land, infrastructure, and an existing visitor context. Estimated 50k+ annual visitors (see Evidence) already arrive for dining, cellar door, and events. The gallery is integrated into this living destination.',
    aNode: (
      <>
        Land, infrastructure, and an existing visitor context.{' '}
        <a href="/evidence/visitor-traffic" className="text-primary-600 hover:underline dark:text-primary-400">
          Estimated 50k+ annual visitors (see Evidence)
        </a>{' '}
        already arrive for dining, cellar door, and events. The gallery is integrated into this living destination.
      </>
    ),
  },
  {
    q: 'Is this employment or a partnership?',
    a: 'This is a founding partnership — not employment, not franchising. You operate your own practice; Bayview provides the platform. Revenue share or equity hybrid negotiable.',
  },
  {
    q: 'How do I express interest?',
    a: 'Apply via the main partners form at bayviewhub.me/partners#apply. Select "Founding Curator / Gallery Director" as the role.',
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

export default function CuratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-white dark:bg-primary-900">
        {/* Answer Capsule */}
        <section className="py-8 bg-natural-50 dark:bg-primary-800/30 border-b border-natural-200 dark:border-primary-700">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <AnswerCapsule
                definition="Founding Curator / Gallery Director: lead the establishment of Bayview Arts Gallery — curate exhibitions, build artist relationships, develop sales operations, within a 30-acre destination with estimated 50k+ annual visitors (see Evidence)."
                facts={[
                  'Curate exhibitions and manage artist relationships.',
                  'Develop sales operations and collector network.',
                  'Design gallery programs and events calendar.',
                  'Build partnerships with art institutions.',
                  'Estimated 50k+ annual visitors (see Evidence). No commercial rent. Revenue share negotiable.',
                ]}
                sources={[
                  { label: 'Art Gallery', href: `${SITE_CONFIG.url}/art-gallery` },
                  { label: 'Founding Partners', href: `${SITE_CONFIG.url}/art-gallery/founding-partners` },
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
                Founding Curator / Gallery Director
              </h1>
              <p className="text-xl text-natural-600 leading-relaxed dark:text-natural-300">
                Build exhibitions, artist relationships, and sales operations. Lead the establishment of Bayview Arts Gallery from the ground up.
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
                  'Curate exhibitions and manage artist relationships',
                  'Develop sales operations and collector network',
                  'Design gallery programs and events calendar',
                  'Build partnerships with art institutions',
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
                    <dd className="text-natural-700 dark:text-natural-300">{(faq as { aNode?: React.ReactNode }).aNode ?? faq.a}</dd>
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
