import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { EditorialEditorClient } from '@/app/private/editorial/EditorialEditorClient'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
  newsletterAdminConfigured,
} from '@/lib/newsletter-admin'

export const metadata: Metadata = {
  title: 'New Journal Entry',
  robots: { index: false, follow: false },
}

export default async function NewEditorialEntryPage() {
  if (!newsletterAdminConfigured()) {
    redirect('/private/editorial/login?missing=1')
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(NEWSLETTER_ADMIN_COOKIE)?.value
  if (!isNewsletterAdminCookieValid(token)) {
    redirect('/private/editorial/login')
  }

  return (
    <main className="min-h-screen bg-bg py-16">
      <div className="container mx-auto px-4">
        <EditorialEditorClient />
      </div>
    </main>
  )
}
