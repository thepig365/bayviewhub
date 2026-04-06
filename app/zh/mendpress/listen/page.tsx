import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MendpressListenHubPage } from '@/components/editorial/MendpressListenHubPage'
import { SITE_CONFIG } from '@/lib/constants'
import { getMendpressAudioHubState } from '@/lib/editorial'

export const revalidate = 300

export const metadata: Metadata = {
  title: '在 Mendpress 收听',
  description: '把 Mendpress 的对话、音频随笔与 spoken pieces 汇集在一起，为较慢的聆听而设。',
  alternates: {
    canonical: `${SITE_CONFIG.url}/zh/mendpress/listen`,
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default async function ChineseMendpressListenPage() {
  const state = await getMendpressAudioHubState()
  if (!state.isReady) notFound()
  return <MendpressListenHubPage state={state} locale="zh" />
}
