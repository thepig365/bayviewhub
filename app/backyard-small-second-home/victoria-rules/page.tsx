import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { SsdFunnelNextSteps } from '@/components/ssd/SsdFunnelNextSteps'
import { SsdFunnelReturn } from '@/components/ssd/SsdFunnelReturn'

export const metadata = genMeta({
  title: `Victoria SSD Rules (VC253/VC282) | Backyard Small Second Home | ${SITE_CONFIG.name}`,
  description:
    'Victorian Small Second Dwelling hard constraints: max 60 sqm GFA, siting behind front wall, all-electric, no subdivision. VC253/VC282 regulatory framework.',
  path: '/backyard-small-second-home/victoria-rules',
})

export default function VictoriaRulesPage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-bg">
      <section className="py-8 bg-natural-50 dark:bg-surface/50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnswerCapsule
              definition="Summary — based on VC253 and VC282 as gazetted. Victorian Small Second Dwelling (SSD) framework. Key constraints — verify via official sources below."
              facts={[
                'Max GFA: 60 sqm (per DTP guidelines). Siting behind front wall. All-electric. No subdivision.',
                'Main dwelling: Retains 25 sqm POS minimum.',
                'Compliant projects may bypass planning permit via Deemed-to-Comply pathway.',
              ]}
              sources={[
                { label: 'DTP Planning Portal', href: 'https://www.planning.vic.gov.au/' },
                { label: 'Backyard Small Second Home Hub', href: `${baseUrl}/backyard-small-second-home` },
                { label: 'Cost & ROI', href: `${baseUrl}/backyard-small-second-home/cost-rent-roi` },
                { label: 'Feasibility Check', href: `${baseUrl}/backyard-small-second-home/feasibility-check` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdFunnelNextSteps sentence="This page documents the regulatory hard lines for Victorian SSDs — verify details with official sources." />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 dark:text-fg">
              Victorian SSD Rules
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              VC253/VC282 define the Small Second Dwelling framework. These are hard constraints — non-negotiable.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-base text-muted mb-6">Summary — based on VC253 and VC282 as gazetted. Verify via official sources below.</p>
            <div className="p-6 bg-white rounded-xl dark:bg-surface dark:border dark:border-border">
              <h3 className="font-bold text-natural-900 mb-2 dark:text-fg">Maximum GFA: 60 sqm</h3>
              <p className="text-muted">Gross Floor Area cannot exceed 60 square meters per DTP guidelines. No exceptions.</p>
            </div>
            <div className="p-6 bg-white rounded-xl dark:bg-surface dark:border dark:border-border">
              <h3 className="font-bold text-natural-900 mb-2 dark:text-fg">Siting: Behind Front Wall</h3>
              <p className="text-muted">SSD must be located behind the front wall line of the main dwelling. Front-yard siting disqualifies.</p>
            </div>
            <div className="p-6 bg-white rounded-xl dark:bg-surface dark:border dark:border-border">
              <h3 className="font-bold text-natural-900 mb-2 dark:text-fg">All-Electric Only</h3>
              <p className="text-muted">No reticulated gas connection. All-electric mandated.</p>
            </div>
            <div className="p-6 bg-white rounded-xl dark:bg-surface dark:border dark:border-border">
              <h3 className="font-bold text-natural-900 mb-2 dark:text-fg">No Subdivision</h3>
              <p className="text-muted">SSD must remain on the same title as the main dwelling. Subdivision intent disqualifies from the framework.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 border-t border-border bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-semibold text-fg mb-4">Official Sources &amp; Legislation</h3>
            <ol className="list-decimal list-inside space-y-2 text-base text-muted">
              <li>
                <a href="https://www.planning.vic.gov.au/guides-and-resources/strategies-and-initiatives/small-second-dwellings" target="_blank" rel="noopener noreferrer" className="underline hover:text-fg transition-colors">Victorian Planning Authority — Small Second Dwellings</a>
              </li>
              <li>
                <a href="https://www.vba.vic.gov.au/consumers/small-second-homes" target="_blank" rel="noopener noreferrer" className="underline hover:text-fg transition-colors">Victorian Building Authority — Small Second Homes</a>
              </li>
              <li>
                <a href="https://www.planning.vic.gov.au/schemes-and-amendments/amendments/VC253" target="_blank" rel="noopener noreferrer" className="underline hover:text-fg transition-colors">Planning Amendment VC253 (December 2023)</a>
              </li>
              <li>
                <a href="https://www.planning.vic.gov.au/schemes-and-amendments/amendments/VC282" target="_blank" rel="noopener noreferrer" className="underline hover:text-fg transition-colors">Planning Amendment VC282 (August 2025)</a>
              </li>
              <li>
                <a href="https://www.mornpen.vic.gov.au/Building-Planning" target="_blank" rel="noopener noreferrer" className="underline hover:text-fg transition-colors">Mornington Peninsula Shire — Building &amp; Planning</a>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <SsdFunnelReturn />
    </main>
  )
}
