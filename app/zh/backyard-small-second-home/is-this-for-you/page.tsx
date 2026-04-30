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

const capsules = {
  headings: {
    quickAnswer: '要点速览',
    sources: '参考与来源',
    lastUpdatedPrefix: '最近更新：',
  },
}

const ZH = '/zh/backyard-small-second-home'

export const metadata = genMeta({
  title: `这条路径适合你吗 | 后院第二小住宅 | ${SITE_CONFIG.name}`,
  description:
    '维州后院第二小住宅（SSD）是否匹配你的物业与目标？清晰「适合 / 不适合」信号，以及在灰色地带为何要做可行性筛查。',
  path: `${ZH}/is-this-for-you`,
})

export default function SsdAudienceFitPageZh() {
  const baseUrl = SITE_CONFIG.url
  const feasibility = localizedHref(SSD_LANDING.feasibility, 'zh')
  const victoriaRules = localizedHref(SSD_LANDING.victoriaRules, 'zh')
  const overview = localizedHref(SSD_LANDING.overview, 'zh')
  const peninsula = localizedHref('/backyard-small-second-home/mornington-peninsula', 'zh')
  return (
    <main className="min-h-screen bg-bg">
      <SsdPageHero
        title="这条路径适合你吗？"
        explainer="用本页在投入设计前先对照 SSD 框架做一轮自检——若落入中间地带，再运行可行性筛查。"
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
              definition="SSD 更适合能在硬红线内施工的业主——不适合分拆出售地块、临街主房前方再摆第二栋，或必须把第二居所做到 60㎡ 建面以上。"
              facts={[
                '强匹配信号：同一维州住宅用地产权、坐落主房前墙内侧、全屋电气且第二居所建面≤60㎡。',
                '弱匹配信号：分拆出售独立产权、建面需求大于 60㎡、向单元通配送燃气，或必须把第二居所放在前院临街展示位。',
                '灰色地带：各类规划覆盖层与坡度——请以可行性筛查与 title 实测为准，而不要仅凭本清单。',
              ]}
              sources={[
                { label: '维州 SSD 规则', href: `${baseUrl}${victoriaRules}` },
                { label: '莫宁顿半岛语境', href: `${baseUrl}${peninsula}` },
                { label: '可行性筛查', href: `${baseUrl}${feasibility}` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdPageShare path="/zh/backyard-small-second-home/is-this-for-you" className="mt-8" />
            <SsdFunnelNextSteps
              sentence="本页是入口筛选——产权与 overlay 仍需正式核验。"
              hubLabel="查看 SSD 中文总览"
              feasibilityLabel="运行可行性筛查"
              feasibilityHref={feasibility}
              overviewHref={overview}
            />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              若以 Blackwood Retreat、Skylark Pavilion 等命名的示意房型为参考，见{' '}
              <Link href={`${overview}#ssd-house-archetypes`} className="font-medium text-accent underline-offset-4 hover:underline">
                SSD 中文总览的房型版块
              </Link>
              。
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-10">
            <div>
              <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">通常比较匹配</h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-base leading-relaxed text-muted">
                <li>你在维州拥有一宗（或将要交割）住宅用地，并希望第二居所始终停在同一产权证上。</li>
                <li>能够在主房前墙线后方布置建面不大于 60㎡（GFA）、全屋电气的小单元。</li>
                <li>希望在锁死施工图之前搞清楚规划报批路径怎么走。</li>
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">通常不太匹配</h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-base leading-relaxed text-muted">
                <li>你需要把第二居所单独分拆、以独立小块出售。</li>
                <li>第二居所的建面必须明显高于 60㎡。</li>
                <li>你希望向单元通配送燃气或把第二居所作为主要临街展示建筑而违反坐落规则。</li>
              </ul>
            </div>
            <p className="text-base leading-relaxed text-muted">
              现实中的地块往往在覆盖层、丛林火灾、遗迹或坡度上留有变量。若落在中间带，可行性筛查更合适——它被设计成处理路径推断，而非灵感展板。
            </p>
          </div>
        </div>
      </section>

      <SsdFunnelReturn
        primaryHref={feasibility}
        secondaryHref={overview}
        visitHref={localizedHref('/visit', 'zh')}
        heading="选一个下一步"
        body="仍旧犹豫？先做互动筛查。想先看成文规章？打开维州规则页再返回。"
        primaryLabel="运行可行性筛查"
        secondaryLabel="查看 SSD 中文总览"
        visitLabel="了解到访庄园"
      />
    </main>
  )
}
