import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { localizedHref } from '@/lib/language-routing'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: `后院第二小住宅 | ${SITE_CONFIG.name}`,
  description:
    'Bayview Hub 后院 Small Second Home 中文页：解释这一路径是什么、为什么有意义、适合什么样的物业，以及下一步该如何判断可行性。',
  path: '/zh/backyard-small-second-home',
  image: `${SITE_CONFIG.url}/og-second-home.png`,
})

export default function ChineseBackyardSmallSecondHomePage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-natural-50 py-16 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow text-accent">后院第二小住宅</p>
            <h1 className="mt-4 text-4xl font-serif font-bold leading-tight text-fg md:text-5xl">
              什么是维州后院第二小住宅路径？
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-fg/80 dark:text-white/80">
              这是 Bayview Hub 用来解释 Victorian Small Second Dwelling 路径的日常语言版本。
              它指的是：在同一产权地块上，通过州级 SSD 框架去判断是否可以增加一座更小的第二住宅。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={localizedHref('/backyard-small-second-home/feasibility-check', 'zh')} variant="primary" size="lg">
                开始可行性检查
              </Button>
              <Button href={localizedHref('/backyard-small-second-home/victoria-rules', 'zh')} variant="outline" size="lg">
                查看规则路径
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface/50">
              <h2 className="font-serif text-2xl font-semibold text-fg">它不是“再盖一栋房子”那么简单</h2>
              <p className="mt-3 leading-8 text-fg/80 dark:text-white/80">你仍然需要面对 title、覆盖层、退线、能耗、建筑许可与场地事实。公开规则只是起点，不是自动通行证。</p>
            </div>
            <div className="rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface/50">
              <h2 className="font-serif text-2xl font-semibold text-fg">它为什么有价值</h2>
              <p className="mt-3 leading-8 text-fg/80 dark:text-white/80">它可以回应家庭照护、代际居住、隐私需求、客居安排或长期资产配置，而不是只用投机语言去谈这条路径。</p>
            </div>
            <div className="rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface/50">
              <h2 className="font-serif text-2xl font-semibold text-fg">下一步是什么</h2>
              <p className="mt-3 leading-8 text-fg/80 dark:text-white/80">最务实的方式不是先做想象图，而是先做可行性判断：规则、title、overlay、access、drainage 与现场约束是否真的支持你前进。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-natural-50 py-16 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-serif font-bold text-fg">中文页目前能帮你做什么</h2>
            <div className="mt-8 space-y-4 text-fg/80 dark:text-white/80">
              <p>这条中文页先帮助你理解这一路径的核心逻辑与判断方式。</p>
              <p>更细的法规解释、成本语境、Mornington Peninsula 本地语境与可行性工具，仍主要沿用英文原页内容。</p>
              <p>如果你已经准备进入判断阶段，最直接的入口仍然是可行性检查工具。</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={localizedHref('/backyard-small-second-home/feasibility-check', 'zh')} variant="primary" size="lg">
                进入可行性检查
              </Button>
              <Button href={localizedHref('/visit', 'zh')} variant="outline" size="lg">
                了解 Bayview Hub
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
