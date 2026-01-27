import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Founding Partner Pack — Gallery | Bayview Hub',
  description: 'Private overview for founding gallery partnership conversations.',
  robots: 'noindex, nofollow',
}

export default function FoundingGalleryPackPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-primary-900">
      {/* Section 1: One-page statement */}
      <section className="py-20 md:py-28 border-b border-natural-200 dark:border-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-mono tracking-widest text-natural-600 uppercase mb-6">
              Founding Partner Pack — Gallery
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 leading-tight dark:text-natural-50">
              A gallery inside a living destination.
            </h1>
            <p className="text-xl text-natural-600 leading-relaxed dark:text-natural-300">
              This is an invitation to build a contemporary gallery and therapeutic arts workshop program within Bayview Hub's 30-acre estate — alongside dining, wine, music, gardens, and a year-round visitor audience already in motion.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Why this, why now */}
      <section className="py-16 border-b border-natural-200 dark:border-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Why this, why now
            </h2>
            <div className="space-y-4 text-natural-700 dark:text-natural-300">
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
      <section className="py-16 bg-natural-50 dark:bg-primary-800/30 border-b border-natural-200 dark:border-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              The asset base
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  <strong>30-acre estate</strong> with existing buildings, gardens, and hospitality infrastructure.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  <strong>Operating hospitality ecosystem</strong> — dining, wine, live music, events.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  <strong>50,000+ annual visitors</strong> (projected) — a built-in discovery audience.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  <strong>No commercial rent burden</strong> — resources can flow to programming, artists, and collectors.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: The partnership concept */}
      <section className="py-16 border-b border-natural-200 dark:border-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              The partnership concept
            </h2>
            <p className="text-natural-700 mb-8 dark:text-natural-300">
              This is not employment, not franchising, and not tenancy. It's a founding partnership — you build your own program with access to the estate's infrastructure and audience.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-natural-50 rounded-xl dark:bg-primary-800/30">
                <p className="text-natural-600 text-sm mb-2 dark:text-natural-400">Not</p>
                <p className="font-medium text-natural-900 dark:text-natural-50">Employment</p>
                <p className="text-sm text-natural-700 mt-2 dark:text-natural-400">You're not staff. You lead your own practice.</p>
              </div>
              <div className="p-6 bg-natural-50 rounded-xl dark:bg-primary-800/30">
                <p className="text-natural-600 text-sm mb-2 dark:text-natural-400">Not</p>
                <p className="font-medium text-natural-900 dark:text-natural-50">Franchising</p>
                <p className="text-sm text-natural-700 mt-2 dark:text-natural-400">No playbook to follow. You shape the program.</p>
              </div>
              <div className="p-6 bg-natural-50 rounded-xl dark:bg-primary-800/30">
                <p className="text-natural-600 text-sm mb-2 dark:text-natural-400">Not</p>
                <p className="font-medium text-natural-900 dark:text-natural-50">Rent / Tenancy</p>
                <p className="text-sm text-natural-700 mt-2 dark:text-natural-400">No lease. Partnership structure discussed after alignment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Roles and boundaries */}
      <section className="py-16 bg-natural-50 dark:bg-primary-800/30 border-b border-natural-200 dark:border-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Roles and boundaries
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <h3 className="font-bold text-natural-900 mb-4 dark:text-natural-50">Bayview's role</h3>
                <p className="text-natural-700 dark:text-natural-300">
                  Leon is the owner-operator of Bayview Hub and the gallery's founding dealer ("old bones"). He is responsible for site integration, brand governance, artist development.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 dark:bg-primary-900/60 dark:border dark:border-primary-700">
                <h3 className="font-bold text-natural-900 mb-4 dark:text-natural-50">Founding Partner role</h3>
                <p className="text-natural-700 dark:text-natural-300">
                  Leads curation, exhibition programming, collector development, and workshop facilitation day-to-day. Full creative autonomy within the partnership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Program shape examples */}
      <section className="py-16 border-b border-natural-200 dark:border-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Program shape (examples)
            </h2>
            <p className="text-natural-600 mb-8 dark:text-natural-400">
              These are starting points, not prescriptions. The Founding Partner shapes the program.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-natural-50 rounded-xl dark:bg-primary-800/30">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <div>
                  <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">Exhibitions</h3>
                  <p className="text-natural-700 dark:text-natural-300">
                    Rotating exhibitions (quarterly or seasonal), artist residencies, collector previews, and integration with estate events.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-natural-50 rounded-xl dark:bg-primary-800/30">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <div>
                  <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">Therapeutic Arts Workshops</h3>
                  <p className="text-natural-700 dark:text-natural-300">
                    Restorative creative workshops (non-clinical) that bring people from viewing into participation. Taster sessions and longer programs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-natural-50 rounded-xl dark:bg-primary-800/30">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <div>
                  <h3 className="font-bold text-natural-900 mb-2 dark:text-natural-50">Collector development</h3>
                  <p className="text-natural-700 dark:text-natural-300">
                    Building long-term relationships with collectors — from first encounter to ongoing patronage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Who this is for */}
      <section className="py-16 bg-natural-50 dark:bg-primary-800/30 border-b border-natural-200 dark:border-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Who this is for
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  A curator, dealer, or arts operator who wants to build something long-term.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  Someone comfortable working within a living destination, not an isolated white-cube model.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  A person who treats gallery work as cultural practice, not short-term activation.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
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
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-6 dark:text-natural-50">
              Next steps
            </h2>
            <p className="text-natural-600 mb-8 dark:text-natural-300">
              There's no application form. Conversations begin with understanding, not screening.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm dark:bg-primary-800 dark:text-primary-300">1</span>
                <div>
                  <h3 className="font-bold text-natural-900 dark:text-natural-50">Initial call</h3>
                  <p className="text-natural-600 dark:text-natural-400">A short conversation to see if there's mutual interest.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm dark:bg-primary-800 dark:text-primary-300">2</span>
                <div>
                  <h3 className="font-bold text-natural-900 dark:text-natural-50">Site walk</h3>
                  <p className="text-natural-600 dark:text-natural-400">Visit the estate. See the space. Feel the context.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm dark:bg-primary-800 dark:text-primary-300">3</span>
                <div>
                  <h3 className="font-bold text-natural-900 dark:text-natural-50">Deeper session</h3>
                  <p className="text-natural-600 dark:text-natural-400">If alignment exists, a longer conversation about program vision and partnership shape.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 bg-natural-900 text-center">
        <div className="container mx-auto px-4">
          <p className="text-natural-300 mb-4">Ready to start a conversation?</p>
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
          <p className="text-xs text-natural-400 text-center max-w-2xl mx-auto">
            Therapeutic Arts Workshops are restorative creative workshops and are not clinical therapy or medical services. This document is for exploratory conversation only and does not constitute an offer or contract.
          </p>
        </div>
      </section>
    </main>
  )
}
