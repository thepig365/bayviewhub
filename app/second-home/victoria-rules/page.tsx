import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { Button } from '@/components/ui/Button'

export const metadata = genMeta({
  title: `Victoria SSD Rules (VC253/VC282) | ${SITE_CONFIG.name}`,
  description:
    'Victorian Small Second Dwelling hard constraints: max 60 sqm GFA, siting behind front wall, all-electric, no subdivision. VC253/VC282 regulatory framework.',
  path: '/second-home/victoria-rules',
})

export default function VictoriaRulesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-primary-900">
      {/* Answer Capsule */}
      <section className="py-8 bg-natural-50 dark:bg-primary-800/30 border-b border-natural-200 dark:border-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnswerCapsule
              definition="Victorian Small Second Dwelling (SSD) framework under VC253/VC282. Hard constraints: max 60 sqm GFA, siting behind front wall, all-electric, no subdivision."
              facts={[
                'Max GFA: 60 sqm. No exceptions.',
                'Siting: Must be behind front wall of primary dwelling.',
                'Utilities: All-electric only. No reticulated gas.',
                'Ownership: No subdivision. SSD stays on same title.',
                'Main dwelling: Retains 25 sqm POS minimum.',
                'Compliant projects bypass planning permit via Deemed-to-Comply.',
              ]}
              sources={[
                { label: 'DTP SSD Guidelines', href: 'https://www.planning.vic.gov.au/guides-and-resources/guides/small-second-dwellings' },
                { label: 'SSD Hub', href: `${SITE_CONFIG.url}/second-home` },
                { label: 'Feasibility Check', href: `${SITE_CONFIG.url}/second-home/feasibility-check` },
              ]}
              lastUpdated="2025-02-10"
            />
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Victorian SSD Rules
            </h1>
            <p className="text-xl text-natural-600 leading-relaxed dark:text-natural-300">
              VC253/VC282 define the Small Second Dwelling framework. These are hard constraints — non-negotiable.
            </p>
          </div>
        </div>
      </section>

      {/* Constraints */}
      <section className="py-16 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
              <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">Maximum GFA: 60 sqm</h3>
              <p className="text-natural-700 dark:text-natural-300">
                Gross Floor Area cannot exceed 60 square meters. No exceptions under VC253.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
              <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">Siting: Behind Front Wall</h3>
              <p className="text-natural-700 dark:text-natural-300">
                SSD must be located behind the front wall line of the main dwelling. Front-yard siting disqualifies.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
              <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">All-Electric Only</h3>
              <p className="text-natural-700 dark:text-natural-300">
                No reticulated gas connection. Mandated under VC282.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
              <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">No Subdivision</h3>
              <p className="text-natural-700 dark:text-natural-300">
                SSD must remain on the same title as the main dwelling. Subdivision intent disqualifies from the framework.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TODO note */}
      <section className="py-8 border-t border-natural-200 dark:border-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-natural-500 dark:text-natural-400">
              TODO: cite official VIC planning source for amendment dates and Clause 54.03 specifics.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-4">
            <Button href="/second-home" variant="primary" size="lg">
              SSD Hub
            </Button>
            <Button href="/second-home/feasibility-check" variant="outline" size="lg">
              Run Feasibility Check
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
