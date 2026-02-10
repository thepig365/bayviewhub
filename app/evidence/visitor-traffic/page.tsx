import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import Link from 'next/link'

export const metadata = genMeta({
  title: `Visitor Traffic Evidence | 50k+ Annual Visitors | ${SITE_CONFIG.name}`,
  description:
    'Estimated 50k+ annual visitors annually. Evidence available on-site. Definition, time window, method, and disclaimer for Bayview Hub visitor foot traffic.',
  path: '/evidence/visitor-traffic',
})

export default function VisitorTrafficEvidencePage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-white dark:bg-primary-900">
      <section className="py-8 bg-natural-50 dark:bg-primary-800/30 border-b border-natural-200 dark:border-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnswerCapsule
              definition="50k+ annual visitors refers to estimated foot traffic (visitor flow) across Bayview Hub's 30-acre destination — dining, cellar door, events, gardens, and related experiences."
              facts={[
                'Estimated 50k+ annual visitors. Not an audited metric.',
                'Time window: rolling 12-month estimate (see below).',
                'Seasonal and event-driven variation applies.',
                'See Evidence sections on this page for method and disclaimer.',
              ]}
              sources={[
                { label: 'Bayview Hub', href: `${baseUrl}` },
                { label: 'Partners', href: `${baseUrl}/partners` },
                { label: 'Art Gallery', href: `${baseUrl}/art-gallery` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
                Evidence: Visitor Traffic (50k+ Annual Visitors)
              </h1>
              <p className="text-xl text-natural-600 leading-relaxed dark:text-natural-300">
                This page documents the basis for the claim &quot;Estimated 50k+ annual visitors&quot; used across Bayview Hub.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
                Definition
              </h2>
              <p className="text-natural-700 dark:text-natural-300 leading-relaxed">
                &quot;50k+ annual visitors&quot; means the estimated number of individual visit occasions (foot traffic / visitor flow) to Bayview Hub&apos;s destination over a 12-month period. This includes visitors to the restaurant, cellar door, events, gardens, and related experiences. It is a count of visitor occasions, not unique individuals.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
                Time Window
              </h2>
              <p className="text-natural-700 dark:text-natural-300 leading-relaxed">
                Last 12 months (rolling) or specific financial/calendar year where data is available. TODO: Specify exact reporting period once internal data is confirmed.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
                Method &amp; Data Sources
              </h2>
              <p className="text-natural-700 dark:text-natural-300 leading-relaxed mb-4">
                Possible internal sources (best-effort; not all may be in use):
              </p>
              <ul className="list-disc list-inside text-natural-700 dark:text-natural-300 space-y-2">
                <li>TODO: POS / till transaction counts (restaurant, cellar door)</li>
                <li>TODO: Booking system summaries (events, wine tastings)</li>
                <li>TODO: Ticketing reports where applicable</li>
                <li>TODO: Cellar door visitor logs</li>
                <li>TODO: Manual counts or sampling for foot traffic (if used)</li>
              </ul>
              <p className="text-natural-600 dark:text-natural-400 text-sm mt-4">
                No invented systems or exact numbers. Add confirmed sources here when available.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
                Disclaimer
              </h2>
              <p className="text-natural-700 dark:text-natural-300 leading-relaxed">
                This is an estimate. It is not an audited metric. Seasonal and event-driven variation applies. Visitor numbers may fluctuate. Do not treat as a guaranteed or exact figure. For partnership or investment due diligence, request current data directly from Bayview Hub.
              </p>
            </div>

            <div className="pt-8 border-t border-natural-200 dark:border-primary-700">
              <Link
                href="/"
                className="text-primary-600 hover:underline dark:text-primary-400"
              >
                ← Back to Bayview Hub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
