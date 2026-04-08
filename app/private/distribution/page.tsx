import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { DistributionConsoleClient } from '@/app/private/distribution/DistributionConsoleClient'
import { listRecentDistributionHistory } from '@/lib/distribution/history'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
  newsletterAdminConfigured,
} from '@/lib/newsletter-admin'

export const metadata: Metadata = {
  title: 'Private Distribution Console',
  robots: { index: false, follow: false },
}

export const revalidate = 0

export default async function PrivateDistributionPage() {
  if (!newsletterAdminConfigured()) {
    redirect('/private/editorial/login?missing=1')
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(NEWSLETTER_ADMIN_COOKIE)?.value
  if (!isNewsletterAdminCookieValid(token)) {
    redirect('/private/editorial/login')
  }

  const initialHistory = await listRecentDistributionHistory(120)

  return (
    <main className="min-h-screen bg-bg py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2 text-accent">Private</p>
              <h1 className="text-4xl font-serif font-bold text-fg">Bayview Share Engine</h1>
              <p className="mt-3 max-w-3xl text-muted">
                Internal distribution console for Bayview-owned URLs: validate, inspect metadata, classify page type,
                prepare UTM links, assemble platform packs, generate local QR handoffs, and review what was actually posted.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/private/editorial"
                className="rounded-lg border border-border px-4 py-3 text-sm text-fg transition-colors hover:border-accent dark:border-border"
              >
                Editorial desk
              </Link>
              <Link
                href="/private/newsletter"
                className="rounded-lg border border-border px-4 py-3 text-sm text-fg transition-colors hover:border-accent dark:border-border"
              >
                Newsletter admin
              </Link>
            </div>
          </div>

          <DistributionConsoleClient initialHistory={initialHistory} />
        </div>
      </div>
    </main>
  )
}
