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

export const metadata = {
  ...genMeta({
    title: `维州 SSD 规则（VC253/VC282） | 后院第二小住宅 | ${SITE_CONFIG.name}`,
    description:
      '维多利亚州小型第二住宅（SSD）核心硬约束用中文概括：60㎡、坐落、全屋电气与同一产权证等，并附上官方核验入口。',
    path: `${ZH}/victoria-rules`,
  }),
  title: {
    absolute: '维州 SSD 规则（VC253/VC282） | 后院第二小住宅 | Bayview Hub',
  },
}

export default function VictoriaRulesPageZh() {
  const baseUrl = SITE_CONFIG.url
  const feasibility = localizedHref(SSD_LANDING.feasibility, 'zh')
  const costRoi = localizedHref(SSD_LANDING.costRoi, 'zh')
  const overview = localizedHref(SSD_LANDING.overview, 'zh')
  return (
    <main className="min-h-screen bg-bg">
      <SsdPageHero
        title="维州后院第二小屋规则——白话版"
        explainer="本节列出 VC253/VC282 常见硬线并指向权威出处；不构成对你的产权出具法律结论。"
        primaryHref={feasibility}
        primaryLabel="运行可行性筛查"
        secondaryHref={costRoi}
        secondaryLabel="了解成本量级"
      />

      <section className="border-b border-border bg-natural-50 py-8 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <AnswerCapsule
              headings={capsules.headings}
              definition="州层面规则限制小型第二居所的体量、坐落与配套服务方式；Council 的各类 overlay 仍可能改写路径——请以产权与图示为准。"
              facts={[
                '建面 60㎡ 上限；需落在主房前墙后方；全屋电气；不得分拆独立产权。',
                '主宅需保留不少于 25㎡ 私人对外开放空间。',
                '若全部满足 Clause 54.03 的认定合规条款，可能无需规划许可——但建房许可仍需办理。',
              ]}
              sources={[
                { label: '维多利亚州规划门户网站', href: 'https://www.planning.vic.gov.au/' },
                { label: 'SSD 中文总览', href: `${baseUrl}${overview}` },
                { label: '可行性筛查', href: `${baseUrl}${feasibility}` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdPageShare path="/zh/backyard-small-second-home/victoria-rules" className="mt-8" />
            <SsdFunnelNextSteps
              sentence="务必拿最新法律文书与产权证核对——本页仅是摘要。"
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
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border sm:p-6">
              <h2 className="font-semibold text-fg">最大建面：60㎡</h2>
              <p className="mt-2 text-base leading-relaxed text-muted">
                SSD cap 在同一产权上的第二居所是硬性数字——若需要更大的第二居所，已不再属于这条 SSD 路径。
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border sm:p-6">
              <h2 className="font-semibold text-fg">坐落：主房前墙后方</h2>
              <p className="mt-2 text-base leading-relaxed text-muted">
                第二居所需位于主朝向街道的主房前墙线的后方一侧；临街第二主宅通常跳出常规 SSD siting。
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border sm:p-6">
              <h2 className="font-semibold text-fg">全屋电气</h2>
              <p className="mt-2 text-base leading-relaxed text-muted">按 SSD 口径，第二居所不得接驳配送天然气管网——需按电气化方案规划。</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5 dark:bg-surface dark:border-border sm:p-6">
              <h2 className="font-semibold text-fg">同一产权——不得分拆</h2>
              <p className="mt-2 text-base leading-relaxed text-muted">第二居所与主宅必须同属一条 title；若你希望单独出售该地块，则需走另一条规划轨道。</p>
            </div>
          </div>
        </div>
      </section>

      <SsdMidCta
        intro="想把这些规则放回你的宗地语境里推演？"
        primaryHref={feasibility}
        primaryLabel="运行可行性筛查"
        secondaryHref={localizedHref('/backyard-small-second-home/is-this-for-you', 'zh')}
        secondaryLabel="它适合我吗？"
      />

      <section className="border-t border-border bg-natural-50 py-10 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-xl font-semibold text-fg">官方出处</h2>
            <p className="mt-2 text-sm text-muted">请在此查阅权威措辞与修正案更新。</p>
            <ol className="mt-6 list-decimal space-y-2 pl-5 text-base text-muted">
              <li>
                <a
                  href="https://www.planning.vic.gov.au/guides-and-resources/strategies-and-initiatives/small-second-dwellings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-fg"
                >
                  Victorian Planning Authority — Small Second Dwellings
                </a>
              </li>
              <li>
                <a
                  href="https://www.vba.vic.gov.au/consumers/small-second-homes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-fg"
                >
                  Victorian Building Authority — Small Second Homes
                </a>
              </li>
              <li>
                <a
                  href="https://www.planning.vic.gov.au/schemes-and-amendments/amendments/VC253"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-fg"
                >
                  Planning Amendment VC253
                </a>
              </li>
              <li>
                <a
                  href="https://www.planning.vic.gov.au/schemes-and-amendments/amendments/VC282"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-fg"
                >
                  Planning Amendment VC282
                </a>
              </li>
              <li>
                <a
                  href="https://www.mornpen.vic.gov.au/Building-Planning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-fg"
                >
                  Mornington Peninsula Shire — Building &amp; Planning
                </a>
              </li>
            </ol>
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
