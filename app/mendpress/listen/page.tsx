import type { Metadata } from 'next'
import Link from 'next/link'
import { MendpressListenHubPage } from '@/components/editorial/MendpressListenHubPage'
import { getMendpressAudioHubState } from '@/lib/editorial'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Listen on Mendpress — Audio Essays, Conversations & Spoken Pieces',
  description:
    'The Listen hub gathers Mendpress audio essays, conversations, interviews, and spoken pieces in one slower reading surface. When the hub is not yet populated, individual Mendpress pieces with audio players carry the audio experience on their own article pages. It is the part of the publication that stays closest to voice, attention, and human exchange.',
  path: '/mendpress/listen',
  theme: 'mendpress',
  shareEyebrow: 'Listen / Mendpress',
  shareFooter: 'Bayview Hub',
})

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
