import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: `Founding Partnerships | ${SITE_CONFIG.name}`,
  description:
    'Bayview Hub offers physical space for individuals who want to build their own independent practice — as partners within a shared destination.',
  path: '/partners/founding',
})

export default function FoundingPartnersPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-primary-900">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-fg mb-8 ">
              Founding Partnerships at Bayview Hub
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              Bayview Hub offers physical space for individuals who want to build their own independent practice — not as employees, and not as tenants, but as partners within a shared destination.
            </p>
          </div>
        </div>
      </section>

      {/* What this means */}
      <section className="py-16 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-8 ">
              What this means
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-muted">
                  You operate your own program or practice.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-muted">
                  Bayview Hub provides land, infrastructure, and an existing visitor context (<a href="/evidence/visitor-traffic" className="text-primary-600 hover:underline dark:text-primary-400">estimated 50k+ annual visitors — see Evidence</a>).
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-muted">
                  Each partnership develops at its own pace and shape.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What this is not */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-8 ">
              What this is not
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-subtle mt-1">—</span>
                <p className="text-muted">
                  Not employment
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-subtle mt-1">—</span>
                <p className="text-muted">
                  Not franchising
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-subtle mt-1">—</span>
                <p className="text-muted">
                  Not short-term activation
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Areas currently forming */}
      <section className="py-16 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-fg mb-8 ">
              Areas currently forming
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-muted">
                  Art Gallery
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-muted">
                  Therapeutic Arts Workshops (non-clinical)
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-muted">
                  Edible Gardens
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-muted">
                  Live Music & Cultural Programming
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-muted mb-4">
              Conversations begin with shared understanding, not applications.
            </p>
            <p className="text-xl text-muted mb-12">
              If something here resonates, exploration can begin.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/experiences" variant="primary" size="lg">
                Explore Experiences
              </Button>
              <Button href="https://gallery.bayviewhub.me" variant="outline" size="lg" external>
                Visit the Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
