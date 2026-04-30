import React from 'react'
import Link from 'next/link'
import { SITE_CONFIG, SSD_LANDING } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { localizedHref } from '@/lib/language-routing'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { SsdFunnelNextSteps } from '@/components/ssd/SsdFunnelNextSteps'
import { SsdFunnelReturn } from '@/components/ssd/SsdFunnelReturn'
import { SsdPageHero } from '@/components/ssd/SsdPageHero'
import { SsdPageShare } from '@/components/ssd/SsdPageShare'

const ZH_BASE = '/zh/backyard-small-second-home'
const capsules = {
  headings: {
    quickAnswer: '要点速览',
    sources: '参考与来源',
    lastUpdatedPrefix: '最近更新：',
  },
}

export const metadata = {
  ...genMeta({
    title: `SSD 成本、租金与回报语境 | 后院第二小住宅 | ${SITE_CONFIG.name}`,
    description:
      '维州后院第二小住宅（SSD）建造成本区间的参考量级，以及影响造价的主要因素；租金与市场语境不构成投资建议。',
    path: `${ZH_BASE}/cost-rent-roi`,
  }),
  title: {
    absolute: 'SSD 成本、租金与回报语境 | 后院第二小住宅 | Bayview Hub',
  },
}

export default function CostRentRoiPageZh() {
  const baseUrl = SITE_CONFIG.url
  const feasibility = localizedHref(SSD_LANDING.feasibility, 'zh')
  const victoriaRules = localizedHref(SSD_LANDING.victoriaRules, 'zh')
  const overview = localizedHref(SSD_LANDING.overview, 'zh')
  return (
    <main className="min-h-screen bg-bg">
      <SsdPageHero
        title="成本、租金与价值——究竟是什么在拖动数字"
        explainer="以下仅为量级参考，不构成报价；最终金额取决于地块、结构、丛林火灾等级、配套服务与饰面等因素——本页重在说明哪些因素会牵动总价，而不是逐项精算。"
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
              definition="我们用较宽的区间层级，让你在纠结龙头款式之前，先分辨这是「十万级难度」还是「十五万级以上难度」。"
              facts={[
                '层级 1 — 紧凑型合规建造：示意区间约 $70k–$135k。',
                '层级 2 — 面向出租的耐用做法：示意区间约 $90k–$169k。',
                '层级 3 — 较高配置或较难场地：示意区间约 $122k–$168k。',
              ]}
              sources={[
                { label: 'SSD 总览（中文入口）', href: `${baseUrl}${overview}` },
                { label: '维州 SSD 规则', href: `${baseUrl}${victoriaRules}` },
                { label: '可行性检查', href: `${baseUrl}${feasibility}` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdPageShare path="/zh/backyard-small-second-home/cost-rent-roi" className="mt-8" />
            <SsdFunnelNextSteps
              sentence="以上为示意量级——勘测师与承建方才能把数字落到契约层面。"
              hubLabel="查看 SSD 中文总览"
              feasibilityLabel="运行可行性筛查"
              feasibilityHref={feasibility}
              overviewHref={overview}
            />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              具名房型示意与示意平面图见{' '}
              <Link href={`${overview}#ssd-house-archetypes`} className="font-medium text-accent underline-offset-4 hover:underline">
                SSD 总览页的房型版块
              </Link>
              ——本页聚焦影响造价的因素与下方的层级拆解。
            </p>
          </div>
        </div>
      </section>

      <section id="indicative-cost-tiers" className="scroll-mt-24 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-xl font-bold text-fg md:text-2xl">示意造价层级</h2>
            <p className="mt-3 text-base text-muted">建筑面积上限仍为 60㎡——结构与装修取向不同，总价会拉开差距。</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border">
                <h3 className="font-semibold text-fg">层级 1</h3>
                <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">紧凑合规型</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">平面简洁、饰面克制、场地相对友善。量级约 $70k–$135k。</p>
              </div>
              <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border">
                <h3 className="font-semibold text-fg">层级 2</h3>
                <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">适合出租耐久</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  更佳热工表现与耐磨材料组合。量级约 $90k–$169k。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border sm:col-span-2 lg:col-span-1">
                <h3 className="font-semibold text-fg">层级 3</h3>
                <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">更高配置 / 较难场地</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">陡坡、挡土墙或建筑设计含量更高。量级约 $122k–$168k。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-natural-50 py-12 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-xl font-bold text-fg md:text-2xl">租金与更长期价值</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              近年半岛与大维州部分地区租赁偏紧——但空置率与租金随周期摆动。请将租金视作{' '}
              <strong className="text-fg">可能出现的收益维度</strong>，而非担保。
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              对许多业主而言，价值是复合的：代际照护弹性、独立工作间、偶尔的租赁现金流——以及一栋有手续、合规备案的第二居所，相较于未报批加建对未来转售意味着什么。
            </p>
          </div>
        </div>
      </section>

      <SsdFunnelReturn
        primaryHref={feasibility}
        secondaryHref={overview}
        visitHref={localizedHref('/visit', 'zh')}
        heading="下一步做什么？"
        body="准备在地块语境里验证这些量级时，从可行性筛查开始；想换话题则回到 SSD 中文入口。"
        primaryLabel="运行可行性筛查"
        secondaryLabel="查看 SSD 中文总览"
        visitLabel="了解到访庄园"
      />
    </main>
  )
}
