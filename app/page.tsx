import React from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { EXPERIENCES, FOUNDING_ROLES, SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata = genMeta({
  title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  path: '/',
})

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-natural-50 to-accent-50 py-20 md:py-32 dark:from-primary-900 dark:via-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Eat, Stay, Connect, Create, Mend
            </h1>
            <p className="text-xl md:text-2xl text-natural-700 mb-10 leading-relaxed dark:text-natural-200">
              A destination hub with winery dining, accommodation, art spaces, wellbeing programs, and edible gardens.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/partners" variant="primary" size="lg">
                Become a Partner
              </Button>
              <Button href="/gardens#subscribe" variant="secondary" size="lg">
                Subscribe Gardens
              </Button>
              <Button href="/second-home#register" variant="accent" size="lg">
                Build Second Home
              </Button>
              <Button href="/workshops" variant="primary" size="lg">
                Book Workshops
              </Button>
              <Button href="/events" variant="outline" size="lg">
                What's On
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Bar */}
      <section className="bg-white py-12 border-y border-natural-200 dark:bg-primary-900 dark:border-primary-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-700 mb-2">50k+</div>
              <div className="text-sm text-natural-600">Annual Footfall</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-700 mb-2">🍷</div>
              <div className="text-sm text-natural-600">Winery Restaurant</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-700 mb-2">🎵</div>
              <div className="text-sm text-natural-600">Live Music Weekends</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-700 mb-2">🌏</div>
              <div className="text-sm text-natural-600">International Destination</div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-20 bg-natural-50 dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
              Experiences at Bayview Hub
            </h2>
            <p className="text-lg text-natural-600 max-w-2xl mx-auto dark:text-natural-200">
              Discover our expanding collection of dining, arts, music, and nature experiences
            </p>
          </div>

          {/* New Additions */}
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-natural-800 mb-6">
              New Additions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {EXPERIENCES.new.map((exp) => (
                <Card
                  key={exp.id}
                  title={exp.title}
                  description={exp.blurb}
                  image={exp.image}
                  cta={exp.cta}
                  variant="highlight"
                />
              ))}
            </div>
          </div>

          {/* Core Anchors */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-natural-800 mb-6">
              Our Foundations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {EXPERIENCES.core.map((exp) => (
                <Card
                  key={exp.id}
                  title={exp.title}
                  description={exp.blurb}
                  image={exp.image}
                  cta={exp.cta}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Now Building - Recruitment */}
      <section className="py-20 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-primary-800 dark:to-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              We're building the next chapter of Bayview Hub
            </h2>
            <p className="text-lg text-natural-600 max-w-2xl mx-auto dark:text-natural-200">
              We're seeking founding leaders to establish our Gallery, Art Programs, and Edible Gardens operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {FOUNDING_ROLES.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow dark:bg-primary-900/60 dark:border dark:border-primary-700"
              >
                <h3 className="text-xl font-serif font-bold text-natural-900 mb-4">
                  {role.title}
                </h3>
                <p className="text-natural-600 mb-6 leading-relaxed">
                  {role.summary}
                </p>
                <ul className="space-y-2 mb-6">
                  {role.responsibilities.slice(0, 3).map((resp, idx) => (
                    <li key={idx} className="flex items-start text-sm text-natural-600">
                      <span className="text-primary-600 mr-2">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
                <Button href={`/partners/${role.id}`} variant="accent" size="sm" className="w-full">
                  View Role
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button href="/partners" variant="primary" size="lg">
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
                Stay Connected with Bayview Hub
              </h2>
              <p className="text-natural-600 dark:text-natural-200">
                Get updates tailored to your interests
              </p>
            </div>
            <div className="bg-natural-50 rounded-2xl p-8 dark:bg-primary-800/30 dark:border dark:border-primary-700">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

