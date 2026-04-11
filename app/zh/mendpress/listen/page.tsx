import type { Metadata } from 'next'
import Link from 'next/link'
import { MendpressListenHubPage } from '@/components/editorial/MendpressListenHubPage'
import { SITE_CONFIG } from '@/lib/constants'
import { getMendpressAudioHubState } from '@/lib/editorial'

export const revalidate = 300

export const metadata: Metadata = {
  title: '在 Mendpress 收听',
  description:
    '把 Mendpress 的对话、音频随笔与口播内容汇集在一起，为较慢的聆听而设。若音频中心尚未开放，请使用带播放器的单篇文章。',
  alternates: {
    canonical: `${SITE_CONFIG.url}/zh/mendpress/listen`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function ChineseMendpressListenPage() {
  const state = await getMendpressAudioHubState()
  if (state.isReady) {
    return <MendpressListenHubPage state={state} locale="zh" />
  }
  return (
    <main className="min-h-screen bg-bg py-20">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <h1 className="font-serif text-3xl font-semibold text-fg md:text-4xl">在 Mendpress 收听</h1>
        <p className="mt-4 text-[1.05rem] leading-8 text-fg/84 dark:text-white/84">
          当有足够多的播客与音频随笔发布后，中文音频中心会在此展开。在此之前，请打开带播放器的文章，或返回{' '}
          <Link href="/zh/mendpress" className="text-accent underline underline-offset-4 hover:text-fg">
            Mendpress 中文页
          </Link>
          。
        </p>
      </div>
    </main>
  )
}
