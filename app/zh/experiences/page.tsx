import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { localizedHref } from '@/lib/language-routing'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

const FEATURED_EXPERIENCES = [
  {
    title: 'Mendpress',
    body: 'Bayview Hub 的编辑发布层。适合先理解这个地方在想什么、关心什么，以及它如何把艺术、修复与真实场所连接起来。',
    href: '/mendpress',
    label: '进入 Mendpress',
  },
  {
    title: '工作坊',
    body: '以创作、材料经验与慢下来的节奏为核心，不追求喧闹活动感，而是更安静、更有支持性的参与方式。',
    href: '/workshops',
    label: '查看工作坊',
  },
  {
    title: '可食花园',
    body: '围绕种植、照护、收成与家庭参与的项目方向。它更接近生活实践，而不只是一次性活动。',
    href: '/edible-gardens',
    label: '了解可食花园',
  },
  {
    title: '到访 Bayview Hub',
    body: '如果你更想先从实体场所开始，先看地址、开放时间、路线和周边安排会更实际。',
    href: '/visit',
    label: '规划到访',
  },
]

const EXTERNAL_EXPERIENCES = [
  {
    title: 'Pig & Whistle 餐饮',
    body: '庄园餐饮、酒庄氛围与更日常的会面场景。',
    href: SITE_CONFIG.pigAndWhistleUrl,
    label: '打开外部页面',
  },
  {
    title: 'The Shed 现场音乐',
    body: '以音乐为核心的公共聚集经验，仍保留外部平台信息为准。',
    href: 'https://www.thepigandwhistle.com.au/what-s-on',
    label: '查看演出信息',
  },
  {
    title: '艺术画廊',
    body: '在线浏览作品、私人观看与收藏路径目前仍以画廊独立页面为主。',
    href: 'https://gallery.bayviewhub.me',
    label: '进入画廊',
  },
]

export const metadata: Metadata = genMeta({
  title: `Bayview Hub 体验总览 | ${SITE_CONFIG.name}`,
  description:
    'Bayview Hub 中文体验总览：从 Mendpress、工作坊、可食花园到到访信息，帮助你理解这个地方目前可进入的主要路径。',
  path: '/zh/experiences',
})

export default function ChineseExperiencesPage() {
  return (
    <main className="min-h-screen bg-bg py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="eyebrow text-accent">体验总览</p>
            <h1 className="mt-4 text-balance text-4xl font-serif font-semibold text-fg md:text-6xl">
              如何进入 Bayview Hub
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-fg/80 dark:text-white/80">
              这里不是把所有东西都塞进一个“景点菜单”。更好的进入方式，是先判断你想从阅读、到访、参与、合作还是项目路径开始。
            </p>
          </div>

          <section className="mt-12">
            <h2 className="text-3xl font-serif font-semibold text-fg">中文模式下可直接进入的主要路径</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {FEATURED_EXPERIENCES.map((item) => (
                <article key={item.href} className="rounded-3xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-surface">
                  <h3 className="text-2xl font-serif font-semibold text-fg">{item.title}</h3>
                  <p className="mt-3 text-base leading-8 text-fg/80 dark:text-white/80">{item.body}</p>
                  <div className="mt-5">
                    <Button href={localizedHref(item.href, 'zh')} variant="outline">
                      {item.label}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-3xl border border-border bg-natural-50 p-8 dark:border-border dark:bg-surface">
            <p className="eyebrow text-accent">补充说明</p>
            <h2 className="mt-3 text-3xl font-serif font-semibold text-fg">哪些内容仍以外部或英文页面为准</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-fg/80 dark:text-white/80">
              一些平台型信息，例如餐厅预订、演出排期与画廊独立系统，目前仍保留各自的原始页面。中文入口会尽量保持语境清楚，但不会假装这些系统已经全部完成双语化。
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {EXTERNAL_EXPERIENCES.map((item) => (
                <article key={item.href} className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-bg/60">
                  <h3 className="text-xl font-serif font-semibold text-fg">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-fg/80 dark:text-white/80">{item.body}</p>
                  <div className="mt-4">
                    <Button href={item.href} variant="outline" external>
                      {item.label}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-14 text-center">
            <p className="mx-auto max-w-3xl text-base leading-8 text-fg/80 dark:text-white/80">
              如果你更想先理解 Bayview Hub 的背景与方向，可以先阅读关于我们；如果你已经接近实际决策阶段，则更适合直接查看合作或投资路径。
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button href="/zh/about" variant="primary">
                阅读关于我们
              </Button>
              <Button href="/zh/partners" variant="outline">
                查看合作路径
              </Button>
              <Button href="/zh/invest" variant="outline">
                查看投资信息
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
