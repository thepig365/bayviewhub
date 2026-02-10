import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { Button } from '@/components/ui/Button'

export const metadata = genMeta({
  title: `SSD Cost, Rent & ROI | ${SITE_CONFIG.name}`,
  description:
    'Indicative cost tiers for Victorian SSDs: Tier 1 compliant & compact, Tier 2 rental-ready, Tier 3 architectural. Victoria rental yield context.',
  path: '/second-home/cost-rent-roi',
})

export default function CostRentRoiPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-primary-900">
      {/* Answer Capsule */}
      <section className="py-8 bg-natural-50 dark:bg-primary-800/30 border-b border-natural-200 dark:border-primary-700">
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
                { label: 'SSD Hub', href: `${SITE_CONFIG.url}/second-home` },
                { label: 'Feasibility Check', href: `${SITE_CONFIG.url}/second-home/feasibility-check` },
              ]}
              lastUpdated="2025-02-10"
            />
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Cost, Rent & ROI
            </h1>
            <p className="text-xl text-natural-600 leading-relaxed dark:text-natural-300">
              Indicative cost tiers for compliant Victorian SSDs. Actual costs depend on site, design, and finishes.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Tiers */}
      <section className="py-16 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Cost Tiers (Indicative)
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <h3 className="font-bold text-natural-900 mb-1 dark:text-natural-50">Tier 1</h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">Compliant & Compact</p>
                <p className="text-natural-700 dark:text-natural-300 text-sm">
                  Practical finishes. Minimal complexity. Budget-optimized. $70k–$135k indicative.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <h3 className="font-bold text-natural-900 mb-1 dark:text-natural-50">Tier 2</h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">Rental-Ready</p>
                <p className="text-natural-700 dark:text-natural-300 text-sm">
                  Better fit-out, durability, thermal comfort. $90k–$169k indicative.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <h3 className="font-bold text-natural-900 mb-1 dark:text-natural-50">Tier 3</h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">Architectural</p>
                <p className="text-natural-700 dark:text-natural-300 text-sm">
                  Higher spec. Complex siteworks. Custom detailing. $122k–$168k indicative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Context */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Rental Yield Context
            </h2>
            <p className="text-natural-700 dark:text-natural-300 mb-6">
              Victoria vacancy under 1%. Compliant SSD equals bankable, recurring income. Quality SSD increases property value — documented, compliant, attractive to buyers.
            </p>
            <p className="text-sm text-natural-500 dark:text-natural-400">
              TODO: cite official rental vacancy or yield data if available.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-4">
            <Button href="/second-home" variant="primary" size="lg">
              SSD Hub
            </Button>
            <Button href="/second-home/feasibility-check" variant="outline" size="lg">
              Run Feasibility Check
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
