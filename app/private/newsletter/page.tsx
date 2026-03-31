import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NewsletterAdminClient } from '@/app/private/newsletter/NewsletterAdminClient'
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

  if (supabase) {
    const countQuery = await supabase
      .from('newsletter_subscriptions')
      .select('email', { count: 'exact', head: true })
      .in('status', [...NEWSLETTER_ACTIVE_STATUSES])

    if (!countQuery.error) {
      activeSubscriberCount = countQuery.count ?? 0
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
        />
      </div>
    </main>
  )
}
