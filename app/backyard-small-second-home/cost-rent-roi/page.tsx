import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { Button } from '@/components/ui/Button'

export const metadata = genMeta({
  title: `SSD Cost, Rent & ROI | Backyard Small Second Home | ${SITE_CONFIG.name}`,
  description:
    'Indicative cost tiers for Victorian SSDs: Tier 1 compliant & compact, Tier 2 rental-ready, Tier 3 architectural. Victoria rental yield context.',
  path: '/backyard-small-second-home/cost-rent-roi',
})

export default function CostRentRoiPage() {
  const baseUrl = SITE_CONFIG.url
  return (
    <main className="min-h-screen bg-bg">
      <section className="py-8 bg-natural-50 dark:bg-surface/50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnswerCapsule
              definition="Indicative cost tiers for compliant Victorian SSDs. Victoria vacancy under 1% — compliant SSD equals bankable, recurring rental income."
              facts={[
                'Tier 1: Compliant & compact. Budget-optimized. $70k–$135k indicative.',
                'Tier 2: Rental-ready. Better fit-out, durability. $90k–$169k indicative.',
                'Tier 3: Architectural. Higher spec, complex siteworks. $122k–$168k indicative.',
                'Victoria rental demand: sub-1% vacancy. Compliant SSD = bankable yield.',
                'Building permit typically 2–4 weeks once documentation complete.',
              ]}
              sources={[
                { label: 'Backyard Small Second Home Hub', href: `${baseUrl}/backyard-small-second-home` },
                { label: 'Victoria Rules', href: `${baseUrl}/backyard-small-second-home/victoria-rules` },
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-fg mb-8 ">Cost, Rent & ROI</h1>
            <p className="text-xl text-muted leading-relaxed">Indicative cost tiers for compliant Victorian SSDs. Actual costs depend on site, design, and finishes.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-natural-50 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-8 ">Cost Tiers (Indicative)</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl dark:bg-surface dark:border dark:border-border">
                <h3 className="font-bold text-fg mb-1 ">Tier 1</h3>
                <p className="text-base text-primary-600 dark:text-primary-400 mb-2">Compliant & Compact</p>
                <p className="text-muted text-base">Practical finishes. Minimal complexity. Budget-optimized. $70k–$135k indicative.</p>
              </div>
              <div className="p-6 bg-white rounded-xl dark:bg-surface dark:border dark:border-border">
                <h3 className="font-bold text-fg mb-1 ">Tier 2</h3>
                <p className="text-base text-primary-600 dark:text-primary-400 mb-2">Rental-Ready</p>
                <p className="text-muted text-base">Better fit-out, durability, thermal comfort. $90k–$169k indicative.</p>
              </div>
              <div className="p-6 bg-white rounded-xl dark:bg-surface dark:border dark:border-border">
                <h3 className="font-bold text-fg mb-1 ">Tier 3</h3>
                <p className="text-base text-primary-600 dark:text-primary-400 mb-2">Architectural</p>
                <p className="text-muted text-base">Higher spec. Complex siteworks. Custom detailing. $122k–$168k indicative.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-8 ">Rental Yield Context</h2>
            <p className="text-muted mb-6">Victoria vacancy under 1%. Compliant SSD equals bankable, recurring income. Quality SSD increases property value — documented, compliant, attractive to buyers.</p>
            <p className="text-base text-subtle">TODO: cite official rental vacancy or yield data if available.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-4">
            <Button href="/backyard-small-second-home" variant="primary" size="lg">Backyard Small Second Home</Button>
            <Button href="/backyard-small-second-home/victoria-rules" variant="outline" size="lg">Victoria Rules</Button>
            <Button href="/backyard-small-second-home/feasibility-check" variant="outline" size="lg">Run Feasibility Check</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
