import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

const INVEST_AREAS = [
  '艺术与展览基础设施',
  '工作坊与公共项目能力',
  '可食花园与订阅制系统',
  '更完整的场所体验与长期运营结构',
]

export const metadata: Metadata = genMeta({
  title: '投资信息',
  description:
    'Bayview Hub 中文投资页：说明这是一场关于长期场所建设、项目扩张与资源配置的对话入口，而不是面向所有人的公开募资广告。',
  path: '/zh/invest',
})

export default function ChineseInvestPage() {
  return (
    <main className="min-h-screen bg-bg py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow text-accent">投资信息</p>
          <h1 className="mt-4 text-balance text-4xl font-serif font-semibold text-fg md:text-6xl">
            与 Bayview Hub 的资本对话，从理解开始
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-fg/80 dark:text-white/80 md:text-lg">
            <p>
              这不是一页面向所有人的“公开募资广告”。更准确地说，它是一个中文入口，帮助潜在支持者或战略型伙伴理解：Bayview Hub 想建设的，不只是单点项目，而是一个以真实场所为基础、能持续生长的文化与生活系统。
            </p>
            <p>
              如果你更关心长期结构、项目扩张、资源配置与目的地型运营，而不是短期噱头或流量型叙事，这个入口才可能适合你。
            </p>
          </div>

          <section className="mt-12 rounded-3xl border border-border bg-natural-50 p-8 dark:border-border dark:bg-surface">
            <h2 className="text-3xl font-serif font-semibold text-fg">当前值得进入对话的方向</h2>
            <ul className="mt-6 space-y-3 text-base leading-8 text-fg/80 dark:text-white/80">
              {INVEST_AREAS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-surface">
              <h2 className="text-2xl font-serif font-semibold text-fg">适合谁</h2>
              <p className="mt-4 text-base leading-8 text-fg/80 dark:text-white/80">
                适合愿意理解 Bayview Hub 长期结构的人，包括战略投资者、使命一致的资源伙伴，或对“真实场所如何形成更大生态”感兴趣的长期支持者。
              </p>
            </article>
            <article className="rounded-3xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-surface">
              <h2 className="text-2xl font-serif font-semibold text-fg">不适合谁</h2>
              <p className="mt-4 text-base leading-8 text-fg/80 dark:text-white/80">
                如果你要找的是高度标准化、快速复制、短期兑现的项目，这个入口大概率不适合。Bayview Hub 更接近长期建设，而不是包装式扩张。
              </p>
            </article>
          </section>

          <section className="mt-12 rounded-3xl border border-border bg-white p-8 shadow-sm dark:border-border dark:bg-surface">
            <h2 className="text-3xl font-serif font-semibold text-fg">下一步</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-fg/80 dark:text-white/80">
              如果你希望继续了解，先阅读公开的关于我们与 Mendpress，会比直接索要材料更有效。若你已准备好进入更具体的结构性对话，也可以直接通过邮箱联系。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/zh/about" variant="primary">
                先读关于我们
              </Button>
              <Button href="/zh/mendpress" variant="outline">
                浏览 Mendpress
              </Button>
              <Button href={`mailto:${SITE_CONFIG.email}?subject=Bayview%20Hub%20Investment%20Conversation`} variant="outline" external>
                发送投资咨询
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
