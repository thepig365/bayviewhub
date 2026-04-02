'use client'

import React, { useMemo, useState } from 'react'
import {
  buildEditorialLinkedInPack,
  type EditorialLinkedInPackSource,
} from '@/lib/editorial'

type Props = {
  source: EditorialLinkedInPackSource
  compact?: boolean
}

export function LinkedInPackPanel({ source, compact = false }: Props) {
  const pack = useMemo(() => buildEditorialLinkedInPack(source), [source])
  const [copiedKey, setCopiedKey] = useState<'post' | 'hook' | 'url' | null>(null)

  const copyValue = async (key: 'post' | 'hook' | 'url', value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 2000)
    } catch {
      setCopiedKey(null)
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-border bg-white px-4 py-3 text-sm leading-7 text-fg dark:border-border dark:bg-neutral-950'

  return (
    <section className="rounded-2xl border border-border bg-natural-50 p-5 dark:border-border dark:bg-surface">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-accent">Distribution</p>
          <h2 className="mt-2 text-2xl font-serif font-semibold text-fg">LinkedIn pack</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
            Manual posting pack for published Mendpress articles. Review, copy, and post without needing LinkedIn API automation.
          </p>
        </div>
        <a
          href="https://www.linkedin.com/feed/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border px-4 py-2 text-sm text-fg transition-colors hover:border-accent dark:border-border"
        >
          Open LinkedIn
        </a>
      </div>

      <div className="mt-5 grid gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-fg">Primary LinkedIn Post</label>
          <textarea readOnly rows={compact ? 8 : 11} value={pack.primaryPost} className={fieldClass} />
          <div className="mt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => copyValue('post', pack.primaryPost)}
              className="text-sm text-fg underline underline-offset-4 hover:text-accent"
            >
              {copiedKey === 'post' ? 'Main post copied' : 'Copy main post'}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-fg">Short Hook Version</label>
          <textarea readOnly rows={compact ? 3 : 4} value={pack.shortHook} className={fieldClass} />
          <div className="mt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => copyValue('hook', pack.shortHook)}
              className="text-sm text-fg underline underline-offset-4 hover:text-accent"
            >
              {copiedKey === 'hook' ? 'Short hook copied' : 'Copy short hook'}
            </button>
          </div>
        </div>

        <div className={compact ? 'grid gap-4' : 'grid gap-4 md:grid-cols-2'}>
          <div>
            <label className="mb-2 block text-sm font-medium text-fg">Article Title</label>
            <div className={fieldClass}>{pack.articleTitle}</div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-fg">Article URL</label>
            <div className="flex flex-wrap items-center gap-3">
              <div className={`${fieldClass} min-w-0 flex-1 break-all`}>{pack.articleUrl}</div>
              <button
                type="button"
                onClick={() => copyValue('url', pack.articleUrl)}
                className="text-sm text-fg underline underline-offset-4 hover:text-accent"
              >
                {copiedKey === 'url' ? 'URL copied' : 'Copy URL'}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-fg">Suggested Image Note</label>
          <div className={fieldClass}>{pack.suggestedImageNote}</div>
        </div>
      </div>
    </section>
  )
}
