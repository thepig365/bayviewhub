import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { localizedHref } from '@/lib/language-routing'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: `关于我们 | ${SITE_CONFIG.name}`,
  description:
    'Bayview Hub 为什么存在：在 Mornington Peninsula 建立一个让艺术、音乐、花园、款待与慢生活重新彼此相连的真实场所。',
  path: '/zh/about',
})

export default function ChineseAboutPage() {
  return (
    <main className="min-h-screen bg-bg py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow mb-3 text-accent">关于我们</p>
          <h1 className="text-4xl font-serif font-bold leading-tight text-fg md:text-5xl lg:text-6xl">
            为什么 Bayview Hub 要存在
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-muted md:text-lg">
            <p>
              Bayview Hub 的起点，并不是再做一个更快、更满、更喧闹的生活方式项目，而是回应当代生活中越来越稀薄的东西：
              注意力、场所感、真实相遇、共同经验，以及人与美、人与土地、人与彼此之间重新连接的可能。
            </p>
            <p>
              我们正在 Mornington Peninsula 建立一个活的文化场所，让艺术、音乐、花园、工作坊、庄园款待与慢生活不再被分割成彼此无关的功能区，而是回到同一个更大的人的生态里。
            </p>
            <p>
              在这里，画廊不是装饰，音乐不是背景，花园不是景观，款待也不只是服务。每一个部分都在帮助人们重新找回注意、谈话、记忆，以及与他人更扎实相处的方式。
            </p>
            <p>
              Bayview Hub 也和更大的 Mend 工作相连。Mend 关注情感生活、意义、修复与和解；Mendpress 让这些问题拥有语言；Bayview Hub 则让这些问题拥有真实的空间与日常实践。
            </p>
            <p>
              在一个被屏幕、速度、孤立与过度刺激塑造的时代，这样的地方之所以重要，不是因为它提供逃离，而是因为它再次让另一种生活方式变得可见。
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={localizedHref('/experiences', 'zh')}
              className="inline-flex items-center justify-center rounded bg-accent px-6 py-3 text-base font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
            >
              浏览 Bayview Hub
            </Link>
            <Link
              href={localizedHref('/mendpress', 'zh')}
              className="inline-flex items-center justify-center rounded border border-border px-6 py-3 text-base font-medium text-fg transition-colors hover:border-accent"
            >
              进入 Mendpress
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
