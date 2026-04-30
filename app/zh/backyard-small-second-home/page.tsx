import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import { localizedHref } from '@/lib/language-routing'
import { generateMetadata as genMeta } from '@/lib/utils'

const TOPIC_LINKS: { label: string; description: string; hrefEn: string }[] = [
  {
    label: '可行性检查',
    description: '路径推演互动工具与可选的书面第一层阅读。',
    hrefEn: '/backyard-small-second-home/feasibility-check',
  },
  {
    label: '维州 SSD 规则',
    description: 'VC253 / VC282 硬约束的白话提要。',
    hrefEn: '/backyard-small-second-home/victoria-rules',
  },
  {
    label: '成本、租金与回报语境',
    description: '造价区间量级与租金叙事的校准提醒。',
    hrefEn: '/backyard-small-second-home/cost-rent-roi',
  },
  {
    label: '这条路径适合你吗',
    description: '快速自检是否落在 SSD 「盒子」里。',
    hrefEn: '/backyard-small-second-home/is-this-for-you',
  },
  {
    label: '为何谈及这条路径',
    description: 'Bayview Hub 为什么在谈设计前先谈报批语境。',
    hrefEn: '/backyard-small-second-home/approach',
  },
  {
    label: '莫宁顿半岛语境',
    description: 'Green Wedge、图层与场地如何把路径改写。',
    hrefEn: '/backyard-small-second-home/mornington-peninsula',
  },
  {
    label: '祖母房 = SSD',
    description: '检索语言如何对齐官方「小型第二住宅」称谓。',
    hrefEn: '/backyard-small-second-home/granny-flat-victoria',
  },
]

export const metadata: Metadata = genMeta({
  title: `后院第二小住宅 | ${SITE_CONFIG.name}`,
  description:
    'Bayview Hub 后院第二小住宅中文入口：理解维州 SSD 路径、逐项子主题与可行性工具，并保持与英文页的语境一致。',
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
              这是 Bayview Hub 用来解释 Victorian Small Second Dwelling 路径的日常中文版本：
              它指的是在同一产权证地块上，通过州级 SSD 框架判断是否能增添一座更小体量的第二居所。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={localizedHref('/backyard-small-second-home/feasibility-check', 'zh')} variant="primary" size="lg">
                开始可行性检查
              </Button>
              <Button href={localizedHref('/backyard-small-second-home/victoria-rules', 'zh')} variant="outline" size="lg">
                先看维州规则提要
              </Button>
              <Button href={localizedHref('/art-gallery/founding-partners', 'zh')} variant="outline" size="lg">
                美术馆创始合作（中文）
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface/50">
              <h2 className="font-serif text-2xl font-semibold text-fg">它不是“再加盖一栋”这么简单</h2>
              <p className="mt-3 leading-8 text-fg/80 dark:text-white/80">
                Title、图层、退让、能效、建房许可以及场地事实是绑在一起的；条文只是起跑线而不是自动批文。
              </p>
            </div>
            <div className="rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface/50">
              <h2 className="font-serif text-2xl font-semibold text-fg">它为什么仍然值得谈</h2>
              <p className="mt-3 leading-8 text-fg/80 dark:text-white/80">
                它可以回应照护、隐私、工作或同址资产配置等真实需求，而非只用投机话术谈这条路径。
              </p>
            </div>
            <div className="rounded-2xl bg-natural-50 p-6 dark:border dark:border-border dark:bg-surface/50">
              <h2 className="font-serif text-2xl font-semibold text-fg">下一步怎么做</h2>
              <p className="mt-3 leading-8 text-fg/80 dark:text-white/80">
                比渲染幻想图更早的是可行性：规则、图层、坡度、出入口与配套服务能否真的支撑你走完整流程。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-natural-50 py-16 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-serif font-bold text-fg">中文子页一览</h2>
            <p className="mt-4 max-w-3xl leading-8 text-fg/85 dark:text-white/85">
              以下为已翻译的核心主题页，路径均位于 <span className="font-mono text-sm">/zh/backyard-small-second-home/...</span>{' '}
              与你的英文书签一一对应，可在语言切换时保持语境连续。
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {TOPIC_LINKS.map(({ label, description, hrefEn }) => (
                <li
                  key={hrefEn}
                  className="rounded-2xl border border-border bg-white p-5 shadow-sm dark:border-border dark:bg-bg/70"
                >
                  <Link
                    href={localizedHref(hrefEn, 'zh')}
                    className="font-semibold text-fg underline-offset-4 hover:text-accent hover:underline"
                  >
                    {label}
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={localizedHref('/backyard-small-second-home/feasibility-check', 'zh')} variant="primary" size="lg">
                进入可行性检查
              </Button>
              <Button href={localizedHref('/visit', 'zh')} variant="outline" size="lg">
                了解到访信息
              </Button>
              <Button href={localizedHref('/art-gallery/founding-partners', 'zh')} variant="outline" size="lg">
                Bayview 美术馆创始合作
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
