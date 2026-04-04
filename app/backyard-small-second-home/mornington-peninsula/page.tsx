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
    title: `Second Home Builder Mornington Peninsula | Granny Flat Main Ridge | ${SITE_CONFIG.name}`,
    description:
      'Small second dwellings on the Mornington Peninsula: overlays, Green Wedge, bushfire, and coastal context. Bayview Hub is based in Main Ridge.',
    path: '/backyard-small-second-home/mornington-peninsula',
  }),
  title: {
    absolute: 'Second Home Builder Mornington Peninsula | Granny Flat Main Ridge | Bayview Hub',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Bayview Hub',
  description:
    'Small second dwelling design-build on the Mornington Peninsula. Compliant 60sqm SSDs under VC253/VC282.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '365 Purves Road',
    addressLocality: 'Main Ridge',
    addressRegion: 'VIC',
    postalCode: '3928',
    addressCountry: 'AU',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Victoria, Australia' },
    { '@type': 'City', name: 'Mornington Peninsula' },
    { '@type': 'City', name: 'Main Ridge' },
    { '@type': 'City', name: 'Red Hill' },
    { '@type': 'City', name: 'Flinders' },
    { '@type': 'City', name: 'Sorrento' },
    { '@type': 'City', name: 'Portsea' },
  ],
}

const overlays = [
  { label: 'Green Wedge Zone', detail: 'Extra siting and landscape tests — can change pathway.' },
  { label: 'Significant Landscape Overlay (SLO)', detail: 'Can trigger planning even when SSD size is fine.' },
  { label: 'Bushfire Management Overlay (BMO)', detail: 'BAL rating changes design, cost, and construction detail.' },
  { label: 'Heritage Overlay', detail: 'Often means a planning permit even for a small second home.' },
  { label: 'Flood Overlay', detail: 'May need engineering before you can commit to a plan.' },
  { label: 'Plain residential lot (no extra overlays)', detail: 'Often the simplest SSD path when siting and services fit.' },
]

export default function MorningtonPeninsulaPage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <SsdPageHero
        title="Mornington Peninsula — why your block still needs a proper look"
        explainer="State SSD rules are the same across Victoria, but Peninsula lots often carry Shire overlays, bush fire, slope, and services constraints. This page explains what usually changes the path — not tourism copy."
        primaryHref={SSD_LANDING.feasibility}
        primaryLabel="Run the feasibility check"
        secondaryHref="/backyard-small-second-home/victoria-rules"
        secondaryLabel="Understand Victoria rules"
      />

      <section className="border-b border-border bg-natural-50 py-8 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <AnswerCapsule
              definition="Bayview Hub is in Main Ridge. We assess Peninsula sites against Shire overlays and the State SSD tests before suggesting a design route."
              facts={[
                'Green Wedge, SLO, BMO, heritage, and flood layers can each change whether you use Green Lane, VicSmart, or full planning.',
                'We still start from the same 60 sqm / same title / all-electric hard lines.',
              ]}
              sources={[
                { label: 'Mornington Peninsula Shire — Building & Planning', href: 'https://www.mornpen.vic.gov.au/Building-Planning' },
                { label: 'Understand Victoria rules', href: `${baseUrl}/backyard-small-second-home/victoria-rules` },
                { label: 'Run feasibility check', href: `${baseUrl}/backyard-small-second-home/feasibility-check` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdPageShare path="/backyard-small-second-home/mornington-peninsula" className="mt-8" />
            <SsdFunnelNextSteps sentence="Shire officers issue the formal view — we help you prepare realistic questions." />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-muted">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">What is different here</h2>
            <p>
              The Peninsula mixes <strong className="text-fg">rural zoning, steep blocks, bush fire exposure, and
              coastal infrastructure limits</strong>. A compliant SSD on paper can still be expensive to build if the
              driveway, power, or water need upgrading.
            </p>
            <p>
              That does not mean SSD is blocked — it means the <strong className="text-fg">first conversation</strong>{' '}
              should include overlays and services, not only floor area.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-natural-50 py-12 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">Overlay checklist (plain language)</h2>
            <ul className="mt-6 space-y-3">
              {overlays.map(({ label, detail }) => (
                <li
                  key={label}
                  className="rounded-lg border border-border bg-white p-4 dark:bg-surface dark:border-border sm:p-5"
                >
                  <p className="font-medium text-fg">{label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted sm:text-base">{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-base leading-relaxed text-muted">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">Display home</h2>
            <p className="mt-4">
              We keep a compliant small second dwelling on the estate for walk-through by appointment. Useful if you
              have not stood inside a 60 sqm plan before.
            </p>
            <div className="mt-6">
              <Button href="/visit#visit-info" variant="outline" size="lg" className="w-full sm:w-auto">
                Plan a visit — hours &amp; contact
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-natural-50 py-12 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">Peninsula property check</h2>
            <p className="mt-3 text-base text-muted">Use the same feasibility tool — mention Peninsula overlays in your notes.</p>
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
