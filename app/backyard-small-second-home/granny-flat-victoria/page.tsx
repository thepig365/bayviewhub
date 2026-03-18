import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { Button } from '@/components/ui/Button'

export const metadata = genMeta({
  title: `Granny Flat Victoria | Small Second Dwelling Builder | Mornington Peninsula | ${SITE_CONFIG.name}`,
  description:
    'Build a granny flat in Victoria under the new 2024–2026 rules. No planning permit required for most lots over 300sqm. Bayview Hub delivers compliant 60sqm small second dwellings on the Mornington Peninsula and across Victoria.',
  path: '/backyard-small-second-home/granny-flat-victoria',
})

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need a planning permit for a granny flat in Victoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In most cases, no. Under Amendment VC253 (December 2023), granny flats up to 60sqm on lots over 300sqm no longer require a planning permit, provided there are no flooding, heritage, or environmental overlays. A building permit is always required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum size for a granny flat in Victoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '60 square metres gross floor area. This is a hard limit under VC253/VC282. There are no exceptions within the Deemed-to-Comply pathway.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I rent out my granny flat in Victoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Under the new rules, small second dwellings can be rented to anyone — not just family members. Victoria's rental vacancy rate is under 1%, making compliant SSDs a strong rental yield asset.",
      },
    },
    {
      '@type': 'Question',
      name: "What's the difference between a granny flat and a small second dwelling?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They refer to the same thing. "Small second dwelling" is the current official Victorian planning term. "Granny flat" is the common name. Both describe a self-contained dwelling of up to 60sqm on the same lot as an existing home.',
      },
    },
  ],
}

export default function GrannyFlatVictoriaPage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-white dark:bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-8 bg-natural-50 dark:bg-surface/50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnswerCapsule
              definition="Granny flat Victoria: Victorian Small Second Dwelling (SSD) rules — no planning permit required on most lots over 300sqm under Amendment VC253 (December 2023). 60sqm max. All-electric. Building permit always required."
              facts={[
                'No planning permit needed on most lots over 300sqm (VC253, December 2023).',
                'Maximum size: 60sqm gross floor area. Hard limit — no exceptions.',
                'All-electric only. No gas connection permitted.',
                'Cannot be subdivided or sold separately from the main dwelling.',
                'Building permit always required. Typically 2–4 weeks once documentation is complete.',
              ]}
              sources={[
                { label: 'DTP Planning Portal', href: 'https://www.planning.vic.gov.au/' },
                { label: 'Victoria SSD Rules', href: `${baseUrl}/backyard-small-second-home/victoria-rules` },
                { label: 'Backyard Small Second Home Hub', href: `${baseUrl}/backyard-small-second-home` },
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 dark:text-fg">
              Granny Flat Victoria — No Planning Permit. 60sqm. Compliant.
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              Victoria's granny flat rules changed in December 2023. Most lots over 300sqm can now proceed straight to a building permit — no council planning approval needed.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 — Rule change */}
      <section className="py-16 bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-serif font-bold text-natural-900 dark:text-fg">
              Victoria's Granny Flat Rules Changed in 2023
            </h2>
            <p className="text-muted leading-relaxed">
              In December 2023, the Victorian Government's Amendment VC253 removed the planning permit
              requirement for most granny flats under 60 square metres. If your property is over
              300sqm and has no flooding or environmental overlays, you can proceed directly to a
              building permit — no council planning approval needed.
            </p>
            <p className="text-muted leading-relaxed">
              What used to be called a Dependent Person's Unit (DPU) is now called a Small Second
              Dwelling (SSD). The key difference: anyone can live in it — not just dependent family
              members. You can rent it to anyone.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Key rules */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 dark:text-fg mb-8">
              Key Rules for Granny Flats in Victoria (2026)
            </h2>
            <div className="space-y-4">
              {[
                'Maximum size: 60 sqm gross floor area',
                'Must be located behind the front wall of the main dwelling',
                'All-electric only — no gas connection permitted',
                'Cannot be subdivided or sold separately',
                'Main dwelling must retain 25 sqm private open space',
                'Building permit always required',
                'Planning permit NOT required on most lots over 300sqm',
              ].map((rule) => (
                <div
                  key={rule}
                  className="p-5 bg-white rounded-xl dark:bg-surface dark:border dark:border-border flex items-start gap-3"
                >
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-bold">✓</span>
                  <p className="text-natural-900 dark:text-fg">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Mornington Peninsula */}
      <section className="py-16 bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-serif font-bold text-natural-900 dark:text-fg">
              Granny Flat Builders on the Mornington Peninsula
            </h2>
            <p className="text-muted leading-relaxed">
              Bayview Hub is based in Main Ridge, Mornington Peninsula. We assess your specific site
              against Mornington Peninsula Shire requirements and Victorian planning overlays before
              recommending a design pathway.
            </p>
            <p className="text-muted leading-relaxed">
              Our on-site SSD display home at Bayview Estate lets you walk through a real compliant
              60sqm dwelling before committing to your build.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-natural-900 dark:text-fg mb-4">
              Check If Your Property Qualifies
            </h2>
            <p className="text-muted mb-8">48-hour feasibility response. No cost.</p>
            <Button href="/backyard-small-second-home/feasibility-check" variant="primary" size="lg">
              Start Feasibility Check
            </Button>
          </div>
        </div>
      </section>

      {/* Section 5 — Internal nav */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-4">
            <Button href="/backyard-small-second-home" variant="primary" size="lg">
              Backyard Small Second Home
            </Button>
            <Button href="/backyard-small-second-home/victoria-rules" variant="outline" size="lg">
              Victoria Rules
            </Button>
            <Button href="/backyard-small-second-home/cost-rent-roi" variant="outline" size="lg">
              Cost &amp; ROI
            </Button>
            <Button href="/backyard-small-second-home/feasibility-check" variant="outline" size="lg">
              Feasibility Check
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
