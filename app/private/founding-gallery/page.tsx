import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = {
  ...genMeta({
    title: `Founding Partner Pack — Gallery | ${SITE_CONFIG.name}`,
    description: 'Private overview for founding gallery partnership conversations.',
    path: '/private/founding-gallery',
  }),
  robots: { index: true, follow: true },
}

export default function FoundingGalleryPackPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-bg">
      {/* Section 1: One-page statement */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-mono tracking-widest text-muted uppercase mb-6">
              Founding Partner Pack — Gallery
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-fg mb-8 leading-tight ">
              A gallery inside a living destination.
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              This is an invitation to build a contemporary gallery and therapeutic arts workshop program within Bayview Hub's 30-acre estate — alongside dining, wine, music, gardens, and a year-round visitor audience already in motion.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Why this, why now */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-6 ">
              Why this, why now
            </h2>
            <div className="space-y-4 text-muted">
              <p>
                Conventional galleries struggle under rent and attention scarcity. They fight for foot traffic while paying commercial leases.
              </p>
              <p>
                Bayview Hub already has the audience — visitors arrive for food, wine, music, and gardens. The work is to curate what they encounter, and convert passive visitors into long-term patrons.
              </p>
              <p>
                The physical infrastructure exists. The hospitality ecosystem is operating. What's missing is a dedicated partner to lead the gallery and workshop program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The asset base */}
      <section className="py-16 bg-natural-50 dark:bg-surface/50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-6 ">
              The asset base
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <p className="text-muted">
                  <strong>30-acre estate</strong> with existing buildings, gardens, and hospitality infrastructure.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <p className="text-muted">
                  <strong>Operating hospitality ecosystem</strong> — dining, wine, live music, events.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <p className="text-muted">
                  <strong>50,000+ annual visitors</strong> (projected) — a built-in discovery audience.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <p className="text-muted">
                  <strong>No commercial rent burden</strong> — resources can flow to programming, artists, and collectors.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: The partnership concept */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-6 ">
              The partnership concept
            </h2>
            <p className="text-muted mb-8 ">
              This is not employment, not franchising, and not tenancy. It's a founding partnership — you build your own program with access to the estate's infrastructure and audience.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-natural-50 rounded-xl dark:bg-surface/50">
                <p className="text-muted text-sm mb-2 ">Not</p>
                <p className="font-medium text-fg ">Employment</p>
                <p className="text-sm text-muted mt-2 ">You're not staff. You lead your own practice.</p>
              </div>
              <div className="p-6 bg-natural-50 rounded-xl dark:bg-surface/50">
                <p className="text-muted text-sm mb-2 ">Not</p>
                <p className="font-medium text-fg ">Franchising</p>
                <p className="text-sm text-muted mt-2 ">No playbook to follow. You shape the program.</p>
              </div>
              <div className="p-6 bg-natural-50 rounded-xl dark:bg-surface/50">
                <p className="text-muted text-sm mb-2 ">Not</p>
                <p className="font-medium text-fg ">Rent / Tenancy</p>
                <p className="text-sm text-muted mt-2 ">No lease. Partnership structure discussed after alignment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Roles and boundaries */}
      <section className="py-16 bg-natural-50 dark:bg-surface/50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-6 ">
              Roles and boundaries
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 dark:bg-surface dark:border dark:border-border">
                <h3 className="font-bold text-fg mb-4 ">Bayview's role</h3>
                <p className="text-muted">
                  Leon is the owner-operator of Bayview Hub and the gallery's founding dealer ("old bones"). He is responsible for site integration, brand governance, artist development.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 dark:bg-surface dark:border dark:border-border">
                <h3 className="font-bold text-fg mb-4 ">Founding Partner role</h3>
                <p className="text-muted">
                  Leads curation, exhibition programming, collector development, and workshop facilitation day-to-day. Full creative autonomy within the partnership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Program shape examples */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-6 ">
              Program shape (examples)
            </h2>
            <p className="text-muted mb-8 ">
              These are starting points, not prescriptions. The Founding Partner shapes the program.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-natural-50 rounded-xl dark:bg-surface/50">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <div>
                  <h3 className="font-bold text-fg mb-2 ">Exhibitions</h3>
                  <p className="text-muted">
                    Rotating exhibitions (quarterly or seasonal), artist residencies, collector previews, and integration with estate events.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-natural-50 rounded-xl dark:bg-surface/50">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <div>
                  <h3 className="font-bold text-fg mb-2 ">Therapeutic Arts Workshops</h3>
                  <p className="text-muted">
                    Restorative creative workshops (non-clinical) that bring people from viewing into participation. Taster sessions and longer programs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-natural-50 rounded-xl dark:bg-surface/50">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <div>
                  <h3 className="font-bold text-fg mb-2 ">Collector development</h3>
                  <p className="text-muted">
                    Building long-term relationships with collectors — from first encounter to ongoing patronage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Who this is for */}
      <section className="py-16 bg-natural-50 dark:bg-surface/50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-6 ">
              Who this is for
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <p className="text-muted">
                  A curator, dealer, or arts operator who wants to build something long-term.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <p className="text-muted">
                  Someone comfortable working within a living destination, not an isolated white-cube model.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <p className="text-muted">
                  A person who treats gallery work as cultural practice, not short-term activation.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent mt-1.5 text-xs">•</span>
                <p className="text-muted">
                  Someone ready to co-build, not just occupy.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 8: Next steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-6 ">
              Next steps
            </h2>
            <p className="text-muted mb-8 ">
              There's no application form. Conversations begin with understanding, not screening.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm dark:bg-surface dark:text-primary-300">1</span>
                <div>
                  <h3 className="font-bold text-fg ">Initial call</h3>
                  <p className="text-muted">A short conversation to see if there's mutual interest.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm dark:bg-surface dark:text-primary-300">2</span>
                <div>
                  <h3 className="font-bold text-fg ">Site walk</h3>
                  <p className="text-muted">Visit the estate. See the space. Feel the context.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm dark:bg-surface dark:text-primary-300">3</span>
                <div>
                  <h3 className="font-bold text-fg ">Deeper session</h3>
                  <p className="text-muted">If alignment exists, a longer conversation about program vision and partnership shape.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 bg-natural-900 text-center">
        <div className="container mx-auto px-4">
          <p className="text-muted mb-4">Ready to start a conversation?</p>
          <p className="text-white mb-6">
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-primary-400 transition-colors">
              {SITE_CONFIG.email}
            </a>
          </p>
          <Button href="/experiences/gallery" variant="outline" size="lg">
            View Public Gallery Page
          </Button>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-natural-900">
        <div className="container mx-auto px-4">
          <p className="text-xs text-subtle text-center max-w-2xl mx-auto">
            Therapeutic Arts Workshops are restorative creative workshops and are not clinical therapy or medical services. This document is for exploratory conversation only and does not constitute an offer or contract.
          </p>
        </div>
      </section>
    </main>
  )
}
