import React from 'react'
import { SITE_CONFIG, SSD_LANDING } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { SsdFunnelNextSteps } from '@/components/ssd/SsdFunnelNextSteps'
import { SsdFunnelReturn } from '@/components/ssd/SsdFunnelReturn'
import { SsdMidCta } from '@/components/ssd/SsdMidCta'
import { SsdPageHero } from '@/components/ssd/SsdPageHero'

export const metadata = genMeta({
  title: `Victoria SSD Rules (VC253/VC282) | Backyard Small Second Home | ${SITE_CONFIG.name}`,
  description:
    'Victorian Small Second Dwelling hard constraints in plain English: 60 sqm, siting, all-electric, same title. Official sources to verify on your title.',
  path: '/backyard-small-second-home/victoria-rules',
})

export default function VictoriaRulesPage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-bg">
      <SsdPageHero
        title="Victorian SSD rules — plain English"
        explainer="This page lists the main hard lines under VC253/VC282 and points you to official sources. It is not legal advice for your title."
        primaryHref={SSD_LANDING.feasibility}
        primaryLabel="Run the feasibility check"
        secondaryHref={SSD_LANDING.costRoi}
        secondaryLabel="Explore likely costs"
      />

      <section className="border-b border-border bg-natural-50 py-8 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <AnswerCapsule
              definition="Published State rules cap size, siting, and services for a Small Second Dwelling. Your council overlays still matter — confirm against your title."
              facts={[
                '60 sqm GFA maximum; behind the front wall; all-electric; same title; no subdivision.',
                'Main house keeps 25 sqm private open space.',
                'Meeting every Deemed-to-Comply test may mean no planning permit; building permit still required.',
              ]}
              sources={[
                { label: 'DTP Planning Portal', href: 'https://www.planning.vic.gov.au/' },
                { label: 'See the full SSD overview', href: `${baseUrl}/backyard-small-second-home` },
                { label: 'Run feasibility check', href: `${baseUrl}/backyard-small-second-home/feasibility-check` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdFunnelNextSteps sentence="Always verify against current instruments and your title — this page is a summary." />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border sm:p-6">
              <h2 className="font-semibold text-fg">Maximum gross floor area: 60 sqm</h2>
              <p className="mt-2 text-base leading-relaxed text-muted">
                The SSD cap is a hard number in the State framework. There is no SSD pathway for a larger second
                dwelling on the same lot.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border sm:p-6">
              <h2 className="font-semibold text-fg">Siting: behind the front wall</h2>
              <p className="mt-2 text-base leading-relaxed text-muted">
                The second dwelling must sit behind the front wall line of the main house. A street-front second home is
                outside the usual SSD siting model.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border sm:p-6">
              <h2 className="font-semibold text-fg">All-electric</h2>
              <p className="mt-2 text-base leading-relaxed text-muted">
                Reticulated gas to the second dwelling is not allowed under the SSD rules. Plan for all-electric
                services.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border sm:p-6">
              <h2 className="font-semibold text-fg">Same title — no subdivision</h2>
              <p className="mt-2 text-base leading-relaxed text-muted">
                The second dwelling stays on the same title as the main home. If you need to sell it on its own lot, you
                are outside this framework.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SsdMidCta
        intro="Ready to see how these rules interact with your lot?"
        primaryHref={SSD_LANDING.feasibility}
        primaryLabel="Run the feasibility check"
        secondaryHref="/backyard-small-second-home/is-this-for-you"
        secondaryLabel="Find out if this pathway suits you"
      />

      <section className="border-t border-border bg-natural-50 py-10 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-xl font-semibold text-fg">Official sources</h2>
            <p className="mt-2 text-sm text-muted">Use these for authoritative text and updates.</p>
            <ol className="mt-6 list-decimal space-y-2 pl-5 text-base text-muted">
              <li>
                <a
                  href="https://www.planning.vic.gov.au/guides-and-resources/strategies-and-initiatives/small-second-dwellings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-fg"
                >
                  Victorian Planning Authority — Small Second Dwellings
                </a>
              </li>
              <li>
                <a
                  href="https://www.vba.vic.gov.au/consumers/small-second-homes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-fg"
                >
                  Victorian Building Authority — Small Second Homes
                </a>
              </li>
              <li>
                <a
                  href="https://www.planning.vic.gov.au/schemes-and-amendments/amendments/VC253"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-fg"
                >
                  Planning Amendment VC253
                </a>
              </li>
              <li>
                <a
                  href="https://www.planning.vic.gov.au/schemes-and-amendments/amendments/VC282"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-fg"
                >
                  Planning Amendment VC282
                </a>
              </li>
              <li>
                <a
                  href="https://www.mornpen.vic.gov.au/Building-Planning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-fg"
                >
                  Mornington Peninsula Shire — Building &amp; Planning
                </a>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <SsdFunnelReturn />
    </main>
  )
}
