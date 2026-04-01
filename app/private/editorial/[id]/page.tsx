import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { EditorialEditorClient } from '@/app/private/editorial/EditorialEditorClient'
import { getEditorialEntryByIdForAdmin } from '@/lib/editorial'
import {
  NEWSLETTER_ADMIN_COOKIE,
  isNewsletterAdminCookieValid,
  newsletterAdminConfigured,
} from '@/lib/newsletter-admin'

export const metadata: Metadata = {
  title: 'Edit Journal Entry',
  robots: { index: false, follow: false },
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditorialEntryPage({ params }: Props) {
  if (!newsletterAdminConfigured()) {
    redirect('/private/editorial/login?missing=1')
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(NEWSLETTER_ADMIN_COOKIE)?.value
  if (!isNewsletterAdminCookieValid(token)) {
    redirect('/private/editorial/login')
  }

  const { id } = await params
  const entry = await getEditorialEntryByIdForAdmin(id)
  if (!entry) notFound()

  return (
    <main className="min-h-screen bg-bg py-16">
      <div className="container mx-auto px-4">
        <EditorialEditorClient entry={entry} />
      </div>
    </main>
  )
}
