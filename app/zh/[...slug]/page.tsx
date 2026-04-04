import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import {
  editorialSummaryForLocale,
  formatEditorialDate,
  getPublishedEditorialEntryBySlug,
  mendpressSectionLabelForLocale,
} from '@/lib/editorial'
import {
  routeLabelForChineseFallback,
  toEnglishPathname,
} from '@/lib/language-routing'

type Props = {
  params: Promise<{ slug: string[] }>
}

function englishUrl(pathname: string) {
  return `${SITE_CONFIG.url}${pathname === '/' ? '' : pathname}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const zhPath = `/zh/${slug.join('/')}`
  const englishPath = toEnglishPathname(zhPath)
  const routeLabel = routeLabelForChineseFallback(zhPath)

  return {
    title: `${routeLabel} | 中文入口`,
    description: `当前页面的正式中文版本尚未上线。你仍可从这里返回 ${routeLabel} 的英文原页。`,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: englishUrl(englishPath),
    },
    openGraph: {
      title: `${routeLabel} | 中文入口`,
      description: `当前页面的正式中文版本尚未上线。你仍可从这里返回 ${routeLabel} 的英文原页。`,
      url: `${SITE_CONFIG.url}${zhPath}`,
      locale: 'zh_CN',
      type: 'website',
    },
  }
}

export default async function ChineseFallbackPage({ params }: Props) {
  const { slug } = await params
  const zhPath = `/zh/${slug.join('/')}`
  const englishPath = toEnglishPathname(zhPath)
  const routeLabel = routeLabelForChineseFallback(zhPath)
  const isMendpressRoute = englishPath === '/mendpress' || englishPath.startsWith('/mendpress/')
  const mendpressSlug = englishPath.startsWith('/mendpress/') ? englishPath.slice('/mendpress/'.length) : ''
  const mendpressEntry =
    isMendpressRoute && mendpressSlug && !['editorial', 'dialogue', 'visual-narrative', 'reports'].includes(mendpressSlug)
      ? await getPublishedEditorialEntryBySlug(mendpressSlug)
      : null

  return (
    <main className="min-h-screen bg-bg py-16 md:py-20">
      <div className="container mx-auto px-4">
        <section className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-natural-100 px-6 py-10 shadow-md dark:border-border dark:bg-surface md:px-10">
          <p className="eyebrow text-accent">中文浏览</p>
          <h1 className="mt-4 text-balance font-serif text-4xl font-semibold text-fg md:text-5xl">
            {routeLabel}
          </h1>
          <p className="mt-5 max-w-3xl text-[1.08rem] leading-8 text-fg/90 dark:text-white/90 md:text-lg">
            这个页面已经接入全站中英切换，但当前路径的正式中文正文还未上线。你可以保留当前位置，
            也可以一键回到对应的英文原页继续阅读。
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={englishPath} variant="primary" size="md">
              打开英文原页
            </Button>
            <Button href="/zh" variant="outline" size="md">
              返回中文首页
            </Button>
            {isMendpressRoute ? (
              <Button href="/mendpress" variant="outline" size="md">
                打开 Mendpress 英文站
              </Button>
            ) : null}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-bg/70">
            <p className="text-[15px] font-medium leading-6 text-fg md:text-sm">当前路径</p>
            <p className="mt-2 break-all text-[15px] leading-7 text-fg/85 dark:text-white/85 md:text-sm">{zhPath}</p>
            <p className="mt-3 text-[15px] font-medium leading-6 text-fg md:text-sm">英文原页</p>
            <p className="mt-2 break-all text-[15px] leading-7 text-fg/85 dark:text-white/85 md:text-sm">{englishPath}</p>
          </div>

          {mendpressEntry ? (
            <section className="mt-8 rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-bg/70">
              <p className="eyebrow text-accent">Mendpress</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-fg">{mendpressEntry.title}</h2>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] leading-6 text-fg/82 dark:text-white/82 md:text-sm md:leading-5">
                <span>{mendpressSectionLabelForLocale(mendpressEntry.editorialType, 'zh')}</span>
                <span aria-hidden>·</span>
                <span>{formatEditorialDate(mendpressEntry.publishedAt, 'zh')}</span>
                {mendpressEntry.byline ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{mendpressEntry.byline}</span>
                  </>
                ) : null}
              </div>
              {editorialSummaryForLocale(mendpressEntry, 'zh') ? (
                <p className="mt-4 text-base leading-8 text-fg/90 dark:text-white/90">{editorialSummaryForLocale(mendpressEntry, 'zh')}</p>
              ) : null}
              <p className="mt-4 text-[15px] leading-7 text-fg/85 dark:text-white/85 md:text-sm">
                这篇 Mendpress 文章目前仍以英文发布。中文路由已经保留到该条目级别，方便访客在不中断上下文的情况下切换语言。
              </p>
            </section>
          ) : null}
        </section>
      </div>
    </main>
  )
}
