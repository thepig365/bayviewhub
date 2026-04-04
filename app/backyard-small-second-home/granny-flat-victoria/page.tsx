import React from 'react'
import { SITE_CONFIG, SSD_LANDING } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { SsdFunnelNextSteps } from '@/components/ssd/SsdFunnelNextSteps'
import { SsdFunnelReturn } from '@/components/ssd/SsdFunnelReturn'
import { SsdPageHero } from '@/components/ssd/SsdPageHero'
import { SsdPageShare } from '@/components/ssd/SsdPageShare'
import { Button } from '@/components/ui/Button'

export const metadata = {
  ...genMeta({
    title: `Granny Flat Victoria | Small Second Dwelling Builder | Mornington Peninsula | ${SITE_CONFIG.name}`,
    description:
      'If you searched “granny flat Victoria”: it is the same planning idea as a Small Second Dwelling (SSD) — 60 sqm, same title, all-electric. When you qualify, you may skip a planning permit.',
    path: '/backyard-small-second-home/granny-flat-victoria',
  }),
  title: {
    absolute: 'Granny Flat Victoria | Small Second Dwelling | Bayview Hub',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need a planning permit for a granny flat in Victoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Often no, when you meet SSD Deemed-to-Comply tests — for example many lots over 300 sqm without overlays. Heritage, flood, bushfire, or other overlays can still require planning. A building permit is always required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum size for a granny flat in Victoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '60 square metres gross floor area under the SSD framework. There is no larger SSD on the same pathway.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I rent out my granny flat in Victoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — a compliant Small Second Dwelling can be rented. Rental income depends on your market and lease; it is not guaranteed.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the difference between a granny flat and a small second dwelling?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Everyday language vs planning term. “Small second dwelling” (SSD) is the current Victorian planning label for a compliant second home up to 60 sqm on the same lot. People still say “granny flat”.',
      },
    },
  ],
}

export default function GrannyFlatVictoriaPage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SsdPageHero
        title="Granny flat, Victoria — same idea as SSD"
        explainer="If you typed “granny flat”, you are in the right place. Bayview uses the official name Backyard Small Second Home / Small Second Dwelling (SSD). Same rules either way."
        primaryHref={SSD_LANDING.feasibility}
        primaryLabel="Run the feasibility check"
        secondaryHref="/backyard-small-second-home/victoria-rules"
        secondaryLabel="Understand Victoria rules"
      />

      <section className="border-b border-border bg-natural-50 py-8 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <AnswerCapsule
              definition="Since VC253 (2023), many Victorian lots can use the SSD route: up to 60 sqm, same title, all-electric, behind the front wall — overlays can still change the path."
              facts={[
                'Lot size, overlays, and siting decide whether you skip planning or need VicSmart / full planning.',
                'Building permit is always required.',
              ]}
              sources={[
                { label: 'DTP Planning Portal', href: 'https://www.planning.vic.gov.au/' },
                { label: 'Understand Victoria rules', href: `${baseUrl}/backyard-small-second-home/victoria-rules` },
                { label: 'Mornington Peninsula context', href: `${baseUrl}/backyard-small-second-home/mornington-peninsula` },
                { label: 'Run feasibility check', href: `${baseUrl}/backyard-small-second-home/feasibility-check` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdPageShare path="/backyard-small-second-home/granny-flat-victoria" className="mt-8" />
            <SsdFunnelNextSteps sentence="This page translates search language into the official framework — not a certificate for your title." />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">What changed in plain terms</h2>
            <p>
              The State added a route for a <strong className="text-fg">small second home on the same block</strong> as
              the main house. People still say “granny flat”; planners say <strong className="text-fg">Small Second
              Dwelling</strong>. Bayview publishes under <strong className="text-fg">Backyard Small Second Home</strong>{' '}
              so the offer matches how homeowners search.
            </p>
            <p>
              Renting is allowed for a compliant SSD — you are not limited to a dependent relative only. You are still
              limited by size, siting, services, and title rules.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-natural-50 py-12 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">Rules people ask about first</h2>
            <ul className="mt-6 space-y-3 text-base text-muted">
              <li className="flex gap-2">
                <span className="text-fg">•</span>
                <span>Up to 60 sqm gross floor area for the second dwelling.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-fg">•</span>
                <span>Behind the front wall line — not a street-front second house.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-fg">•</span>
                <span>All-electric — no reticulated gas to the second dwelling.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-fg">•</span>
                <span>Stays on the same title — no subdivision of the SSD.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-fg">•</span>
                <span>Main house keeps 25 sqm private open space.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-base leading-relaxed text-muted">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">On the Mornington Peninsula</h2>
            <p className="mt-4">
              Bayview Hub is in Main Ridge. Peninsula lots often pick up Green Wedge, landscape, bushfire, or heritage
              overlays — those can change whether you get a light-touch path or need a full planning application. Read
              the local page next if that is you.
            </p>
            <p className="mt-4">
              <a
                href="/backyard-small-second-home/mornington-peninsula"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                See the Mornington Peninsula context →
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">Check your property</h2>
            <p className="mt-3 text-base text-muted">Interactive pathway logic — about 48 hours if you submit the form.</p>
            <div className="mt-8">
              <Button href={SSD_LANDING.feasibility} variant="accent" size="lg" className="w-full sm:w-auto">
                Run the feasibility check
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SsdFunnelReturn />
    </main>
  )
}
