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
    <section className="my-12 rounded-[2rem] border border-border bg-white px-6 py-8 shadow-sm dark:border-border dark:bg-surface md:px-10 md:py-10">
      <p className="eyebrow text-accent">{locale === 'zh' ? '摘引' : 'Pull quote'}</p>
      <blockquote className="mt-5 max-w-3xl text-pretty font-serif text-[1.9rem] leading-[1.65] text-fg md:text-[2.35rem]">
        {quote}
      </blockquote>
      <div className="mt-5 flex flex-wrap items-center gap-4 text-[15px] leading-6 md:text-sm md:leading-5">
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
