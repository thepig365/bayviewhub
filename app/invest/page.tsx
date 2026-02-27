import React from 'react'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { TrendingUp, Users, Target, Award } from 'lucide-react'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: 'Invest',
  description:
    'Explore Bayview Hub investment opportunities across hospitality, arts, events, and edible gardens with scalable destination-led growth.',
  path: '/invest',
})

export default function InvestPage() {
  return (
    <div className="min-h-screen dark:bg-bg">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent-50 via-primary-50 to-natural-50 py-20 dark:from-primary-900 dark:via-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-fg mb-6 ">
              Invest in Bayview Hub
            </h1>
            <p className="text-xl text-muted mb-8 leading-relaxed ">
              Support the expansion of a proven destination hub into arts, wellbeing, and sustainable food systems
            </p>
            <Button variant="primary" size="lg" href="#contact">
              Request Investment Information
            </Button>
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="py-20 bg-white dark:bg-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-fg mb-8 text-center ">
              The Opportunity
            </h2>
            <div className="prose prose-lg max-w-none text-muted space-y-4  dark:prose-invert">
              <p>
                Bayview Hub is expanding from a successful winery restaurant and live music venue into a comprehensive destination hub encompassing:
              </p>
              <ul className="space-y-2">
                <li>Curated arts gallery with sales operations</li>
                <li>Art therapy and expressive arts programs</li>
                <li>Edible gardens subscription service</li>
                <li>Enhanced event spaces and accommodation</li>
              </ul>
              <p>
                With 50k+ annual visitors (details available on request) and proven hospitality operations, we&apos;re positioned to scale into high-margin experiential offerings while maintaining our destination appeal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 bg-natural-50 dark:bg-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-fg mb-12 text-center ">
            By The Numbers
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg dark:bg-surface/60 dark:border dark:border-border">
              <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-fg mb-2 ">50k+</div>
              <div className="text-muted">Annual visitors (details available on request)</div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg dark:bg-surface/60 dark:border dark:border-border">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-fg mb-2 ">7</div>
              <div className="text-muted">Revenue Streams</div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg dark:bg-surface/60 dark:border dark:border-border">
              <Target className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-fg mb-2 ">45min</div>
              <div className="text-muted">From Sydney CBD</div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg dark:bg-surface/60 dark:border dark:border-border">
              <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-fg mb-2 ">Est.</div>
              <div className="text-muted">Established Brand</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use of Funds */}
      <section className="py-20 bg-white dark:bg-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-fg mb-12 text-center ">
              Use of Funds
            </h2>
            <div className="space-y-6">
              <div className="bg-primary-50 rounded-xl p-6 border-l-4 border-primary-600 dark:bg-surface/50 dark:border-primary-300">
                <h3 className="text-xl font-bold text-fg mb-2 ">
                  Arts Gallery & Studio
                </h3>
                <p className="text-muted">
                  Gallery fit-out, exhibition systems, and founding curator recruitment
                </p>
              </div>
              <div className="bg-primary-50 rounded-xl p-6 border-l-4 border-primary-600 dark:bg-surface/50 dark:border-primary-300">
                <h3 className="text-xl font-bold text-fg mb-2 ">
                  Wellbeing Programs
                </h3>
                <p className="text-muted">
                  Workshop space, materials inventory, and program lead recruitment
                </p>
              </div>
              <div className="bg-primary-50 rounded-xl p-6 border-l-4 border-primary-600 dark:bg-surface/50 dark:border-primary-300">
                <h3 className="text-xl font-bold text-fg mb-2 ">
                  Edible Gardens Infrastructure
                </h3>
                <p className="text-muted">
                  Growing systems, irrigation, packing facility, and operations lead
                </p>
              </div>
              <div className="bg-primary-50 rounded-xl p-6 border-l-4 border-primary-600 dark:bg-surface/50 dark:border-primary-300">
                <h3 className="text-xl font-bold text-fg mb-2 ">
                  Marketing & Launch
                </h3>
                <p className="text-muted">
                  Campaign for new verticals, member acquisition, and brand development
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Structure */}
      <section className="py-20 bg-natural-50 dark:bg-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-fg mb-8 ">
              Investment Structure
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 dark:bg-surface/60 dark:border dark:border-border">
              <p className="text-lg text-muted leading-relaxed mb-6 ">
                We're offering equity and revenue-sharing structures for strategic investors who align with our vision of creating sustainable, community-focused destination experiences.
              </p>
              <p className="text-muted">
                Investor decks, financial projections, and detailed business plans available upon request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-fg mb-6 ">
              Let's Talk
            </h2>
            <p className="text-xl text-muted mb-8 ">
              Request our investor deck and schedule a site visit
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-xl dark:bg-surface/60 dark:border dark:border-border">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-fg placeholder:text-muted focus:ring-2 focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:text-fg dark:placeholder:text-muted dark:focus:ring-primary-300"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-fg placeholder:text-muted focus:ring-2 focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:text-fg dark:placeholder:text-muted dark:focus:ring-primary-300"
                />
                <input
                  type="text"
                  placeholder="Organization (Optional)"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-fg placeholder:text-muted focus:ring-2 focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:text-fg dark:placeholder:text-muted dark:focus:ring-primary-300"
                />
                <textarea
                  placeholder="Tell us about your investment interests"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-fg placeholder:text-muted focus:ring-2 focus:ring-primary-500 dark:border-border dark:bg-surface/40 dark:text-fg dark:placeholder:text-muted dark:focus:ring-primary-300"
                />
                <Button variant="primary" size="lg" className="w-full">
                  Request Information
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

