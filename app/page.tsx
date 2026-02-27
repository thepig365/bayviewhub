import React from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { PrelaunchButton } from '@/components/ui/PrelaunchButton'
import { EXPERIENCES, FOUNDING_ROLES, SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata = genMeta({
  title: 'Bayview Hub | Winery, Arts, Events & Edible Gardens',
  description:
    'Discover Bayview Hub on the Mornington Peninsula: winery dining, cellar door tastings, arts experiences, events, edible gardens, and founding partner opportunities.',
  path: '/',
})

export default function HomePage() {
  const featuredExperienceIds = ['gardens', 'gallery', 'workshops', 'cellar'] as const

  const allExperiences = [...EXPERIENCES.new, ...EXPERIENCES.core]
  const featuredExperiences = featuredExperienceIds
    .map((id) => allExperiences.find((exp) => exp.id === id))
    .filter(Boolean)

  const remainingNewExperiences = EXPERIENCES.new.filter(
    (exp) => !featuredExperienceIds.includes(exp.id as (typeof featuredExperienceIds)[number])
  )
  const remainingCoreExperiences = EXPERIENCES.core.filter(
    (exp) => !featuredExperienceIds.includes(exp.id as (typeof featuredExperienceIds)[number])
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-bg py-20 md:py-32 dark:bg-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-extrabold text-fg mb-6 drop-shadow-sm">
              Eat, Stay, Connect, Create, Mend
            </h1>
            <p className="text-lg md:text-xl text-fg mb-10 leading-loose max-w-3xl mx-auto">
              Bayview Hub is the visitor gateway to Bayview Estate—home to the Arts Gallery, Edible Gardens, Workshops, Cellar Door wine tastings, events, and the Pig &amp; Whistle. Seeking for highly motivated founding partners to join us to create next chapters for Bayview Hub.
            </p>
            <div className="flex flex-wrap justify-center gap-4 [&_a]:font-semibold [&_button]:font-semibold">
              <Button href="/partners" variant="primary" size="lg">
                Become a Partner
              </Button>
              <Button href="/edible-gardens#subscribe" variant="secondary" size="lg">
                Subscribe Gardens
              </Button>
              <Button href="/backyard-small-second-home#register" variant="accent" size="lg">
                Build Second Home
              </Button>
              <PrelaunchButton href="/workshops" variant="primary" size="lg">
                Book Workshops
              </PrelaunchButton>
              <Button href="/events" variant="outline" size="lg" className="border-2 border-fg text-fg hover:bg-fg hover:text-bg dark:border-white/90 dark:text-white dark:hover:bg-white dark:hover:text-bg">
                What&apos;s On
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Bar */}
      <section className="bg-white py-12 border-y border-border dark:bg-bg dark:border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-fg mb-2">50k+</div>
              <div className="text-sm text-muted">Annual visitors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-fg mb-2">🍷</div>
              <div className="text-sm text-muted">Winery Restaurant</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-fg mb-2">🎵</div>
              <div className="text-sm text-muted">Live Music Weekends</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-fg mb-2">🌏</div>
              <div className="text-sm text-muted">International Destination</div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-20 bg-natural-50 dark:bg-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-fg mb-4">
              Experiences at Bayview Hub
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Discover our expanding collection of dining, arts, music, and nature experiences
            </p>
          </div>

          {/* Featured (Ordered) */}
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-fg mb-6">
              Featured
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredExperiences.map((exp: any) => (
                <Card
                  key={exp.id}
                  title={exp.title}
                  description={exp.blurb}
                  image={exp.image}
                  cta={exp.cta}
                  ctaSecondary={exp.ctaSecondary}
                  prelaunch={exp.prelaunch}
                  variant="highlight"
                />
              ))}
            </div>
          </div>

          {/* New Additions */}
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-fg mb-6">
              New Additions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingNewExperiences.map((exp) => (
                <Card
                  key={exp.id}
                  title={exp.title}
                  description={exp.blurb}
                  image={exp.image}
                  cta={exp.cta}
                  prelaunch={(exp as any).prelaunch}
                  variant="highlight"
                />
              ))}
            </div>
          </div>

          {/* Core Anchors */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-fg mb-6">
              Our Foundations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {remainingCoreExperiences.map((exp) => (
                <Card
                  key={exp.id}
                  title={exp.title}
                  description={exp.blurb}
                  image={exp.image}
                  cta={exp.cta}
                  prelaunch={(exp as any).prelaunch}
                />
              ))}
              {/* Pre-Launch / Founding Partners — flat below cards */}
            </div>
            <div className="mt-6 rounded-xl border border-border bg-white px-6 py-4 dark:bg-surface dark:border-border">
              <h4 className="text-sm font-bold tracking-wide uppercase text-fg mb-3">
                Pre-Launch / Founding Partners
              </h4>
              <div className="space-y-2 text-sm leading-relaxed text-muted">
                  <p>
                    <strong className="text-fg">Pre-Launch Notice</strong> — Some Bayview Hub experiences are still in development and may not be publicly available yet. Any dates, inclusions, and pricing shown are indicative and may change.
                  </p>
                  <p>
                    <strong className="text-fg">EOI (Expressions of Interest)</strong> — An EOI is not a booking and does not guarantee availability or confirm details.
                  </p>
                  <p>
                    <strong className="text-fg">Please confirm</strong> current status with us before making travel plans or other commitments.
                  </p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Now Building - Recruitment */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-bg dark:to-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-fg mb-6">
              We're building the next chapter of Bayview Hub
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              We're seeking founding leaders to establish our Gallery, Art Programs, and Edible Gardens operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {FOUNDING_ROLES.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full dark:bg-surface dark:border dark:border-border"
              >
                <h3 className="text-xl font-serif font-bold text-fg mb-4">
                  {role.title}
                </h3>
                <div className="flex-1">
                  <p className="text-muted mb-6 leading-relaxed">
                    {role.summary}
                  </p>
                  <ul className="space-y-2">
                    {role.responsibilities.slice(0, 3).map((resp, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted">
                        <span className="text-primary-600 mr-2 dark:text-primary-300">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button href={`/partners/${role.id}`} variant="accent" size="sm" className="w-full mt-6">
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
      <section className="py-20 bg-white dark:bg-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg mb-4">
                Stay Connected with Bayview Hub
              </h2>
              <p className="text-muted">
                Get updates tailored to your interests
              </p>
            </div>
            <div className="bg-natural-50 rounded-2xl p-8 dark:bg-surface/50 dark:border dark:border-border">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

