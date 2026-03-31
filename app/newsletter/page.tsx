import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: 'Newsletter',
  description: 'Subscribe to Bayview Hub updates on exhibitions, events, wine releases, and special offers.',
  path: '/newsletter',
})

export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-bg py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow text-accent mb-3 text-center">Newsletter</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-fg text-center mb-4">
            Stay In Touch
          </h1>
          <p className="text-lg text-muted text-center mb-10">
            Get the latest on exhibitions, events, wine releases, and special offers.
          </p>

          <div className="bg-natural-50 rounded-2xl p-8 dark:bg-surface dark:border dark:border-border">
            <NewsletterForm />
          </div>

          <div className="mt-8 text-center text-sm text-muted space-y-2">
            <p>
              We only send updates when there is something worth sharing. You can unsubscribe from any newsletter email.
            </p>
            <p>
              Looking for what is on now? <Link href="/experiences" className="text-accent hover:underline">Browse Bayview experiences</Link>.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
