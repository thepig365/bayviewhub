'use client'

import React, { useState } from 'react'
import { type SiteLocale } from '@/lib/language-routing'
import { ShareStrip } from '@/components/ui/ShareStrip'

type Props = {
  quote: string
  articleTitle: string
  articleUrl: string
  locale?: SiteLocale
}

export function EditorialPullQuote({ quote, articleTitle, articleUrl, locale = 'en' }: Props) {
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
      <p className="eyebrow text-accent">{locale === 'zh' ? '摘引' : 'Pull quote'}</p>
      <blockquote className="mt-4 max-w-3xl text-pretty font-serif text-2xl leading-10 text-fg md:text-[2rem] md:leading-[1.65]">
        {quote}
      </blockquote>
      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
        <button
          type="button"
          onClick={copyQuote}
          className="text-fg underline underline-offset-4 hover:text-accent"
        >
          {copied ? (locale === 'zh' ? '摘引已复制' : 'Quote copied') : locale === 'zh' ? '复制摘引' : 'Copy quote'}
        </button>
      </div>
      <ShareStrip
        url={articleUrl}
        mailtoSubject={`${articleTitle} | Mendpress`}
        mailtoIntro={locale === 'zh' ? `${quote}\n\n阅读全文：` : `${quote}\n\nRead the full piece:`}
        shortShareBlurb={quote}
        label={locale === 'zh' ? '分享文章' : 'Share article'}
        bordered
        className="mt-6"
        locale={locale}
      />
    </section>
  )
}
