import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
  newsletterAdminConfigured,
} from '@/lib/newsletter-admin'
import {
  editorialTypeLabel,
  formatEditorialDate,
  listEditorialEntriesForAdmin,
} from '@/lib/editorial'

export const metadata: Metadata = {
  title: 'Private Editorial Admin',
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

  const entries = await listEditorialEntriesForAdmin(30)

  return (
    <main className="min-h-screen bg-bg py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2 text-accent">Private</p>
              <h1 className="text-4xl font-serif font-bold text-fg">Editorial Admin</h1>
              <p className="mt-3 max-w-2xl text-muted">
                Create, edit, draft, and publish Journal entries without introducing a heavy CMS.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/private/newsletter"
                className="rounded-lg border border-border px-4 py-3 text-sm text-fg transition-colors hover:border-accent dark:border-border"
              >
                Newsletter admin
              </Link>
              <Link href="/private/editorial/new" className="rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white">
                New Journal entry
              </Link>
            </div>
          </div>

          <section className="overflow-hidden rounded-2xl border border-border bg-white dark:border-border dark:bg-surface">
            <div className="hidden gap-4 border-b border-border px-6 py-4 text-xs uppercase tracking-[0.18em] text-muted md:grid md:grid-cols-[minmax(0,2fr)_140px_140px_180px]">
              <span>Entry</span>
              <span>Type</span>
              <span>Status</span>
              <span>Updated</span>
            </div>

            {entries.length ? (
              <ul>
                {entries.map((entry) => (
                  <li key={entry.id} className="border-b border-border px-6 py-5 last:border-b-0 md:grid md:grid-cols-[minmax(0,2fr)_140px_140px_180px] md:gap-4">
                    <div className="min-w-0">
                      <Link href={`/private/editorial/${entry.id}`} className="font-medium text-fg hover:text-accent">
                        {entry.title}
                      </Link>
                      <p className="mt-1 truncate text-sm text-muted">{entry.summary}</p>
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
                        <span>{entry.slug}</span>
                        {entry.pinned ? <span>pinned</span> : null}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm md:mt-0 md:contents">
                      <div className="text-sm text-fg">
                        <span className="mr-2 text-xs uppercase tracking-[0.12em] text-muted md:hidden">Type</span>
                        {editorialTypeLabel(entry.editorialType)}
                      </div>
                      <div className="text-sm text-fg">
                        <span className="mr-2 text-xs uppercase tracking-[0.12em] text-muted md:hidden">Status</span>
                        {entry.status}
                      </div>
                      <div className="text-sm text-muted">
                        <span className="mr-2 text-xs uppercase tracking-[0.12em] text-muted md:hidden">Updated</span>
                        {formatEditorialDate(entry.updatedAt || entry.createdAt)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-16 text-center">
                <h2 className="text-2xl font-serif font-semibold text-fg">No Journal entries yet</h2>
                <p className="mt-3 text-muted">
                  Create the first essay, field note, profile, invitation, or project brief to open the Journal.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
