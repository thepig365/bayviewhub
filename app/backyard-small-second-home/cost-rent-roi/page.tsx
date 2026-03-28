import React from 'react'
import Link from 'next/link'
import { SITE_CONFIG, SSD_LANDING } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { SsdFunnelNextSteps } from '@/components/ssd/SsdFunnelNextSteps'
import { SsdFunnelReturn } from '@/components/ssd/SsdFunnelReturn'
import { SsdPageHero } from '@/components/ssd/SsdPageHero'
import { SsdPageShare } from '@/components/ssd/SsdPageShare'

export const metadata = genMeta({
  title: `SSD Cost, Rent & ROI | Backyard Small Second Home | ${SITE_CONFIG.name}`,
  description:
    'Indicative Victorian SSD build cost bands and what moves the price. Rental demand context without investment hype.',
  path: '/backyard-small-second-home/cost-rent-roi',
})

export default function CostRentRoiPage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-bg">
      <SsdPageHero
        title="Cost, rent, and value — what actually moves the number"
        explainer="Indicative build bands only. Your quote depends on site, structure, bushfire rating, services, and finishes — use this page to understand drivers, not to budget to the dollar."
        primaryHref={SSD_LANDING.feasibility}
        primaryLabel="Run the feasibility check"
        secondaryHref="/backyard-small-second-home/victoria-rules"
        secondaryLabel="Understand Victoria rules"
      />

      <section className="border-b border-border bg-natural-50 py-8 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <AnswerCapsule
              definition="We publish broad tiers so you can tell a $90k problem from a $160k problem before you obsess over tapware."
              facts={[
                'Tier 1 — compact compliant build: about $70k–$135k indicative.',
                'Tier 2 — rental-ready durability: about $90k–$169k indicative.',
                'Tier 3 — higher spec / harder site: about $122k–$168k indicative.',
              ]}
              sources={[
                { label: 'See the full SSD overview', href: `${baseUrl}/backyard-small-second-home` },
                { label: 'Understand Victoria rules', href: `${baseUrl}/backyard-small-second-home/victoria-rules` },
                { label: 'Run feasibility check', href: `${baseUrl}/backyard-small-second-home/feasibility-check` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdPageShare path="/backyard-small-second-home/cost-rent-roi" className="mt-8" />
            <SsdFunnelNextSteps sentence="Figures are indicative — your surveyor and builder firm up numbers." />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Named house-type imagery and a typical floor plan sit on the{' '}
              <Link href="/backyard-small-second-home#ssd-house-archetypes" className="font-medium text-accent underline-offset-4 hover:underline">
                main SSD overview
              </Link>
              — this page stays focused on cost drivers and tiers below.
            </p>
          </div>
        </div>
      </section>

      <section id="indicative-cost-tiers" className="scroll-mt-24 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-xl font-bold text-fg md:text-2xl">Indicative cost tiers</h2>
            <p className="mt-3 text-base text-muted">
              Same 60 sqm cap — different structural and fit-out choices change the total.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border">
                <h3 className="font-semibold text-fg">Tier 1</h3>
                <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">Compact compliant</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Simple footprint, modest finishes, easier site. Rough band $70k–$135k.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border">
                <h3 className="font-semibold text-fg">Tier 2</h3>
                <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">Rental-ready</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Better thermal performance, harder-wearing materials. Rough band $90k–$169k.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border sm:col-span-2 lg:col-span-1">
                <h3 className="font-semibold text-fg">Tier 3</h3>
                <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">Higher spec / harder site</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Steeper slope, retaining, or higher-end architecture. Rough band $122k–$168k.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-natural-50 py-12 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-xl font-bold text-fg md:text-2xl">Rent and longer-term value</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Rental demand on the Peninsula and in greater Victoria has been tight in recent years — but vacancy and
              rent move with the cycle. Treat rent as a <strong className="text-fg">possible benefit</strong>, not a
              promise.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              For many owners the value is mixed: family flexibility, a separate workspace, and sometimes income — plus
              how a documented, compliant second dwelling affects resale compared with an unapproved structure.
            </p>
          </div>
        </div>
      </section>

      <SsdFunnelReturn />
    </main>
  )
}
