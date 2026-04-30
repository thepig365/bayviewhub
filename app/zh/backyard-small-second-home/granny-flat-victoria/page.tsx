import React from 'react'
import { SITE_CONFIG, SSD_LANDING } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { localizedHref } from '@/lib/language-routing'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { SsdFunnelNextSteps } from '@/components/ssd/SsdFunnelNextSteps'
import { SsdFunnelReturn } from '@/components/ssd/SsdFunnelReturn'
import { SsdPageHero } from '@/components/ssd/SsdPageHero'
import { SsdPageShare } from '@/components/ssd/SsdPageShare'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const capsules = {
  headings: {
    quickAnswer: '要点速览',
    sources: '参考与来源',
    lastUpdatedPrefix: '最近更新：',
  },
}

const ZH = '/zh/backyard-small-second-home'

export const metadata = {
  ...genMeta({
    title: `维州祖母房与小型第二住宅 | Mornington Peninsula | ${SITE_CONFIG.name}`,
    description:
      '若在搜索「祖母房 维州」：它与官方语境中的小型第二住宅（SSD）是同一个规划篮子——建面 60㎡、同一产权证、全屋电气；满足条件时或可跳过规划许可。',
    path: `${ZH}/granny-flat-victoria`,
  }),
  title: {
    absolute: '维州祖母房与小型第二住宅 | Bayview Hub',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '在维州建造祖母房需要规划许可吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          '若满足 SSD 「认定合规」测试，许多地块往往不需要——例如常见于 300㎡ 以上的无图层场地。遗迹、洪水、丛林火灾等图层仍可能需要规划；建房许可则始终必不可少。',
      },
    },
    {
      '@type': 'Question',
      name: '维州祖母房的上限建面是多少？',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          '在 SSD 框架下，第二居所的建面（GFA）不得超过 60 平方米；并不存在「仍然属于 SSD」的更大版本。',
      },
    },
    {
      '@type': 'Question',
      name: '维州可以把祖母房租出去吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          '可以——合规的小型第二住宅可以用于出租；租金与市场、租约相关，我们无法保证收益。',
      },
    },
    {
      '@type': 'Question',
      name: '祖母房与小型第二住宅有什么差别？',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          '日常用语与规划用语之分。「小型第二住宅」（SSD）是维多利亚州目前对符合条件、同一地块上不大于 60㎡ 的第二居所之正式称谓；口头仍常说「祖母房」。',
      },
    },
  ],
}

export default function GrannyFlatVictoriaPageZh() {
  const baseUrl = SITE_CONFIG.url
  const feasibility = localizedHref(SSD_LANDING.feasibility, 'zh')
  const victoriaRules = localizedHref(SSD_LANDING.victoriaRules, 'zh')
  const overview = localizedHref(SSD_LANDING.overview, 'zh')
  const peninsula = localizedHref('/backyard-small-second-home/mornington-peninsula', 'zh')
  return (
    <main className="min-h-screen bg-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SsdPageHero
        title="「祖母房」与 SSD——同一语境"
        explainer="若你是从「祖母房」搜过来：找对地方了。本站对外统称后院第二小住宅 / Small Second Dwelling（SSD）——语义一致。"
        primaryHref={feasibility}
        primaryLabel="运行可行性筛查"
        secondaryHref={victoriaRules}
        secondaryLabel="了解维州 SSD 规则"
      />

      <section className="border-b border-border bg-natural-50 py-8 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <AnswerCapsule
              headings={capsules.headings}
              definition="自 VC253（2023）以来，越来越多维州宗地可走 SSD：建面不超过 60㎡、停留同一产权证、坐落合规且全屋电气化——图层仍可能改写叙事。"
              facts={[
                '宗地大小、覆盖层与坐落决定你走 Green Lane、VicSmart，还是退回标准规划。',
                '建房许可证永远是硬要求。',
              ]}
              sources={[
                { label: '维多利亚州规划门户网站', href: 'https://www.planning.vic.gov.au/' },
                { label: '维州 SSD 规则', href: `${baseUrl}${victoriaRules}` },
                { label: '莫宁顿半岛语境', href: `${baseUrl}${peninsula}` },
                { label: '可行性筛查', href: `${baseUrl}${feasibility}` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdPageShare path="/zh/backyard-small-second-home/granny-flat-victoria" className="mt-8" />
            <SsdFunnelNextSteps
              sentence="本页把检索语言对齐到官方框架——并不等同为你的宗地签发证明。"
              hubLabel="查看 SSD 中文总览"
              feasibilityLabel="运行可行性筛查"
              feasibilityHref={feasibility}
              overviewHref={overview}
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">白话里发生了什么变化</h2>
            <p>
              州政府在<strong className="text-fg">同一地块上与主宅并存的小型第二居所</strong>上给了新的路径叙述。口头仍喊「祖母房」；批文里写
              <strong className="text-fg">小型第二住宅（SSD）</strong>。本站用
              <strong className="text-fg">「后院第二小住宅」</strong>对外沟通，以利搜索语言对齐。
            </p>
            <p>
              合规 SSD 可以出租——不仅限于赡养亲属这一条叙事。但依旧受建面、坐落、配套服务方式与产权证结构约束。
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-natural-50 py-12 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">大家最先问的规则</h2>
            <ul className="mt-6 space-y-3 text-base text-muted">
              <li className="flex gap-2">
                <span className="text-fg">•</span>
                <span>第二居所建面（GFA）不超过 60 平方米。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-fg">•</span>
                <span>坐落需位于主房前墙线后方——而非街角第二幢主立面房屋。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-fg">•</span>
                <span>全屋电气——第二居所不得接驳配送煤气。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-fg">•</span>
                <span>停在同一产权证上——不得把 SSD 独立分拆测绘出售。</span>
              </li>
              <li className="flex gap-2">
                <span className="text-fg">•</span>
                <span>主宅需保留不小于 25㎡ 的可私人对外开放空间。</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-base leading-relaxed text-muted">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">若在莫宁顿半岛</h2>
            <p className="mt-4">
              Bayview Hub 位于 Main Ridge。半岛地块常叠加绿地楔、景观图层、林区火灾与遗迹图层——这会决定你走轻手续还是退回完整 planning application。
              若你也是半岛业主，可先读本地化页面。
            </p>
            <p className="mt-4">
              <Link href={peninsula} className="font-medium text-accent underline-offset-4 hover:underline">
                前往莫宁顿半岛语境 →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">自检你的宗地</h2>
            <p className="mt-3 text-base text-muted">互动路径推演——表单提交约 48 小时内会有书面第一层阅读。</p>
            <div className="mt-8">
              <Button href={feasibility} variant="accent" size="lg" className="w-full sm:w-auto">
                运行可行性筛查
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SsdFunnelReturn
        primaryHref={feasibility}
        secondaryHref={overview}
        visitHref={localizedHref('/visit', 'zh')}
      />
    </main>
  )
}
