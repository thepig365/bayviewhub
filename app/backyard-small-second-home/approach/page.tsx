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
  title: `Why this pathway | Backyard Small Second Home | ${SITE_CONFIG.name}`,
  description:
    'Why Bayview Hub leads with Victorian SSD rules and planning clarity: ordinary reasons people want a second small building, and why constraints can make the process more predictable.',
  path: '/backyard-small-second-home/approach',
})

export default function SsdApproachPage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-bg">
      <SsdPageHero
        title="Why this pathway exists"
        explainer="Here we explain how we think about the Victorian SSD route — practical reasons people use it, and why we talk about rules before floor plans."
        primaryHref={SSD_LANDING.feasibility}
        primaryLabel="Run the feasibility check"
        secondaryHref={SSD_LANDING.overview}
        secondaryLabel="See the full SSD overview"
      />

      <section className="border-b border-border bg-natural-50 py-8 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <AnswerCapsule
              definition="We treat SSD as a planning pathway first: narrow rules, predictable paperwork when you qualify — not a generic ‘lifestyle build’ sale."
              facts={[
                'We check what the framework allows before discussing finishes or style.',
                'If your goal breaks a hard rule (size, title, siting, gas), we point you to the right non-SSD process.',
              ]}
              sources={[
                { label: 'Understand Victoria rules', href: `${baseUrl}/backyard-small-second-home/victoria-rules` },
                { label: 'See the full SSD overview', href: `${baseUrl}/backyard-small-second-home` },
                { label: 'Run feasibility check', href: `${baseUrl}/backyard-small-second-home/feasibility-check` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdFunnelNextSteps sentence="This page is context only — not a site-specific legal or planning opinion." />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted">
            <p>
              Many households want a <strong className="text-fg">separate small building</strong> for plain reasons: a
              parent who needs to be close but not in the spare room, a young adult who needs a door that closes, a work
              room that is not the kitchen table, or a rentable unit that stays on the same title. Those situations are
              normal. The SSD framework is simply the <strong className="text-fg">State-written box</strong> that says
              when a second small home can use a lighter planning route.
            </p>
            <p>
              Victorian rules fix the size (60 sqm GFA cap), where it can sit (behind the front wall), how it is
              serviced (all-electric), and that it <strong className="text-fg">stays on your title</strong>. Those
              limits are frustrating if you wanted something else — and useful if you can work inside them, because they
              are the same tests a council officer or surveyor will use.
            </p>
            <p>
              Our job is to be blunt about that trade early. When the fit is real, the conversation stays on what you can
              actually lodge. When it is not, you save time by switching to standard planning or a smaller brief.
            </p>
          </div>
        </div>
      </section>

      <SsdMidCta
        intro="If you are unsure whether your situation fits, use the fit page or go straight to the interactive check."
        primaryHref="/backyard-small-second-home/is-this-for-you"
        primaryLabel="Find out if this pathway suits you"
        secondaryHref={SSD_LANDING.feasibility}
        secondaryLabel="Run the feasibility check"
      />

      <SsdFunnelReturn
        heading="Next step"
        body="When you are ready to translate this into your lot, run the feasibility check. For the short hub summary, use the overview."
        primaryLabel="Run the feasibility check"
        secondaryLabel="See the full SSD overview"
      />
    </main>
  )
}
