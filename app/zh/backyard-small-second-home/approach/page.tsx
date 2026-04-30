import React from 'react'
import { SITE_CONFIG, SSD_LANDING } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { localizedHref } from '@/lib/language-routing'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { SsdFunnelNextSteps } from '@/components/ssd/SsdFunnelNextSteps'
import { SsdFunnelReturn } from '@/components/ssd/SsdFunnelReturn'
import { SsdMidCta } from '@/components/ssd/SsdMidCta'
import { SsdPageHero } from '@/components/ssd/SsdPageHero'
import { SsdPageShare } from '@/components/ssd/SsdPageShare'

const capsules = {
  headings: {
    quickAnswer: '要点速览',
    sources: '参考与来源',
    lastUpdatedPrefix: '最近更新：',
  },
}

const ZH = '/zh/backyard-small-second-home'

export const metadata = genMeta({
  title: `为何谈论这条路径 | 后院第二小住宅 | ${SITE_CONFIG.name}`,
  description:
    'Bayview Hub 为何以维州 SSD 法规与报批路径为先：普通人想做第二小屋的真实动机，以及硬约束如何把流程变得更可预测。',
  path: `${ZH}/approach`,
})

export default function SsdApproachPageZh() {
  const baseUrl = SITE_CONFIG.url
  const feasibility = localizedHref(SSD_LANDING.feasibility, 'zh')
  const overview = localizedHref(SSD_LANDING.overview, 'zh')
  const victoriaRules = localizedHref(SSD_LANDING.victoriaRules, 'zh')
  const fitPage = localizedHref('/backyard-small-second-home/is-this-for-you', 'zh')
  return (
    <main className="min-h-screen bg-bg">
      <SsdPageHero
        title="为什么我们先把这条路径讲清楚"
        explainer="本节说明我们如何理解维州后院第二小住宅——现实里人们为了什么动它，以及为何在谈平面图前先谈法规。"
        primaryHref={feasibility}
        primaryLabel="运行可行性筛查"
        secondaryHref={overview}
        secondaryLabel="查看 SSD 中文总览"
      />

      <section className="border-b border-border bg-natural-50 py-8 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <AnswerCapsule
              headings={capsules.headings}
              definition="我们把 SSD 首先当作一条「规划路径」：规则边界清晰——若你完全符合，批文路径往往更可预期；它不是泛化的生活方式营销话术。"
              facts={[
                '在讨论饰面与风格之前，我们先核对框架允许的硬条件。',
                '若目标是突破硬红线（体量、产权、坐落、燃气等），会直接指向非 SSD 的流程或缩小的任务书。',
              ]}
              sources={[
                { label: '维州 SSD 规则', href: `${baseUrl}${victoriaRules}` },
                { label: 'SSD 中文总览', href: `${baseUrl}${overview}` },
                { label: '可行性筛查', href: `${baseUrl}${feasibility}` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdPageShare path="/zh/backyard-small-second-home/approach" className="mt-8" />
            <SsdFunnelNextSteps
              sentence="本页仅是背景语境——不构成针对某一宗地的法律或规划意见。"
              feasibilityLabel="运行可行性筛查"
              hubLabel="查看 SSD 中文总览"
              feasibilityHref={feasibility}
              overviewHref={overview}
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted">
            <p>
              很多家庭需要一个<strong className="text-fg">独立的第二小屋</strong>，原因很朴实：长辈需要近在咫尺而不住同一间卧室，年轻人需要一个可以关闭的私人空间，工作间不应永远是餐桌，或者希望在同一产权证上拥有一个可租赁的房间。这些情况都很常见。
              SSD 框架是州政府制定的<strong className="text-fg">一个符合条件时能走简易审批路径的框架</strong>。
            </p>
            <p>
              维州规定了体量（建面 60㎡ 上限）、坐落（主房前墙后方）、能耗形式（全屋电气）以及
              <strong className="text-fg">必须保留在同一产权证上</strong>等硬性要求。若你想要其他方案，可能会遭遇挫折——但若符合这些条件，审批方会依据这些标准逐项核验。
            </p>
            <p>
              我们希望尽早明确这种取舍关系：如果条件匹配，后续讨论将聚焦于可递交的内容；若不匹配，则能及时转为标准规划路径或更简化的任务方案，节省时间。
            </p>
          </div>
        </div>
      </section>

      <SsdMidCta
        intro="若不确定是否匹配这条路径，可先看适配页或直接做互动筛查。"
        primaryHref={fitPage}
        primaryLabel="这条路径适合我吗"
        secondaryHref={feasibility}
        secondaryLabel="运行可行性筛查"
      />

      <SsdFunnelReturn
        primaryHref={feasibility}
        secondaryHref={overview}
        visitHref={localizedHref('/visit', 'zh')}
        heading="下一步"
        body="想把语境落到你自己的地块时，运行可行性筛查；若想快速回看 Hub 提要，则用中文 SSD 入口。"
        primaryLabel="运行可行性筛查"
        secondaryLabel="查看 SSD 中文总览"
        visitLabel="了解到访庄园"
      />
    </main>
  )
}
