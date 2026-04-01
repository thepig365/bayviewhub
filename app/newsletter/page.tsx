import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: 'Newsletter',
  description: 'Subscribe to Bayview Notes for selected Mendpress pieces, invitations, and estate updates.',
  path: '/newsletter',
})

export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-bg py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow text-accent mb-3 text-center">Newsletter</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-fg text-center mb-4">
            Bayview Notes
          </h1>
          <p className="text-lg text-muted text-center mb-10">
            Selected Mendpress pieces, invitations, and estate updates when there is something worth sharing.
          </p>

          <div className="bg-natural-50 rounded-2xl p-8 dark:bg-surface dark:border dark:border-border">
            <NewsletterForm />
          </div>

          <div className="mt-8 text-center text-sm text-muted space-y-2">
            <p>
              We only send updates when there is something worth sharing. You can unsubscribe from any newsletter email.
            </p>
            <p>
              Looking for the editorial side? <Link href="/mendpress" className="text-accent hover:underline">Explore Mendpress</Link>.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
