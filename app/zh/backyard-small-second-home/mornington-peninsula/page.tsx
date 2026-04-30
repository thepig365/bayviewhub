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
    title: `莫宁顿半岛第二小住宅承建语境 | Main Ridge Bayview Hub | ${SITE_CONFIG.name}`,
    description:
      '莫宁顿半岛上的小型第二居所：绿地楔、丛林火灾、海岸线等叠加图层如何改写 SSD 报批路径——Bayview Hub 位于 Main Ridge。',
    path: `${ZH}/mornington-peninsula`,
  }),
  title: {
    absolute: '莫宁顿半岛第二小住宅承建语境 | Main Ridge｜Bayview Hub',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Bayview Hub',
  description:
    '莫宁顿半岛小型第二居所设计与建造语境；在 VC253/VC282 框架内讨论合规的 60㎡ SSD。',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '365 Purves Road',
    addressLocality: 'Main Ridge',
    addressRegion: 'VIC',
    postalCode: '3928',
    addressCountry: 'AU',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Victoria, Australia' },
    { '@type': 'City', name: 'Mornington Peninsula' },
    { '@type': 'City', name: 'Main Ridge' },
    { '@type': 'City', name: 'Red Hill' },
    { '@type': 'City', name: 'Flinders' },
    { '@type': 'City', name: 'Sorrento' },
    { '@type': 'City', name: 'Portsea' },
  ],
}

const overlays = [
  { label: 'Green Wedge 绿地楔分区', detail: '额外的坐落与景观测试——常会改变报批路径。' },
  { label: '显著景观覆盖层（SLO）', detail: '可能在 SSD 体量合规的情况下仍触发规划许可。' },
  { label: '丛林火灾管理覆盖层（BMO）', detail: 'BAL 等级牵动设计造价与施工构造细节。' },
  { label: '遗迹覆盖层（Heritage）', detail: '即便只是第二居所，也往往意味着需要规划路径。' },
  { label: '洪水覆盖层', detail: '在确定平面图前可能需要工程评估。' },
  { label: '普通住宅用地（无额外图形覆盖层）', detail: '只要坐落与服务条件合适，SSD 往往更简单。' },
]

export default function MorningtonPeninsulaPageZh() {
  const baseUrl = SITE_CONFIG.url
  const feasibility = localizedHref(SSD_LANDING.feasibility, 'zh')
  const victoriaRules = localizedHref(SSD_LANDING.victoriaRules, 'zh')
  const overview = localizedHref(SSD_LANDING.overview, 'zh')
  return (
    <main className="min-h-screen bg-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <SsdPageHero
        title="莫宁顿半岛——为何仍要做一次认真场地阅读"
        explainer="州级 SSD 文字全维州一致，但半岛地块常被 Shire overlay、丛林火灾图层、坡度与服务条件改写故事。本节讲「通常是什么在改路径」——不是度假区宣传文案。"
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
              definition="Bayview Hub 坐落于 Main Ridge。我们会把 Peninsula 场地放在 Shire 图层与州级 SSD 测验之前一起读，再讨论设计切入点。"
              facts={[
                '绿地楔、SLO、BMO、遗迹与洪水图层，都可能让你在 Green Lane、VicSmart 或完整规划之间切换。',
                '我们仍先回到同一组硬线：60㎡、同一产权与全屋电气。',
              ]}
              sources={[
                { label: 'Mornington Peninsula Shire — Building & Planning', href: 'https://www.mornpen.vic.gov.au/Building-Planning' },
                { label: '维州 SSD 规则', href: `${baseUrl}${victoriaRules}` },
                { label: '可行性筛查', href: `${baseUrl}${feasibility}` },
              ]}
              lastUpdated={LAST_UPDATED}
            />
            <SsdPageShare path="/zh/backyard-small-second-home/mornington-peninsula" className="mt-8" />
            <SsdFunnelNextSteps
              sentence="最终书面意见仍以 Council officer 为准——我们帮你列出更现实的提问。"
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
          <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-muted">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">此地有何不同</h2>
            <p>
              半岛同时具备<strong className="text-fg">郊区农业用地规划、陡坡场地、林区火灾暴露与滨海基础设施天花板</strong>。
              「纸面合规」的 SSD 仍可能很贵——若车道、配电或给水需要大补。
            </p>
            <p>
              这并不等于 SSD 直接被否——而是代表<strong className="text-fg">第一次对话</strong>就要把图层与服务读进来，而不只看建面数字。
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-natural-50 py-12 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">图层清单（白话）</h2>
            <ul className="mt-6 space-y-3">
              {overlays.map(({ label, detail }) => (
                <li
                  key={label}
                  className="rounded-lg border border-border bg-white p-4 dark:bg-surface dark:border-border sm:p-5"
                >
                  <p className="font-medium text-fg">{label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted sm:text-base">{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-base leading-relaxed text-muted">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">展示屋</h2>
            <p className="mt-4">
              我们在庄园保留一座合规的小型第二居所样板间，可按预约步入体验——若你还未真正站在 60㎡ 平面尺度里会有所帮助。
            </p>
            <div className="mt-6">
              <Button href={`${localizedHref('/visit', 'zh')}#visit-info`} variant="outline" size="lg" className="w-full sm:w-auto">
                预约到访——开放时间 &amp; 联系方式
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-natural-50 py-12 dark:bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-xl font-semibold text-fg md:text-2xl">半岛物业快检</h2>
            <p className="mt-3 text-base text-muted">仍使用同一个可行性互动工具——在备注里写明 Peninsula overlays。</p>
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
