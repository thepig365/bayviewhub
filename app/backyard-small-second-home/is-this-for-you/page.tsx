import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { SsdFunnelNextSteps } from '@/components/ssd/SsdFunnelNextSteps'
import { SsdFunnelReturn } from '@/components/ssd/SsdFunnelReturn'

export const metadata = genMeta({
  title: `Is this for you? | Backyard Small Second Home | ${SITE_CONFIG.name}`,
  description:
    'Who the Victorian Backyard Small Second Home pathway suits: homeowners on eligible Victorian lots seeking compliance-first clarity — and who should consider other routes.',
  path: '/backyard-small-second-home/is-this-for-you',
})

export default function SsdAudienceFitPage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-natural-50 py-8 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <AnswerCapsule
              definition="This page is a fit check: the Victorian SSD framework is for homeowners who can accept hard limits in return for a clearer route — not for subdividers, front-yard builds, or projects above 60 sqm GFA."
              facts={[
                'Strong fit: Victorian residential lot, same-title second dwelling, compliance-first mindset.',
                'Poor fit: subdivision for sale, more than 60 sqm, gas reticulation expectation, front-yard primary siting.',
                'Uncertain fit: overlays (heritage, flood, bushfire) — use the feasibility check for pathway logic.',
              ]}
              sources={[
                { label: 'Victoria rules', href: `${baseUrl}/backyard-small-second-home/victoria-rules` },
                { label: 'Mornington Peninsula context', href: `${baseUrl}/backyard-small-second-home/mornington-peninsula` },
                { label: 'Feasibility check', href: `${baseUrl}/backyard-small-second-home/feasibility-check` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdFunnelNextSteps sentence="This page clarifies audience fit — not legal advice for your specific title." />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-8 font-serif text-4xl font-bold text-fg md:text-5xl">Is this for you?</h1>
            <div className="space-y-8">
              <div>
                <h2 className="mb-3 font-serif text-xl font-semibold text-fg">Usually a strong fit</h2>
                <ul className="list-inside list-disc space-y-2 text-base leading-relaxed text-muted">
                  <li>You own or are buying a residential lot in Victoria and can keep a second dwelling on the same title.</li>
                  <li>You want a compact, all-electric second home (up to 60 sqm GFA under the SSD rules) and can place it behind the front wall line.</li>
                  <li>You prefer clarity on planning pathway before locking in design details.</li>
                </ul>
              </div>
              <div>
                <h2 className="mb-3 font-serif text-xl font-semibold text-fg">Usually not the right framework</h2>
                <ul className="list-inside list-disc space-y-2 text-base leading-relaxed text-muted">
                  <li>You need to subdivide and sell the second dwelling separately.</li>
                  <li>You need more than 60 sqm gross floor area for the second dwelling.</li>
                  <li>You expect reticulated gas or a front-yard “street face” second home that breaks siting rules.</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed text-muted">
                Many real sites sit between those poles because of overlays or siting nuance. The feasibility check is
                the right tool when you already know the basics and want structured pathway logic.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SsdFunnelReturn />
    </main>
  )
}
