import React from 'react'
import { SITE_CONFIG, SSD_LANDING } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { SsdFunnelNextSteps } from '@/components/ssd/SsdFunnelNextSteps'
import { SsdFunnelReturn } from '@/components/ssd/SsdFunnelReturn'
import { SsdPageHero } from '@/components/ssd/SsdPageHero'
import { SsdPageShare } from '@/components/ssd/SsdPageShare'

export const metadata = genMeta({
  title: `Is this for you? | Backyard Small Second Home | ${SITE_CONFIG.name}`,
  description:
    'Does the Victorian Backyard Small Second Home pathway fit your property and goals? Clear match, clear mismatch, and when to use the feasibility check.',
  path: '/backyard-small-second-home/is-this-for-you',
})

export default function SsdAudienceFitPage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-bg">
      <SsdPageHero
        title="Is this pathway for you?"
        explainer="Use this page to sanity-check your goals against the SSD framework before you spend time on design — then run the feasibility check if you sit in the middle."
        primaryHref={SSD_LANDING.feasibility}
        primaryLabel="Run the feasibility check"
        secondaryHref="/backyard-small-second-home/victoria-rules"
        secondaryLabel="Understand Victoria rules"
      />

      <section className="border-b border-border bg-natural-50 py-8 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <AnswerCapsule
              definition="SSD suits homeowners who can live inside hard limits. It does not suit subdividers, front-yard builds, or anyone who needs more than 60 sqm for the second dwelling."
              facts={[
                'Strong match: same-title second home in Victoria, behind front wall, all-electric, ≤60 sqm GFA.',
                'Poor match: sell-off block, >60 sqm second home, gas to the unit, or primary siting in the front yard.',
                'Grey area: overlays and slope — use the feasibility check, not this list alone.',
              ]}
              sources={[
                { label: 'Understand Victoria rules', href: `${baseUrl}/backyard-small-second-home/victoria-rules` },
                { label: 'Mornington Peninsula context', href: `${baseUrl}/backyard-small-second-home/mornington-peninsula` },
                { label: 'Run feasibility check', href: `${baseUrl}/backyard-small-second-home/feasibility-check` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdPageShare path="/backyard-small-second-home/is-this-for-you" className="mt-8" />
            <SsdFunnelNextSteps sentence="This is a screening page — your title and overlays still need a proper check." />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-10">
            <div>
              <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">Usually a strong match</h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-base leading-relaxed text-muted">
                <li>You own (or will own) a Victorian residential lot and will keep the second dwelling on the same title.</li>
                <li>You can place a ≤60 sqm (GFA) all-electric unit behind the front wall of the main house.</li>
                <li>You want clarity on planning pathway before you lock in drawings.</li>
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">Usually a poor match</h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-base leading-relaxed text-muted">
                <li>You need to subdivide and sell the second dwelling on its own lot.</li>
                <li>You need more than 60 sqm gross floor area for that second dwelling.</li>
                <li>You want reticulated gas to the second dwelling or a street-facing second home that breaks siting rules.</li>
              </ul>
            </div>
            <p className="text-base leading-relaxed text-muted">
              Most real sites are not pure black-and-white because of overlays, bush fire, heritage, or slope. If you are
              in that middle band, the feasibility check is the right next step — it is built for pathway logic, not
              inspiration.
            </p>
          </div>
        </div>
      </section>

      <SsdFunnelReturn
        heading="Pick your next step"
        body="Still unsure? Run the interactive check. Want the written rules first? Open the Victoria rules page, then come back."
        primaryLabel="Run the feasibility check"
        secondaryLabel="See the full SSD overview"
      />
    </main>
  )
}
