import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { localizedHref } from '@/lib/language-routing'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

const PARTNER_PATHS = [
  {
    title: '创始合作路径',
    body: '适合希望在 Bayview Hub 内部建立长期项目、独立实践或共同发展的伙伴。重点不是“投简历”，而是判断彼此是否真的适配。',
    href: '/partners/founding',
    label: '查看创始合作路径',
  },
  {
    title: 'Mendpress 与公开理解层',
    body: '如果你还在理解 Bayview Hub 的价值观、语言与世界观，从 Mendpress 开始通常比直接申请更合适。',
    href: '/mendpress',
    label: '先读 Mendpress',
  },
  {
    title: '投资与资本对话',
    body: '适合更关注长期结构、项目扩张与资源配置的人。这里不是面向所有人的公开募资页，而是一个判断对话是否值得开始的入口。',
    href: '/invest',
    label: '查看投资信息',
  },
]

export const metadata: Metadata = genMeta({
  title: `合作路径 | ${SITE_CONFIG.name}`,
  description:
    'Bayview Hub 中文合作页：说明创始合作、公开理解层与投资对话三种主要进入路径，帮助访客判断从哪里开始更合适。',
  path: '/zh/partners',
})

export default function ChinesePartnersPage() {
  return (
    <main className="min-h-screen bg-bg py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow text-accent">合作路径</p>
          <h1 className="mt-4 text-balance text-4xl font-serif font-semibold text-fg md:text-6xl">
            如何与 Bayview Hub 开始一段真实的合作
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-fg/80 dark:text-white/80 md:text-lg">
            <p>
              Bayview Hub 并不是单一业务线，而是一个仍在形成中的真实场所。它把款待、艺术、花园、出版与公共生活放在同一个地方里，因此合作也不该被理解成单纯招聘、租赁，或一次性的品牌联名。
            </p>
            <p>
              对我们来说，更重要的问题是：你想建立的东西是否有独立性、是否有长期性、是否能与这个地方的节奏、语气与公共面貌真正共处。
            </p>
            <p>
              因此，中文页不会把所有入口都包装成“立即申请”。更好的方式，是先判断你属于哪一类进入路径，再进入相应页面继续了解。
            </p>
          </div>

          <section className="mt-12 grid gap-6 md:grid-cols-3">
            {PARTNER_PATHS.map((item) => (
              <article key={item.href} className="rounded-3xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-surface">
                <h2 className="text-2xl font-serif font-semibold text-fg">{item.title}</h2>
                <p className="mt-3 text-base leading-8 text-fg/80 dark:text-white/80">{item.body}</p>
                <div className="mt-5">
                  <Button href={localizedHref(item.href, 'zh')} variant="outline">
                    {item.label}
                  </Button>
                </div>
              </article>
            ))}
          </section>

          <section className="mt-14 rounded-3xl border border-border bg-natural-50 p-8 dark:border-border dark:bg-surface">
            <p className="eyebrow text-accent">合作标准</p>
            <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">我们首先看什么</h2>
            <ul className="mt-6 space-y-4 text-base leading-8 text-fg/80 dark:text-white/80">
              <li>是否愿意长期经营，而不是短期借用 Bayview Hub 的流量或场地。</li>
              <li>是否能带来清晰的实践、方法或公共价值，而不是模糊的概念包装。</li>
              <li>是否理解这里的节奏是“地方型”的，而不是高噪音、快进度、强营销式的扩张。</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
