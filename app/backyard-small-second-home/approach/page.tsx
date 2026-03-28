import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { SsdFunnelNextSteps } from '@/components/ssd/SsdFunnelNextSteps'
import { SsdFunnelReturn } from '@/components/ssd/SsdFunnelReturn'

export const metadata = genMeta({
  title: `Why this pathway | Backyard Small Second Home | ${SITE_CONFIG.name}`,
  description:
    'Why Bayview Hub centres Victorian SSD work on compliance and planning clarity: constraints in exchange for a clearer path when your lot fits the framework.',
  path: '/backyard-small-second-home/approach',
})

export default function SsdApproachPage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-natural-50 py-8 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <AnswerCapsule
              definition="Bayview Hub treats the Victorian Small Second Dwelling (SSD) framework as a trade: hard constraints in return for a more predictable route when your site qualifies — not a generic build sales pitch."
              facts={[
                'We prioritise what the rules allow before discussing aesthetics or finishes.',
                'Green Lane and VicSmart are outcomes of compliance, not marketing labels.',
                'Where the framework does not fit, we say so early — standard planning is a different project.',
              ]}
              sources={[
                { label: 'Victoria rules', href: `${baseUrl}/backyard-small-second-home/victoria-rules` },
                { label: 'Backyard Small Second Home hub', href: `${baseUrl}/backyard-small-second-home` },
                { label: 'Feasibility check', href: `${baseUrl}/backyard-small-second-home/feasibility-check` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdFunnelNextSteps sentence="This page explains how we think about the SSD pathway — philosophy, not a checklist." />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-8 font-serif text-4xl font-bold text-fg md:text-5xl">Why this pathway</h1>
            <div className="space-y-6 text-base leading-relaxed text-muted">
              <p>
                Victorian SSD rules are strict: <strong className="text-fg">60 sqm</strong>, behind the front wall,
                all-electric, same title, no subdivision. Those limits are not obstacles to work around in copy — they
                are the reason a compliant project can sometimes move faster than a conventional extension that needs a
                full planning permit.
              </p>
              <p>
                Our role is to be explicit about that trade early. If your goal or your site does not match the
                framework, the honest answer is to use a different process — not to stretch terminology.
              </p>
              <p>
                When the fit is real, the same constraints become useful: they narrow scope, reduce surprises, and
                keep the conversation grounded in what planners and surveyors will actually see on the paperwork.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SsdFunnelReturn />
    </main>
  )
}
