import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NewsletterAdminClient } from '@/app/private/newsletter/NewsletterAdminClient'
import { listPublishedEditorialEntries } from '@/lib/editorial'
import {
  isNewsletterAdminCookieValid,
  NEWSLETTER_ADMIN_COOKIE,
  newsletterAdminConfigured,
} from '@/lib/newsletter-admin'
import { NEWSLETTER_ACTIVE_STATUSES } from '@/lib/newsletter'
import { getSupabaseServer } from '@/lib/ssd-campaign-server'

export const metadata: Metadata = {
  title: 'Private Newsletter Admin',
  robots: { index: false, follow: false },
}

type RecentCampaign = {
  id: string
  subject: string
  status: string
  send_kind: string
  sent_count: number
  failed_count: number
  created_at: string
}

type RecentJournalEntry = {
  id: string
  title: string
  path: string
  editorialType: string
  publishedAt: string | null
}

export default async function PrivateNewsletterPage() {
  if (!newsletterAdminConfigured()) {
    redirect('/private/newsletter/login?missing=1')
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(NEWSLETTER_ADMIN_COOKIE)?.value
  if (!isNewsletterAdminCookieValid(token)) {
    redirect('/private/newsletter/login')
  }

  const supabase = getSupabaseServer()
  let activeSubscriberCount: number | null = null
  let recentCampaigns: RecentCampaign[] = []
  const recentJournalEntries: RecentJournalEntry[] = (await listPublishedEditorialEntries({ limit: 5 })).map(
    (entry) => ({
      id: entry.id,
      title: entry.title,
      path: entry.path,
      editorialType: entry.editorialType,
      publishedAt: entry.publishedAt,
    })
  )

  if (supabase) {
    const countQuery = await supabase
      .from('newsletter_subscriptions')
      .select('email', { count: 'exact', head: true })
      .in('status', [...NEWSLETTER_ACTIVE_STATUSES])

    if (!countQuery.error) {
      activeSubscriberCount = countQuery.count ?? 0
    } else {
      console.warn('[Newsletter Admin] subscriber count with status filter failed', countQuery.error)

      const fallbackCountQuery = await supabase
        .from('newsletter_subscriptions')
        .select('email', { count: 'exact', head: true })

      if (!fallbackCountQuery.error) {
        activeSubscriberCount = fallbackCountQuery.count ?? 0
      } else {
        console.warn('[Newsletter Admin] subscriber count fallback failed', fallbackCountQuery.error)
      }
    }

    const recentQuery = await supabase
      .from('newsletter_campaigns')
      .select('id,subject,status,send_kind,sent_count,failed_count,created_at')
      .order('created_at', { ascending: false })
      .limit(5)

    if (!recentQuery.error && recentQuery.data) {
      recentCampaigns = recentQuery.data as RecentCampaign[]
    }
  }

  return (
    <main className="min-h-screen bg-bg py-16">
      <div className="container mx-auto px-4">
        <NewsletterAdminClient
          activeSubscriberCount={activeSubscriberCount}
          recentCampaigns={recentCampaigns}
          recentJournalEntries={recentJournalEntries}
        />
      </div>
    </main>
  )
}
