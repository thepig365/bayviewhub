import Link from 'next/link'
import { JournalCard } from '@/components/editorial/JournalCard'
import { JournalSubscribePanel } from '@/components/editorial/JournalSubscribePanel'
import {
  editorialHasChineseCardContent,
  groupEditorialEntries,
  MENDPRESS_CATEGORY_LINKS,
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
  sectionEyebrow = 'Mendpress',
  viewSectionLabel = 'View section',
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
  })
  const entries =
    locale === 'zh'
      ? [...rawEntries].sort((a, b) => Number(editorialHasChineseCardContent(b)) - Number(editorialHasChineseCardContent(a)))
      : rawEntries
  const [featured, ...rest] = entries
  const sections = !activeSection ? groupEditorialEntries(rest, locale) : []
  const categoryLinks = chips || MENDPRESS_CATEGORY_LINKS.map((item) => ({ ...item, href: localizedHref(item.href, locale) }))

  return (
    <main className="min-h-screen bg-bg py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="eyebrow text-accent">{eyebrow}</p>
            <h1 className="mt-4 text-balance text-4xl font-serif font-semibold text-fg md:text-6xl">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted">{intro}</p>
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
                      'rounded-full px-5 py-2 text-sm transition-colors',
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
              <div className="mt-12">
                <JournalCard entry={featured} featured locale={locale} />
              </div>

              {activeSection && rest.length ? (
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  {rest.map((entry) => (
                    <JournalCard key={entry.id} entry={entry} locale={locale} />
                  ))}
                </div>
              ) : null}

              {!activeSection && sections.length ? (
                <div className="mt-14 space-y-14">
                  {sections.map((section) => (
                    <section key={section.id}>
                      <div className="mb-6">
                        <div>
                          <p className="eyebrow text-accent">{sectionEyebrow}</p>
                          <h2 className="mt-2 text-3xl font-serif font-semibold text-fg">
                            {section.label}
                          </h2>
                          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                            {section.description}
                          </p>
                          <div className="mt-3">
                            <Link href={localizedHref(section.path, locale)} className="text-sm text-fg underline underline-offset-4 hover:text-accent">
                              {viewSectionLabel}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {section.entries.slice(0, 3).map((entry) => (
                          <JournalCard key={entry.id} entry={entry} locale={locale} />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <section className="mt-12 rounded-3xl border border-dashed border-border bg-natural-50 px-6 py-16 text-center dark:border-border dark:bg-surface">
              <h2 className="text-3xl font-serif font-semibold text-fg">
                {emptyTitle || (activeSection ? `${title} is not published yet.` : 'Mendpress is opening.')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted">
                {emptyBody ||
                  (activeSection
                    ? `Publish the first piece for ${title.toLowerCase()} and it will appear here.`
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
