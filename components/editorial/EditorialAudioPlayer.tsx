import React from 'react'

type Props = {
  title?: string | null
  src: string
  note?: React.ReactNode
  speakers?: string[]
  durationLabel?: string | null
  compact?: boolean
}

export function EditorialAudioPlayer({
  title,
  src,
  note,
  speakers = [],
  durationLabel,
  compact = false,
}: Props) {
  return (
    <section
      className={`rounded-3xl border border-border bg-natural-50 dark:border-border dark:bg-surface ${
        compact ? 'p-5' : 'p-6 md:p-7'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-accent">Listen</p>
          {title ? (
            <h2 className={`mt-2 font-serif font-semibold text-fg ${compact ? 'text-xl' : 'text-2xl'}`}>
              {title}
            </h2>
          ) : null}
        </div>
        {(speakers.length || durationLabel) ? (
          <div className="text-right text-xs uppercase tracking-[0.14em] text-muted">
            {speakers.length ? <p>{speakers.join(', ')}</p> : null}
            {durationLabel ? <p className={speakers.length ? 'mt-1' : ''}>{durationLabel}</p> : null}
          </div>
        ) : null}
      </div>

      <audio controls preload="none" src={src} className="mt-4 w-full" />

      {note ? (
        <div className={`text-muted ${compact ? 'mt-3 text-sm leading-7' : 'mt-4 text-base leading-8'}`}>{note}</div>
      ) : null}
    </section>
  )
}
