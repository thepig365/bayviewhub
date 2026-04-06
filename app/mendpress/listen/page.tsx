import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MendpressListenHubPage } from '@/components/editorial/MendpressListenHubPage'
import { SITE_CONFIG } from '@/lib/constants'
import { getMendpressAudioHubState } from '@/lib/editorial'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Listen on Mendpress',
  description: 'Conversations, audio essays, and spoken pieces from Mendpress — gathered in one place for slower listening.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/mendpress/listen`,
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default async function MendpressListenPage() {
  const state = await getMendpressAudioHubState()
  if (!state.isReady) notFound()
  return <MendpressListenHubPage state={state} />
}
