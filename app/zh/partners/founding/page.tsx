import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { localizedHref } from '@/lib/language-routing'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

const BUILDING_AREAS = [
  '艺术与策展实践',
  '非临床的修复性工作坊与表达性项目',
  '可食花园与订阅制生活实践',
  '音乐、公共活动与更完整的场所节目',
]

export const metadata: Metadata = genMeta({
  title: `创始合作路径 | ${SITE_CONFIG.name}`,
  description:
    'Bayview Hub 创始合作中文页：说明这不是招聘、加盟或短期租赁，而是在共享目的地中建立独立实践与长期项目的合作路径。',
  path: '/zh/partners/founding',
})

export default function ChineseFoundingPartnersPage() {
  return (
    <main className="min-h-screen bg-bg py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow text-accent">创始合作</p>
          <h1 className="mt-4 text-balance text-4xl font-serif font-semibold text-fg md:text-6xl">
            在 Bayview Hub 建立一项独立而长期的实践
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-fg/80 dark:text-white/80">
            这条路径面向那些想在真实场所里建立长期工作的人。它不是传统意义上的招聘，也不是把一个现成店位租出去，而是在共享目的地中共同塑造一个能持续生长的项目。
          </p>

          <section className="mt-10 rounded-3xl border border-border bg-natural-50 p-8 dark:border-border dark:bg-surface">
            <h2 className="text-3xl font-serif font-semibold text-fg">这意味着什么</h2>
            <ul className="mt-6 space-y-4 text-base leading-8 text-fg/80 dark:text-white/80">
              <li>你运营的是自己的项目、工作方法或实践，而不是成为 Bayview Hub 的普通雇员。</li>
              <li>Bayview Hub 提供的是场地语境、现有访客流、基础设施与公共面貌，而不是一套完全替你定义好的商业脚本。</li>
              <li>合作关系会按彼此适配度推进，不以“先签约、后理解”为前提。</li>
            </ul>
          </section>

          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-surface">
              <h2 className="text-2xl font-serif font-semibold text-fg">这不是什么</h2>
              <ul className="mt-4 space-y-3 text-base leading-8 text-fg/80 dark:text-white/80">
                <li>不是常规招聘岗位。</li>
                <li>不是加盟模式。</li>
                <li>不是短期快闪或一次性活动合作。</li>
              </ul>
            </article>
            <article className="rounded-3xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-surface">
              <h2 className="text-2xl font-serif font-semibold text-fg">目前最适合形成中的方向</h2>
              <ul className="mt-4 space-y-3 text-base leading-8 text-fg/80 dark:text-white/80">
                {BUILDING_AREAS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-12 rounded-3xl border border-border bg-white p-8 shadow-sm dark:border-border dark:bg-surface">
            <h2 className="text-3xl font-serif font-semibold text-fg">如何开始</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-fg/80 dark:text-white/80">
              <p>最好的开始方式不是直接提交一份模板申请，而是先确认你想建立的事情是否有独立性、长期性，以及与 Bayview Hub 的公共气质是否一致。</p>
              <p>如果你仍在建立理解，先阅读 Mendpress 会比仓促申请更有帮助；如果你已经准备好进入项目对话，再进入合作或投资页面会更实际。</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/zh/mendpress" variant="primary">
                先读 Mendpress
              </Button>
              <Button href="/zh/partners" variant="outline">
                返回合作总览
              </Button>
              <Button href="/zh/invest" variant="outline">
                查看投资路径
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
