import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { SsdFunnelNextSteps } from '@/components/ssd/SsdFunnelNextSteps'
import { SsdFunnelReturn } from '@/components/ssd/SsdFunnelReturn'
import { Button } from '@/components/ui/Button'

export const metadata = genMeta({
  title: `Second Home Builder Mornington Peninsula | Granny Flat Main Ridge | ${SITE_CONFIG.name}`,
  description:
    'Build a small second home on the Mornington Peninsula. Bayview Hub is based in Main Ridge — local knowledge of Shire overlays, Green Wedge zones, and SSD compliance across the Peninsula.',
  path: '/backyard-small-second-home/mornington-peninsula',
})

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
  {
    label: 'Green Wedge Zone',
    detail: 'SSD rules apply with additional siting constraints',
  },
  {
    label: 'Significant Landscape Overlay (SLO)',
    detail: 'May require planning permit',
  },
  {
    label: 'Bushfire Management Overlay (BMO)',
    detail: 'BAL rating affects design and cost',
  },
  {
    label: 'Heritage Overlay',
    detail: 'Planning permit likely required',
  },
  {
    label: 'Flood Overlay',
    detail: 'May require engineering assessment',
  },
  {
    label: 'Standard residential lots without overlays',
    detail: 'Green Lane applies',
  },
]

export default function MorningtonPeninsulaPage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <section className="py-8 bg-natural-50 dark:bg-surface/50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnswerCapsule
              definition="Small second home Mornington Peninsula: Bayview Hub is based in Main Ridge and assesses Peninsula sites against Shire overlays, Green Wedge zones, and VC253/VC282 compliance requirements before recommending a pathway."
              facts={[
                'Green Wedge, SLO, BMO, Heritage, and Flood overlays all affect approval pathway.',
                'Standard residential lots without overlays: Green Lane — no planning permit required.',
                'Display home open at Bayview Estate, Main Ridge — inspect a real 60sqm SSD by appointment.',
                'Sites assessed across all Mornington Peninsula Shire localities.',
              ]}
              sources={[
                { label: 'Mornington Peninsula Shire — Building & Planning', href: 'https://www.mornpen.vic.gov.au/Building-Planning' },
                { label: 'Victoria SSD Rules', href: `${baseUrl}/backyard-small-second-home/victoria-rules` },
                { label: 'Backyard Small Second Home Hub', href: `${baseUrl}/backyard-small-second-home` },
                { label: 'Feasibility Check', href: `${baseUrl}/backyard-small-second-home/feasibility-check` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdFunnelNextSteps sentence="This page covers Mornington Peninsula overlays and local planning context — not a substitute for Shire advice." />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 dark:text-fg">
              Small Second Home — Mornington Peninsula &amp; Main Ridge
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              Local knowledge matters on the Peninsula. Overlays, Green Wedge zones, and coastal proximity all affect what's possible — and how fast.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 — Building on the Peninsula */}
      <section className="py-16 bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-serif font-bold text-natural-900 dark:text-fg">
              Building a Second Home on the Mornington Peninsula
            </h2>
            <p className="text-muted leading-relaxed">
              The Mornington Peninsula has specific planning considerations that affect small second
              dwelling approvals. Green Wedge zones, Significant Landscape Overlays (SLO), and
              coastal proximity can all trigger additional requirements even under the post-VC253
              simplified rules.
            </p>
            <p className="text-muted leading-relaxed">
              Bayview Hub is based at 365 Purves Road, Main Ridge — we understand the Peninsula's
              overlay map and assess every site before recommending a pathway.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Overlay considerations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 dark:text-fg mb-8">
              Peninsula-Specific Overlay Considerations
            </h2>
            <div className="space-y-4">
              {overlays.map(({ label, detail }) => (
                <div
                  key={label}
                  className="p-5 bg-white rounded-xl dark:bg-surface dark:border dark:border-border flex items-start gap-3"
                >
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-bold">→</span>
                  <div>
                    <p className="font-semibold text-natural-900 dark:text-fg">{label}</p>
                    <p className="text-base text-muted mt-0.5">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Display home */}
      <section className="py-16 bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-serif font-bold text-natural-900 dark:text-fg">
              Our Display Home — Visit Before You Commit
            </h2>
            <p className="text-muted leading-relaxed">
              Bayview Estate is home to Victoria's only permanent SSD display home open to the
              public. Located in Main Ridge, 15 minutes from Peninsula Hot Springs and 10 minutes
              from Red Hill — visit by appointment to inspect a real compliant 60sqm small second
              dwelling.
            </p>
            <p className="text-muted leading-relaxed">
              See the materials, the spatial quality, the natural light — before committing to your
              own build.
            </p>
            <div>
              <Button href="/backyard-small-second-home#enquiry" variant="primary" size="lg">
                Book a Site Visit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Areas we serve */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-serif font-bold text-natural-900 dark:text-fg">
              Areas We Serve on the Peninsula
            </h2>
            <p className="text-muted leading-relaxed">
              We assess sites across the Mornington Peninsula Shire including Main Ridge, Red Hill,
              Flinders, Merricks, Balnarring, Somers, Hastings, Rosebud, Rye, Blairgowrie, Sorrento,
              and Portsea. Green Wedge and rural residential lots assessed case by case.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <section className="py-20 bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-natural-900 dark:text-fg mb-4">
              Check My Peninsula Property
            </h2>
            <p className="text-muted mb-8">48-hour feasibility response. No cost.</p>
            <Button href="/backyard-small-second-home/feasibility-check" variant="primary" size="lg">
              Check My Peninsula Property
            </Button>
          </div>
        </div>
      </section>

      <SsdFunnelReturn />
    </main>
  )
}
