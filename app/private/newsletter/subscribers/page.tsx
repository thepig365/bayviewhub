import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NewsletterSubscribersClient } from '@/app/private/newsletter/subscribers/NewsletterSubscribersClient'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
  newsletterAdminConfigured,
} from '@/lib/newsletter-admin'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

export const metadata: Metadata = {
  title: 'Newsletter Subscribers',
  robots: { index: false, follow: false },
}

type SubscriberRow = {
  email: string
  status: string
  created_at: string | null
  source_page: string | null
}

export default async function PrivateNewsletterSubscribersPage() {
  if (!newsletterAdminConfigured()) {
    redirect('/private/newsletter/login?missing=1')
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(NEWSLETTER_ADMIN_COOKIE)?.value
  if (!isNewsletterAdminCookieValid(token)) {
    redirect('/private/newsletter/login')
  }

  const supabase = getSupabaseServer()
  let subscribers: SubscriberRow[] = []

  if (supabase) {
    const query = await supabase
      .from('newsletter_subscriptions')
      .select('email,status,created_at,source_page')
      .order('created_at', { ascending: false })
      .limit(250)

    if (!query.error && query.data) {
      subscribers = query.data as SubscriberRow[]
    }
  }

  return (
    <main className="min-h-screen bg-bg py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2 text-accent">Private</p>
              <h1 className="text-4xl font-serif font-bold text-fg">Newsletter Subscribers</h1>
              <p className="mt-3 max-w-2xl text-muted">
                A simple operational view of subscriber status, signup timing, and source page.
              </p>
            </div>
            <Link
              href="/private/newsletter"
              className="rounded-lg border border-border px-4 py-3 text-sm text-fg transition-colors hover:border-accent dark:border-border"
            >
              Back to newsletter admin
            </Link>
          </div>

          <NewsletterSubscribersClient subscribers={subscribers} />
        </div>
      </div>
    </main>
  )
}
