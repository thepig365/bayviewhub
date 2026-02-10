import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { Button } from '@/components/ui/Button'

export const metadata = genMeta({
  title: `Victoria SSD Rules (VC253/VC282) | Backyard Small Second Home | ${SITE_CONFIG.name}`,
  description:
    'Victorian Small Second Dwelling hard constraints: max 60 sqm GFA, siting behind front wall, all-electric, no subdivision. VC253/VC282 regulatory framework.',
  path: '/backyard-small-second-home/victoria-rules',
})

export default function VictoriaRulesPage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-white dark:bg-primary-900">
      <section className="py-8 bg-natural-50 dark:bg-primary-800/30 border-b border-natural-200 dark:border-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnswerCapsule
              definition="Summary (non-authoritative) of Victorian Small Second Dwelling (SSD) framework. Key constraints — verify via official sources below."
              facts={[
                'Max GFA: 60 sqm (per DTP guidelines). Siting behind front wall. All-electric. No subdivision.',
                'Main dwelling: Retains 25 sqm POS minimum.',
                'Compliant projects may bypass planning permit via Deemed-to-Comply pathway.',
                'TODO: Cite official VIC Planning Amendment source links before treating as authoritative.',
              ]}
              sources={[
                { label: 'DTP SSD Guidelines', href: 'https://www.planning.vic.gov.au/guides-and-resources/guides/small-second-dwellings' },
                { label: 'Backyard Small Second Home Hub', href: `${baseUrl}/backyard-small-second-home` },
                { label: 'Cost & ROI', href: `${baseUrl}/backyard-small-second-home/cost-rent-roi` },
                { label: 'Feasibility Check', href: `${baseUrl}/backyard-small-second-home/feasibility-check` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
          </div>
        </div>
      </section>

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

      <section className="py-16 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-sm text-natural-600 dark:text-natural-400 mb-6">Summary (non-authoritative). Verify via official sources in Evidence below.</p>
            <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
              <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">Maximum GFA: 60 sqm</h3>
              <p className="text-natural-700 dark:text-natural-300">Gross Floor Area cannot exceed 60 square meters per DTP guidelines. No exceptions.</p>
            </div>
            <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
              <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">Siting: Behind Front Wall</h3>
              <p className="text-natural-700 dark:text-natural-300">SSD must be located behind the front wall line of the main dwelling. Front-yard siting disqualifies.</p>
            </div>
            <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
              <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">All-Electric Only</h3>
              <p className="text-natural-700 dark:text-natural-300">No reticulated gas connection. All-electric mandated.</p>
            </div>
            <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
              <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">No Subdivision</h3>
              <p className="text-natural-700 dark:text-natural-300">SSD must remain on the same title as the main dwelling. Subdivision intent disqualifies from the framework.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 border-t border-natural-200 dark:border-primary-700 bg-amber-50/50 dark:bg-amber-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-semibold text-natural-800 dark:text-natural-200 mb-2">TODO — Evidence</h3>
            <p className="text-sm text-natural-600 dark:text-natural-400">Add official VIC Planning / Amendment source links here before treating this summary as authoritative. DTP SSD Guidelines linked above is a starting point.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-4">
            <Button href="/backyard-small-second-home" variant="primary" size="lg">Backyard Small Second Home</Button>
            <Button href="/backyard-small-second-home/victoria-rules" variant="outline" size="lg">Victoria Rules</Button>
            <Button href="/backyard-small-second-home/cost-rent-roi" variant="outline" size="lg">Cost & ROI</Button>
            <Button href="/backyard-small-second-home/feasibility-check" variant="outline" size="lg">Run Feasibility Check</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
