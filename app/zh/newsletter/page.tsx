import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: 'Bayview Notes 通讯',
  description: '订阅 Bayview Notes，接收 Mendpress 精选文章、邀请函与 Bayview Hub 的庄园更新。',
  path: '/zh/newsletter',
})

export default function ChineseNewsletterPage() {
  return (
    <main className="min-h-screen bg-bg py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow mb-3 text-center text-accent">通讯</p>
          <h1 className="mb-4 text-center text-4xl font-serif font-bold text-fg md:text-5xl">
            Bayview Notes
          </h1>
          <p className="mb-10 text-center text-[1.06rem] leading-8 text-fg/80 dark:text-white/80 md:text-lg">
            只在真正有内容值得分享时发送：Mendpress 精选文章、邀请函，以及 Bayview Hub 的公开动向。
          </p>

          <div className="rounded-2xl bg-natural-50 p-8 dark:border dark:border-border dark:bg-surface">
            <NewsletterForm locale="zh" />
          </div>

          <div className="mt-8 space-y-2 text-center text-[15px] leading-7 text-fg/75 dark:text-white/75 md:text-sm md:leading-6">
            <p>我们不会高频轰炸邮箱。每封通讯都可直接退订。</p>
            <p>
              想先阅读公开内容？
              <Link href="/zh/mendpress" className="ml-1 text-accent hover:underline">
                浏览 Mendpress
              </Link>
              。
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
