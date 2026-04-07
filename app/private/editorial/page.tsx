import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { EditorialAdminClient } from '@/app/private/editorial/EditorialAdminClient'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
  newsletterAdminConfigured,
} from '@/lib/newsletter-admin'
import { listEditorialEntriesForAdmin } from '@/lib/editorial'

export const metadata: Metadata = {
  title: 'Private Mendpress Editorial Desk',
  robots: { index: false, follow: false },
}

export const revalidate = 0

export default async function PrivateEditorialPage() {
  if (!newsletterAdminConfigured()) {
    redirect('/private/editorial/login?missing=1')
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(NEWSLETTER_ADMIN_COOKIE)?.value
  if (!isNewsletterAdminCookieValid(token)) {
    redirect('/private/editorial/login')
  }

  const entries = await listEditorialEntriesForAdmin(100)

  return (
    <main className="min-h-screen bg-bg py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2 text-accent">Private</p>
              <h1 className="text-4xl font-serif font-bold text-fg">Mendpress Editorial Desk</h1>
              <p className="mt-3 max-w-2xl text-muted">
                Create, edit, draft, and publish written, audio, and hybrid Mendpress pieces without turning the desk into a heavy CMS.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/private/newsletter"
                className="rounded-lg border border-border px-4 py-3 text-sm text-fg transition-colors hover:border-accent dark:border-border"
              >
                Newsletter admin
              </Link>
              <Link
                href="/private/distribution"
                className="rounded-lg border border-border px-4 py-3 text-sm text-fg transition-colors hover:border-accent dark:border-border"
              >
                Distribution console
              </Link>
              <Link href="/private/editorial/new" className="rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white">
                New piece
              </Link>
            </div>
          </div>

          {entries.length ? (
            <EditorialAdminClient entries={entries} />
          ) : (
            <section className="overflow-hidden rounded-2xl border border-border bg-white px-6 py-16 text-center dark:border-border dark:bg-surface">
              <h2 className="text-2xl font-serif font-semibold text-fg">No Mendpress pieces yet</h2>
              <p className="mt-3 text-muted">
                Create the first editorial, essay, conversation, interview, audio essay, podcast episode, field note, or profile to open Mendpress.
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
