'use client'

import React, { useState } from 'react'
import { ShareStrip } from '@/components/ui/ShareStrip'

type Props = {
  quote: string
  articleTitle: string
  articleUrl: string
}

export function EditorialPullQuote({ quote, articleTitle, articleUrl }: Props) {
  const [copied, setCopied] = useState(false)

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote}"`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="my-10 rounded-3xl border border-border bg-natural-50 px-6 py-8 dark:border-border dark:bg-surface md:px-8">
      <p className="eyebrow text-accent">Pull quote</p>
      <blockquote className="mt-4 max-w-3xl text-pretty font-serif text-2xl leading-10 text-fg md:text-[2rem] md:leading-[1.65]">
        {quote}
      </blockquote>
      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
        <button
          type="button"
          onClick={copyQuote}
          className="text-fg underline underline-offset-4 hover:text-accent"
        >
          {copied ? 'Quote copied' : 'Copy quote'}
        </button>
      </div>
      <ShareStrip
        url={articleUrl}
        mailtoSubject={`${articleTitle} | Mendpress`}
        mailtoIntro={`${quote}\n\nRead the full piece:`}
        shortShareBlurb={quote}
        label="Share article"
        bordered
        className="mt-6"
      />
    </section>
  )
}
