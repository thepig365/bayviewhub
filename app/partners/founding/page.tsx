import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Founding Partnerships | Bayview Hub',
  description: 'Bayview Hub offers physical space for individuals who want to build their own independent practice — as partners within a shared destination.',
}

export default function FoundingPartnersPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-primary-900">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Founding Partnerships at Bayview Hub
            </h1>
            <p className="text-xl text-natural-600 leading-relaxed dark:text-natural-300">
              Bayview Hub offers physical space for individuals who want to build their own independent practice — not as employees, and not as tenants, but as partners within a shared destination.
            </p>
          </div>
        </div>
      </section>

      {/* What this means */}
      <section className="py-16 bg-natural-50 dark:bg-primary-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              What this means
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  You operate your own program or practice.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  Bayview Hub provides land, infrastructure, and an existing visitor context (<a href="/evidence/visitor-traffic" className="text-primary-600 hover:underline dark:text-primary-400">estimated 50k+ annual visitors — see Evidence</a>).
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
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
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              What this is not
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-natural-500 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  Not employment
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-natural-500 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  Not franchising
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-natural-500 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
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
            <h2 className="text-2xl font-serif font-bold text-natural-900 mb-8 dark:text-natural-50">
              Areas currently forming
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  Art Gallery
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  Therapeutic Arts Workshops (non-clinical)
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
                  Edible Gardens
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary-600 dark:text-primary-400 mt-1">—</span>
                <p className="text-natural-700 dark:text-natural-300">
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
            <p className="text-xl text-natural-600 mb-4 dark:text-natural-300">
              Conversations begin with shared understanding, not applications.
            </p>
            <p className="text-xl text-natural-600 mb-12 dark:text-natural-300">
              If something here resonates, exploration can begin.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/experiences" variant="primary" size="lg">
                Explore Experiences
              </Button>
              <Button href="/art-gallery" variant="outline" size="lg">
                Visit the Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
