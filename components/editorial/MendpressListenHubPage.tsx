import Link from 'next/link'
import {
  editorialSummaryForLocale,
  editorialTitleForLocale,
  editorialTranscriptForLocale,
  editorialTypeLabelForLocale,
  formatEditorialDate,
  type MendpressAudioHubState,
  mendpressSectionLabelForLocale,
  type EditorialEntry,
} from '@/lib/editorial'
import { localizedHref, type SiteLocale } from '@/lib/language-routing'
import { cn } from '@/lib/utils'

function formatDuration(value: number | null, locale: SiteLocale): string | null {
  if (!value || value <= 0) return null
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const seconds = value % 60
  const stamp =
    hours > 0
      ? `${hours}:${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`
      : `${minutes}:${`${seconds}`.padStart(2, '0')}`
  return locale === 'zh' ? `${stamp} 音频` : `${stamp} audio`
}

function AudioHubCard({
  entry,
  locale,
}: {
  entry: EditorialEntry
  locale: SiteLocale
}) {
  const href = `${localizedHref(entry.path, locale)}#listen`
  const title = editorialTitleForLocale(entry, locale)
  const summary = editorialSummaryForLocale(entry, locale)
  const duration = formatDuration(entry.audioDurationSeconds, locale)
  const transcript = editorialTranscriptForLocale(entry, locale)

  return (
    <article className="rounded-[1.8rem] border border-border bg-natural-100 p-6 shadow-sm dark:border-border dark:bg-surface">
      <div className="flex flex-wrap items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-fg/72 dark:text-white/72">
        <span className="eyebrow text-accent">{mendpressSectionLabelForLocale(entry.editorialType, locale)}</span>
        <span aria-hidden>/</span>
        <span>{editorialTypeLabelForLocale(entry.editorialType, locale)}</span>
        <span aria-hidden>/</span>
        <span>Mendpress</span>
      </div>
      <h3 className="mt-4 text-balance font-serif text-2xl font-semibold text-fg">
        <Link href={href} className="transition-colors hover:text-accent">
          {title}
        </Link>
      </h3>
      <p className="mt-4 text-[1.02rem] leading-8 text-fg/90 dark:text-white/90">{summary}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] leading-6 text-fg/82 dark:text-white/82 md:text-sm md:leading-5">
        {duration ? <span>{duration}</span> : null}
        {duration ? <span aria-hidden>·</span> : null}
        <span>{formatEditorialDate(entry.publishedAt, locale)}</span>
        {transcript ? (
          <>
            <span aria-hidden>·</span>
            <span>{locale === 'zh' ? '提供 transcript' : 'Transcript available'}</span>
          </>
        ) : null}
      </div>
      <div className="mt-6">
        <Link href={href} className="font-medium text-fg underline underline-offset-4 hover:text-accent">
          {locale === 'zh' ? '立即收听' : 'Listen now'}
        </Link>
      </div>
    </article>
  )
}

