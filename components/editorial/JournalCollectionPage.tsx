import Link from 'next/link'
import { JournalCard } from '@/components/editorial/JournalCard'
import { JournalSubscribePanel } from '@/components/editorial/JournalSubscribePanel'
import {
  groupEditorialEntries,
  JOURNAL_CATEGORY_LINKS,
  listPublishedEditorialEntries,
  type EditorialType,
} from '@/lib/editorial'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  title: string
  intro: string
  type?: EditorialType
}

export async function JournalCollectionPage({ eyebrow, title, intro, type }: Props) {
  const entries = await listPublishedEditorialEntries({ type, limit: 24 })
  const [featured, ...rest] = entries
  const sections = !type ? groupEditorialEntries(rest) : []

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

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {JOURNAL_CATEGORY_LINKS.map((item) => {
              const active =
                item.href === '/journal'
                  ? !type
                  : item.href.endsWith('/essays')
                    ? type === 'essay'
                    : item.href.endsWith('/field-notes')
                      ? type === 'field_note'
                      : item.href.endsWith('/profiles')
                        ? type === 'profile'
                        : item.href.endsWith('/invitations')
                          ? type === 'invitation'
                          : item.href.endsWith('/projects')
                            ? type === 'project_brief'
                            : false

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

          {featured ? (
            <>
              <div className="mt-12">
                <JournalCard entry={featured} featured />
              </div>

              {type && rest.length ? (
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  {rest.map((entry) => (
                    <JournalCard key={entry.id} entry={entry} />
                  ))}
                </div>
              ) : null}

              {!type && sections.length ? (
                <div className="mt-14 space-y-14">
                  {sections.map((section) => (
                    <section key={section.type}>
                      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <p className="eyebrow text-accent">Journal</p>
                          <h2 className="mt-2 text-3xl font-serif font-semibold text-fg">
                            {section.label}
                          </h2>
                          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                            {section.description}
                          </p>
                        </div>
                        <Link
                          href={section.entries[0]?.categoryPath || '/journal'}
                          className="text-sm text-fg underline underline-offset-4 hover:text-accent"
                        >
                          View all
                        </Link>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {section.entries.slice(0, 3).map((entry) => (
                          <JournalCard key={entry.id} entry={entry} />
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
                {type ? `${title} are not published yet.` : 'The Journal is opening.'}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted">
                {type
                  ? `Publish the first ${title.toLowerCase().replace(/\.$/, '')} from the private editorial workspace and it will appear here.`
                  : 'Publish the first piece from the private editorial workspace and it will appear here.'}
              </p>
            </section>
          )}

          <div className="mt-12">
            <JournalSubscribePanel />
          </div>
        </div>
      </div>
    </main>
  )
}
