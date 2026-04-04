import React from 'react'
import { type SiteLocale } from '@/lib/language-routing'

type Props = {
  title?: string | null
  src: string
  note?: React.ReactNode
  speakers?: string[]
  durationLabel?: string | null
  compact?: boolean
  locale?: SiteLocale
}

export function EditorialAudioPlayer({
  title,
  src,
  note,
  speakers = [],
  durationLabel,
  compact = false,
  locale = 'en',
}: Props) {
  return (
    <section
      className={`rounded-3xl border border-border bg-natural-200 shadow-md dark:border-border dark:bg-surface ${
        compact ? 'p-5' : 'p-6 md:p-7'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-accent">{locale === 'zh' ? '收听' : 'Listen'}</p>
          {title ? (
            <h2 className={`mt-2 font-serif font-semibold text-fg ${compact ? 'text-xl' : 'text-2xl'}`}>
              {title}
            </h2>
          ) : null}
        </div>
        {(speakers.length || durationLabel) ? (
          <div className="text-right text-[13px] uppercase tracking-[0.14em] text-fg/82 dark:text-white/82 md:text-xs">
            {speakers.length ? <p>{speakers.join(', ')}</p> : null}
            {durationLabel ? <p className={speakers.length ? 'mt-1' : ''}>{durationLabel}</p> : null}
          </div>
        ) : null}
      </div>

      <audio controls preload="none" src={src} className="mt-4 w-full" />

      {note ? (
        <div className={`text-fg/90 dark:text-white/90 ${compact ? 'mt-3 text-[15px] leading-7 md:text-sm' : 'mt-4 text-[1.02rem] leading-8 md:text-base'}`}>{note}</div>
      ) : null}
    </section>
  )
}
