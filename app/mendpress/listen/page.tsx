import type { Metadata } from 'next'
import Link from 'next/link'
import { MendpressListenHubPage } from '@/components/editorial/MendpressListenHubPage'
import { SITE_CONFIG } from '@/lib/constants'
import { getMendpressAudioHubState } from '@/lib/editorial'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Listen on Mendpress',
  description:
    'Conversations, audio essays, and spoken pieces from Mendpress — gathered in one place for slower listening. When the hub is not yet populated, use individual Mendpress articles with audio.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/mendpress/listen`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function MendpressListenPage() {
  const state = await getMendpressAudioHubState()
  if (state.isReady) {
    return <MendpressListenHubPage state={state} />
  }
  return (
    <main className="min-h-screen bg-bg py-20">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <h1 className="font-serif text-3xl font-semibold text-fg md:text-4xl">Listen on Mendpress</h1>
        <p className="mt-4 text-[1.05rem] leading-8 text-fg/84 dark:text-white/84">
          The dedicated audio hub activates once enough podcast and audio-essay pieces are published. Until then, open any
          Mendpress piece that includes a player, or browse{' '}
          <Link href="/mendpress" className="text-accent underline underline-offset-4 hover:text-fg">
            Mendpress
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