export function MendpressListenHubPage({
  state,
  locale = 'en',
}: {
  state: MendpressAudioHubState
  locale?: SiteLocale
}) {
  const featured = state.featured
  const title = locale === 'zh' ? '在 Mendpress 收听' : 'Listen on Mendpress'
  const subtitle =
    locale === 'zh'
      ? '把 Mendpress 的对话、音频随笔与 spoken pieces 汇集在一起，为较慢的聆听而设。'
      : 'Conversations, audio essays, and spoken pieces from Mendpress — gathered in one place for slower listening.'
  const featuredTitle = locale === 'zh' ? '精选音频' : 'Featured audio'
  const conversationTitle = locale === 'zh' ? '最新对话' : 'Latest Conversations'
  const essayTitle = locale === 'zh' ? '音频随笔' : 'Audio Essays'
  const subscriptionTitle = locale === 'zh' ? '继续留在 Mendpress' : 'Stay with Mendpress'
  const subscriptionBody =
    locale === 'zh'
      ? '订阅 Mendpress，接收新的对话、随笔与后续编辑发布。'
      : 'Subscribe for new conversations, essays, and editorial pieces from Mendpress.'

  return (
    <main className="min-h-screen bg-bg py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <section className="rounded-[2.25rem] border border-border bg-natural-100 px-6 py-10 shadow-md dark:border-border dark:bg-surface md:px-10 md:py-14">
            <p className="eyebrow text-accent">Mendpress</p>
            <h1 className="mt-4 text-balance font-serif text-4xl font-semibold text-fg md:text-6xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-[1.06rem] leading-8 text-fg/90 dark:text-white/90 md:text-lg">
              {subtitle}
            </p>
          </section>

          {featured ? (
            <section className="mt-14">
              <div className="mb-6">
                <p className="eyebrow text-accent">{featuredTitle}</p>
              </div>
              <AudioHubCard entry={featured} locale={locale} />
            </section>
          ) : null}

          <section className="mt-16">
            <div className="mb-6">
              <p className="eyebrow text-accent">{locale === 'zh' ? 'Dialogue' : 'Dialogue'}</p>
              <h2 className="mt-2 text-3xl font-serif font-semibold text-fg md:text-4xl">{conversationTitle}</h2>
            </div>
            {state.podcastEpisodes.length ? (
              <div className={cn('grid gap-6', state.podcastEpisodes.length > 1 ? 'md:grid-cols-2' : '')}>
                {state.podcastEpisodes.map((entry) => (
                  <AudioHubCard key={entry.id} entry={entry} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="rounded-[1.8rem] border border-dashed border-border bg-natural-100 px-6 py-10 text-center shadow-sm dark:border-border dark:bg-surface">
                <p className="text-[15px] leading-7 text-fg/82 dark:text-white/82 md:text-sm">
                  {locale === 'zh'
                    ? '对话类音频会在准备好后加入这个 listening hub。'
                    : 'Conversation-led audio will appear here once it is published.'}
                </p>
              </div>
            )}
          </section>

          <section className="mt-16">
            <div className="mb-6">
              <p className="eyebrow text-accent">{locale === 'zh' ? 'Editorial' : 'Editorial'}</p>
              <h2 className="mt-2 text-3xl font-serif font-semibold text-fg md:text-4xl">{essayTitle}</h2>
            </div>
            {state.audioEssays.length ? (
              <div className={cn('grid gap-6', state.audioEssays.length > 1 ? 'md:grid-cols-2' : '')}>
                {state.audioEssays.map((entry) => (
                  <AudioHubCard key={entry.id} entry={entry} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="rounded-[1.8rem] border border-dashed border-border bg-natural-100 px-6 py-10 text-center shadow-sm dark:border-border dark:bg-surface">
                <p className="text-[15px] leading-7 text-fg/82 dark:text-white/82 md:text-sm">
                  {locale === 'zh'
                    ? '音频随笔会在准备好后加入这个 listening hub。'
                    : 'Audio essays will join this listening hub once they are published.'}
                </p>
              </div>
            )}
          </section>

          <section className="mt-16 rounded-[2rem] border border-border bg-natural-100 p-6 shadow-md dark:border-border dark:bg-surface md:p-8">
            <p className="eyebrow text-accent">Bayview Notes</p>
            <h2 className="mt-2 text-3xl font-serif font-semibold text-fg">{subscriptionTitle}</h2>
            <p className="mt-3 max-w-2xl text-[1.02rem] leading-8 text-fg/88 dark:text-white/88 md:text-base">
              {subscriptionBody}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href={localizedHref('/newsletter', locale)}
                className="inline-flex items-center rounded-full bg-primary-700 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-800"
              >
                {locale === 'zh' ? '进入通讯页' : 'Go to Newsletter'}
              </Link>
              <Link
                href={localizedHref('/mendpress', locale)}
                className="inline-flex items-center rounded-full border border-border px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent dark:border-border dark:text-white"
              >
                {locale === 'zh' ? '返回 Mendpress' : 'Return to Mendpress'}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
