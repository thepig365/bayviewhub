import Link from 'next/link'
import { JournalCard } from '@/components/editorial/JournalCard'
import { JournalSubscribePanel } from '@/components/editorial/JournalSubscribePanel'
import {
  editorialHasChineseCardContent,
  MENDPRESS_CATEGORY_LINKS,
  MENDPRESS_SECTION_IDS,
  MENDPRESS_SECTION_META,
  listPublishedEditorialEntries,
  type EditorialType,
  type MendpressSectionId,
} from '@/lib/editorial'
import { localizedHref, type SiteLocale } from '@/lib/language-routing'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  title: string
  intro: string
  types?: EditorialType[]
  activeSection?: MendpressSectionId
  locale?: SiteLocale
  chips?: Array<{ id: string; label: string; href: string }>
  sectionEyebrow?: string
  viewSectionLabel?: string
  emptyTitle?: string
  emptyBody?: string
  subscribeEyebrow?: string
  subscribeTitle?: string
  subscribeBody?: string
  subscribeCtaLabel?: string
  subscribeSecondaryLabel?: string
}

export async function JournalCollectionPage({
  eyebrow,
  title,
  intro,
  types,
  activeSection,
  locale = 'en',
  chips,
  sectionEyebrow = locale === 'zh' ? 'Mendpress 栏目' : 'Mendpress',
  viewSectionLabel = locale === 'zh' ? '进入栏目' : 'View section',
  emptyTitle,
  emptyBody,
  subscribeEyebrow,
  subscribeTitle,
  subscribeBody,
  subscribeCtaLabel,
  subscribeSecondaryLabel,
}: Props) {
  const rawEntries = await listPublishedEditorialEntries({
    types,
    type: types?.length === 1 ? types[0] : undefined,
    limit: 24,
    strictRecency: true,
  })
  const entries = rawEntries
  const introClass = locale === 'zh' ? 'text-fg/90 dark:text-white/90' : 'text-fg/88 dark:text-white/88'
  const sectionDescriptionClass = locale === 'zh' ? 'text-fg/88 dark:text-white/88' : 'text-fg/84 dark:text-white/84'
  const emptyBodyClass = locale === 'zh' ? 'text-fg/88 dark:text-white/88' : 'text-fg/84 dark:text-white/84'
  const [featured, ...rest] = entries
  const categoryLinks = chips || MENDPRESS_CATEGORY_LINKS.map((item) => ({ ...item, href: localizedHref(item.href, locale) }))
  const leadEyebrow = locale === 'zh' ? '最新发布' : 'Latest story'
  const streamTitle = locale === 'zh' ? '近期发布' : 'Recent stories'
  const streamBody =
    locale === 'zh'
      ? '按发布时间倒序浏览 Mendpress，沿着最近的编辑节奏继续向下阅读。'
      : 'Read Mendpress in descending publication order, with the newest piece leading the editorial flow.'
  const sectionRailTitle = locale === 'zh' ? '继续进入栏目' : 'Continue by section'
  const sectionRailBody =
    locale === 'zh'
      ? '如果你想按栏目继续阅读，可以从这里进入 Mendpress 的四个公开分区。'
      : 'If you want to keep reading by editorial mode, continue into one of the four Mendpress sections.'
  const sectionRail = !activeSection
    ? MENDPRESS_SECTION_IDS.map((id) => ({
        id,
        label: locale === 'zh' ? MENDPRESS_SECTION_META[id].zhLabel : MENDPRESS_SECTION_META[id].label,
        description: locale === 'zh' ? MENDPRESS_SECTION_META[id].zhDescription : MENDPRESS_SECTION_META[id].description,
        href: localizedHref(MENDPRESS_SECTION_META[id].path, locale),
      }))
    : []

  return (
    <main className="min-h-screen bg-bg py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="eyebrow text-accent">{eyebrow}</p>
            <h1 className="mt-4 text-balance text-4xl font-serif font-semibold text-fg md:text-6xl">
              {title}
            </h1>
            <p className={cn('mx-auto mt-5 max-w-3xl text-[1.06rem] leading-8 md:text-lg', introClass)}>{intro}</p>
          </div>

          <div className="mt-10">
            <div className="flex flex-wrap justify-center gap-3">
              {categoryLinks.map((item) => {
                const active = item.id === 'all' ? !activeSection : item.id === activeSection

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'rounded-full px-5 py-2.5 text-[15px] leading-6 transition-colors md:py-2 md:text-sm md:leading-5',
                      active
                        ? 'bg-primary-700 text-white'
                        : 'border border-border bg-white text-fg hover:border-accent dark:border-border dark:bg-surface'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {featured ? (
            <>
              <div className="mt-14">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="eyebrow text-accent">{leadEyebrow}</p>
                    <h2 className="mt-2 text-3xl font-serif font-semibold text-fg md:text-4xl">
                      {activeSection ? title : locale === 'zh' ? 'Mendpress 最新文章' : 'The current lead from Mendpress'}
                    </h2>
                  </div>
                  {featured.publishedAt ? (
                    <p className="text-[15px] leading-6 text-fg/82 dark:text-white/82 md:text-sm md:leading-5">
                      {locale === 'zh' ? '按发布时间排序' : 'Ordered by publication date'}
                    </p>
                  ) : null}
                </div>
                <JournalCard entry={featured} layout="lead" locale={locale} />
              </div>

              {rest.length ? (
                <section className="mt-16">
                  <div className="mb-6">
                    <p className="eyebrow text-accent">{sectionEyebrow}</p>
                    <h2 className="mt-2 text-3xl font-serif font-semibold text-fg md:text-4xl">
                      {streamTitle}
                    </h2>
                    <p className={cn('mt-3 max-w-3xl text-[1.02rem] leading-8 md:text-base', sectionDescriptionClass)}>
                      {streamBody}
                    </p>
                  </div>
                  <div className="space-y-0">
                    {rest.map((entry) => (
                      <JournalCard key={entry.id} entry={entry} layout="stream" locale={locale} />
                    ))}
                  </div>
                </section>
              ) : null}

              {!activeSection && sectionRail.length ? (
                <section className="mt-16 rounded-[2rem] border border-border bg-natural-100 p-6 shadow-md dark:border-border dark:bg-surface/95 md:p-8">
                  <p className="eyebrow text-accent">{locale === 'zh' ? 'Mendpress 栏目' : 'Mendpress sections'}</p>
                  <h2 className="mt-2 text-3xl font-serif font-semibold text-fg">{sectionRailTitle}</h2>
                  <p className={cn('mt-3 max-w-3xl text-base leading-8', sectionDescriptionClass)}>
                    {sectionRailBody}
                  </p>
                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {sectionRail.map((section) => (
                      <article key={section.id} className="rounded-3xl border border-border bg-natural-200 p-5 shadow-sm dark:border-border dark:bg-bg/60">
                        <p className="eyebrow text-accent">{locale === 'zh' ? '栏目入口' : 'Section'}</p>
                        <h3 className="mt-2 text-2xl font-serif font-semibold text-fg">{section.label}</h3>
                        <p className={cn('mt-3 text-[15px] leading-7 md:text-sm', sectionDescriptionClass)}>{section.description}</p>
                        <div className="mt-4">
                          <Link href={section.href} className="text-[15px] leading-6 text-fg underline underline-offset-4 hover:text-accent md:text-sm md:leading-5">
                            {viewSectionLabel}
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          ) : (
            <section className="mt-12 rounded-3xl border border-dashed border-border bg-natural-100 px-6 py-16 text-center shadow-sm dark:border-border dark:bg-surface">
              <h2 className="text-3xl font-serif font-semibold text-fg">
                {emptyTitle || (activeSection ? (locale === 'zh' ? `${title} 栏目尚未发布内容。` : `${title} is not published yet.`) : locale === 'zh' ? 'Mendpress 正在持续发布中。' : 'Mendpress is opening.')}
              </h2>
              <p className={cn('mx-auto mt-4 max-w-2xl text-[1.02rem] leading-8 md:text-base md:leading-7', emptyBodyClass)}>
                {emptyBody ||
                  (activeSection
                    ? locale === 'zh'
                      ? `当 ${title} 的第一篇内容发布后，它会出现在这里。`
                      : `Publish the first piece for ${title.toLowerCase()} and it will appear here.`
                    : locale === 'zh'
                      ? '当第一篇内容从私有编辑后台发布后，它会出现在这里。'
                      : 'Publish the first piece from the private editorial workspace and it will appear here.')}
              </p>
            </section>
          )}

          <div className="mt-12">
            <JournalSubscribePanel
              locale={locale}
              eyebrow={subscribeEyebrow}
              title={subscribeTitle}
              body={subscribeBody}
              ctaLabel={subscribeCtaLabel}
              secondaryLabel={subscribeSecondaryLabel}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
