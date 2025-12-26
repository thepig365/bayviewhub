import React from 'react'
import { Button } from '@/components/ui/Button'
import { TrendingUp, Users, Target, Award } from 'lucide-react'

export default function InvestPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent-50 via-primary-50 to-natural-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-natural-900 mb-6">
              Invest in Bayview Hub
            </h1>
            <p className="text-xl text-natural-700 mb-8 leading-relaxed">
              Support the expansion of a proven destination hub into arts, wellbeing, and sustainable food systems
            </p>
            <Button variant="primary" size="lg" href="#contact">
              Request Investment Information
            </Button>
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-8 text-center">
              The Opportunity
            </h2>
            <div className="prose prose-lg max-w-none text-natural-700 space-y-4">
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
                With 50k+ annual visitors and proven hospitality operations, we're positioned to scale into high-margin experiential offerings while maintaining our destination appeal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 bg-natural-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-natural-900 mb-12 text-center">
            By The Numbers
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-natural-900 mb-2">50k+</div>
              <div className="text-natural-600">Annual Visitors</div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-natural-900 mb-2">7</div>
              <div className="text-natural-600">Revenue Streams</div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <Target className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-natural-900 mb-2">45min</div>
              <div className="text-natural-600">From Sydney CBD</div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-natural-900 mb-2">Est.</div>
              <div className="text-natural-600">Established Brand</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use of Funds */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-12 text-center">
              Use of Funds
            </h2>
            <div className="space-y-6">
              <div className="bg-primary-50 rounded-xl p-6 border-l-4 border-primary-600">
                <h3 className="text-xl font-bold text-natural-900 mb-2">
                  Arts Gallery & Studio
                </h3>
                <p className="text-natural-700">
                  Gallery fit-out, exhibition systems, and founding curator recruitment
                </p>
              </div>
              <div className="bg-primary-50 rounded-xl p-6 border-l-4 border-primary-600">
                <h3 className="text-xl font-bold text-natural-900 mb-2">
                  Wellbeing Programs
                </h3>
                <p className="text-natural-700">
                  Workshop space, materials inventory, and program lead recruitment
                </p>
              </div>
              <div className="bg-primary-50 rounded-xl p-6 border-l-4 border-primary-600">
                <h3 className="text-xl font-bold text-natural-900 mb-2">
                  Edible Gardens Infrastructure
                </h3>
                <p className="text-natural-700">
                  Growing systems, irrigation, packing facility, and operations lead
                </p>
              </div>
              <div className="bg-primary-50 rounded-xl p-6 border-l-4 border-primary-600">
                <h3 className="text-xl font-bold text-natural-900 mb-2">
                  Marketing & Launch
                </h3>
                <p className="text-natural-700">
                  Campaign for new verticals, member acquisition, and brand development
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Structure */}
      <section className="py-20 bg-natural-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-8">
              Investment Structure
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
              <p className="text-lg text-natural-700 leading-relaxed mb-6">
                We're offering equity and revenue-sharing structures for strategic investors who align with our vision of creating sustainable, community-focused destination experiences.
              </p>
              <p className="text-natural-600">
                Investor decks, financial projections, and detailed business plans available upon request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-natural-900 mb-6">
              Let's Talk
            </h2>
            <p className="text-xl text-natural-700 mb-8">
              Request our investor deck and schedule a site visit
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="text"
                  placeholder="Organization (Optional)"
                  className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500"
                />
                <textarea
                  placeholder="Tell us about your investment interests"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-natural-300 focus:ring-2 focus:ring-primary-500"
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

