import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/constants'
import { LAST_UPDATED } from '@/lib/seo'
import { localizedHref } from '@/lib/language-routing'
import { generateMetadata as genMeta } from '@/lib/utils'
import { AnswerCapsule } from '@/components/seo/AnswerCapsule'
import { ArtGalleryClient } from '../../../art-gallery/ArtGalleryClient'

const FP_DESCRIPTION_ZH =
  'Bayview 艺术美术馆创始策展合作关系：坐落于莫宁顿半岛约三十英亩的复合型庄园，融合餐饮、酒窖、音乐与园艺。不设商业地产式固定租金；以收益分成或类股权条款合作。站内提供访客证据；仅面向认真美术馆/策展运营方表达的意向征集。'

const capsuleHeadings = {
  quickAnswer: '要点速览',
  sources: '参考与来源',
  lastUpdatedPrefix: '最近更新：',
}

export const metadata: Metadata = {
  ...genMeta({
    title: `美术馆创始策展合作 | ${SITE_CONFIG.name}`,
    description: FP_DESCRIPTION_ZH,
    path: '/zh/art-gallery/founding-partners',
  }),
  title: {
    absolute: '美术馆创始策展合作 | Bayview Hub',
  },
  description: FP_DESCRIPTION_ZH,
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bayview 艺术美术馆 — 创始策展合作',
  description: '嵌入 Bayview Hub 庄园语境的策展运营合作；不设商业地产式固定租金，以收益为导向的条款结构。',
  provider: {
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
  areaServed: { '@type': 'State', name: 'Victoria', containedInPlace: { '@type': 'Country', name: 'Australia' } },
  offers: {
    '@type': 'Offer',
    description: '创始策展合作——收益分成或混合股权语境；不设商业地产式固定租金。',
  },
}

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '美术馆创始策展合作',
  description: FP_DESCRIPTION_ZH,
  url: `${SITE_CONFIG.url}/zh/art-gallery/founding-partners`,
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: '首页',
      item: SITE_CONFIG.url,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '美术馆创始合作',
      item: `${SITE_CONFIG.url}/zh/art-gallery/founding-partners`,
    },
  ],
}

export default function ArtGalleryFoundingPartnersPageZh() {
  const evidenceHref = localizedHref('/evidence/visitor-traffic', 'zh')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="min-h-screen bg-bg dark">
        <section className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/zh" className="flex items-center gap-3 group">
                <Image
                  src="/images/bayview-estate-logo.jpg"
                  alt="Bayview Estate"
                  width={120}
                  height={36}
                  className="h-10 w-auto md:h-12"
                />
                <span className="text-fg font-serif font-bold text-lg md:text-xl group-hover:text-accent transition-colors">
                  Bayview Hub
                </span>
              </Link>
              <Link
                href="/zh"
                className="text-sm text-muted hover:text-accent transition-colors uppercase tracking-wider"
              >
                ← 返回中文首页
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface/50">
          <div className="container mx-auto px-6 py-6">
            <div className="max-w-4xl mx-auto">
              <AnswerCapsule
                headings={capsuleHeadings}
                definition="坐落于 Bayview Hub 庄园（莫宁顿半岛）语境中的当代美术馆创始合作机会——面向策展/美术馆运营决策者。"
                facts={[
                  '嵌入复合型目的地语境（餐饮、酒窖门、音乐、园艺）。',
                  '预计每年访客可达 5 万以上（站内证据）。',
                  '收益分成或类股权语境；不设商业地产式固定租金。',
                  '创始策展人要负责展览管线、艺术家关系与销售协同。',
                ]}
                sources={[
                  { label: '线上美术馆', href: 'https://gallery.bayviewhub.me' },
                  { label: '访客流量证据', href: `${SITE_CONFIG.url}${evidenceHref}` },
                ]}
                lastUpdated={LAST_UPDATED}
                className="border-border bg-surface/50"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-bg py-12 md:py-14">
          <div className="container mx-auto max-w-4xl px-6">
            <h2 className="font-serif text-2xl font-semibold text-fg md:text-3xl">合作画像——三句话</h2>
            <ul className="mt-6 space-y-4 text-[1.05rem] leading-8 text-fg/90 dark:text-white/88">
              <li>
                <strong className="text-fg dark:text-white">创始策展 / 运营者</strong>
                ——负责展览管线、艺术家关系与销售策略，面对的是到访型受众，而非远程租户。
              </li>
              <li>
                <strong className="text-fg dark:text-white">商业结构</strong>
                ——收益分成或混合股权语境；不设商业地产式固定租金。条款在节目负荷与客群证据基础上协商。
              </li>
              <li>
                <strong className="text-fg dark:text-white">艺术家入口</strong>
                ——公开展示投稿仍在{' '}
                <a href="https://gallery.bayviewhub.me" className="text-accent underline underline-offset-4">
                  gallery.bayviewhub.me
                </a>
                ；本页仅限<strong>美术馆创始合作关系</strong>垂询，不处理单笔作品投递。
              </li>
            </ul>
            <p className="mt-8 text-base leading-7 text-muted">
              以证据驱动的访客语境见{' '}
              <Link href={evidenceHref} className="text-accent underline underline-offset-4">
                客流量页
              </Link>
              。下方表单仅服务于合作层面的意向征集。
            </p>
          </div>
        </section>

        <Suspense fallback={<div className="min-h-[80vh]" />}>
          <ArtGalleryClient locale="zh" />
        </Suspense>
      </div>
    </>
  )
}
