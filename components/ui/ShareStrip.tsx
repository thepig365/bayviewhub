'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  buildShareMailto,
  buildPreparedShareText,
  facebookShareUrl,
  linkedInShareUrl,
  twitterIntentShareUrl,
  whatsappShareUrl,
} from '@/lib/share-links'
import { type SiteLocale } from '@/lib/language-routing'
import { ShareAuxModal, type ShareAuxModalVariant } from '@/components/ui/ShareAuxModal'
import { cn } from '@/lib/utils'

export type ShareStripVariant = 'surface' | 'dark'

export interface ShareStripProps {
  /** Absolute URL of the page being shared */
  url: string
  shareTitle?: string
  shareSummary?: string
  mailtoSubject: string
  /** Short plain-text lines for the email body (URL is appended automatically) */
  mailtoIntro: string
  /** Optional line for X / WhatsApp prefills (defaults to a short slice of mailtoIntro) */
  shortShareBlurb?: string
  variant?: ShareStripVariant
  className?: string
  label?: string
  bordered?: boolean
  showSharingPackPanel?: boolean
  /** When set, adds data-ssd-share-channel on controls for SSD hub campaign capture */
  ssdCampaignShare?: boolean
  locale?: SiteLocale
}

const VISIBLE_SHARE_CHANNELS = ['copy_link', 'email', 'linkedin', 'facebook', 'x', 'more'] as const

export function ShareStrip({
  url,
  shareTitle,
  shareSummary,
  mailtoSubject,
  mailtoIntro,
  shortShareBlurb,
  variant = 'surface',
  className,
  label = 'Share',
  bordered = true,
  showSharingPackPanel = false,
  ssdCampaignShare = false,
  locale = 'en',
}: ShareStripProps) {
  const [copied, setCopied] = useState(false)
  const [copiedSummary, setCopiedSummary] = useState(false)
  const [copiedPack, setCopiedPack] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [sharingPackOpen, setSharingPackOpen] = useState(false)
  const [auxModal, setAuxModal] = useState<ShareAuxModalVariant | null>(null)
  const clearRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const moreWrapRef = useRef<HTMLDivElement>(null)

  const titleText = (shareTitle ?? mailtoSubject.split('|')[0] ?? '').trim()
  const summaryText = (shareSummary ?? shortShareBlurb ?? mailtoIntro).trim()
  const blurb = summaryText.slice(0, 220)
  const preparedShareText = buildPreparedShareText({
    title: titleText,
    summary: summaryText,
    url,
  })

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      if (clearRef.current) clearTimeout(clearRef.current)
      clearRef.current = setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }, [url])

  const copySummary = useCallback(async () => {
    if (!summaryText) return
    try {
      await navigator.clipboard.writeText(summaryText)
      setCopiedSummary(true)
      window.setTimeout(() => setCopiedSummary(false), 2500)
    } catch {
      setCopiedSummary(false)
    }
  }, [summaryText])

  const copySharePack = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(preparedShareText)
      setCopiedPack(true)
      window.setTimeout(() => setCopiedPack(false), 2500)
    } catch {
      setCopiedPack(false)
    }
  }, [preparedShareText])

  useEffect(() => {
    return () => {
      if (clearRef.current) clearTimeout(clearRef.current)
    }
  }, [])

  useEffect(() => {
    if (!moreOpen) return
    const onDocClick = (e: MouseEvent) => {
      if (moreWrapRef.current && !moreWrapRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [moreOpen])

  const mailtoHref = buildShareMailto({ subject: mailtoSubject, intro: mailtoIntro, url })
  const isDark = variant === 'dark'
  const copyLinkLabel = copied && !auxModal ? (locale === 'zh' ? '链接已复制' : 'Link copied') : locale === 'zh' ? '复制链接' : 'Copy link'
  const emailLabel = locale === 'zh' ? '邮件' : 'Email'
  const moreLabel = locale === 'zh' ? '更多' : 'More'
  const redNoteLabel = locale === 'zh' ? '小红书 / RedNote' : 'RedNote'
  const weChatLabel = locale === 'zh' ? '微信 / WeChat' : 'WeChat'
  const douyinLabel = locale === 'zh' ? '抖音 / Douyin' : 'Douyin'
  const shareGroupLabel = locale === 'zh' ? '分享此页面' : 'Share this page'
  const moreShareLabel = locale === 'zh' ? '更多分享选项' : 'More share options'
  const liveCopyText = copied ? (locale === 'zh' ? '页面链接已复制到剪贴板' : 'Page link copied to clipboard') : ''
  const showSharingPackToggleLabel = locale === 'zh' ? '显示分享文案' : 'Show sharing pack'
  const hideSharingPackToggleLabel = locale === 'zh' ? '收起分享文案' : 'Hide sharing pack'
  const sharingPackLabel = locale === 'zh' ? '分享文案' : 'Sharing pack'
  const sharingPackBody =
    locale === 'zh'
      ? '用于手动分享到 LinkedIn、RedNote、微信等平台。可直接查看、复制摘要，或复制整套标题、摘要和链接。'
      : 'Use this when posting manually to LinkedIn, RedNote, WeChat, or similar platforms. Read the current share title and summary, then copy the exact pack you want to paste.'
  const canonicalLabel = locale === 'zh' ? 'Canonical URL' : 'Canonical URL'
  const copySummaryLabel = copiedSummary ? (locale === 'zh' ? '摘要已复制' : 'Summary copied') : locale === 'zh' ? '复制摘要' : 'Copy summary'
  const copyPackLabel = copiedPack ? (locale === 'zh' ? '分享文案已复制' : 'Sharing pack copied') : locale === 'zh' ? '复制分享文案' : 'Copy share pack'

  const linkClass = cn(
    'inline-flex min-h-[44px] min-w-0 items-center text-[15px] leading-6 transition-colors underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm px-0.5 py-2 sm:min-h-0 sm:py-0 sm:text-sm sm:leading-5',
    isDark
      ? 'text-white/60 hover:text-white focus-visible:ring-white/40 focus-visible:ring-offset-family-navy'
      : 'text-fg/88 hover:text-accent focus-visible:ring-accent/40 focus-visible:ring-offset-natural-100 dark:text-white/88 dark:hover:text-white dark:focus-visible:ring-offset-neutral-900'
  )

  const labelClass = cn(
    'mb-3 text-[12px] font-medium uppercase tracking-[0.2em] md:text-[11px]',
    isDark ? 'text-white/40' : 'text-fg/72 dark:text-white/68'
  )

  const sepClass = cn('hidden select-none px-1 text-sm sm:inline', isDark ? 'text-white/25' : 'text-fg/28 dark:text-white/24')

  const menuItemClass = cn(
    'flex w-full min-h-[44px] items-center px-4 py-3 text-left text-[15px] leading-6 transition-colors focus:outline-none focus-visible:bg-natural-100 dark:focus-visible:bg-white/10 sm:text-sm sm:leading-5',
    isDark ? 'text-white/90 hover:bg-white/10' : 'text-fg hover:bg-natural-50 dark:text-white dark:hover:bg-white/10'
  )

  const menuWrap = cn(
    'absolute right-0 top-full z-50 mt-1 w-[min(100vw-2rem,16rem)] overflow-hidden rounded-lg border shadow-lg',
    isDark ? 'border-white/15 bg-neutral-900' : 'border-border bg-bg dark:border-neutral-700 dark:bg-surface'
  )

  const packWrapClass = cn(
    'mt-4 rounded-2xl border p-4 sm:p-5',
    isDark ? 'border-white/12 bg-white/[0.04]' : 'border-border bg-natural-50 dark:border-neutral-700 dark:bg-bg/50'
  )

  const packButtonClass = cn(
    'inline-flex min-h-[42px] items-center rounded-lg px-4 py-2.5 text-[15px] leading-6 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-h-0 sm:text-sm sm:leading-5',
    isDark
      ? 'bg-white/10 text-white hover:bg-white/15 focus-visible:ring-white/40 focus-visible:ring-offset-family-navy'
      : 'bg-white text-fg hover:bg-natural-100 focus-visible:ring-accent/40 focus-visible:ring-offset-natural-100 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 dark:focus-visible:ring-offset-neutral-900'
  )

  const openAux = (v: ShareAuxModalVariant) => {
    setMoreOpen(false)
    setAuxModal(v)
  }

  return (
    <div
      className={cn(
        bordered ? 'border-t pt-5' : 'pt-0',
        bordered ? (isDark ? 'border-white/15' : 'border-border dark:border-neutral-700') : '',
        className
      )}
    >
      <p className={labelClass}>{label}</p>
      <div
        className="flex flex-wrap items-center gap-x-0 gap-y-1 sm:gap-y-2"
        role="group"
        aria-label={shareGroupLabel}
        data-visible-share-channels={VISIBLE_SHARE_CHANNELS.join(',')}
      >
        <button
          type="button"
          onClick={copyLink}
          className={linkClass}
          {...(ssdCampaignShare ? { 'data-ssd-share-channel': 'copy_link' } : {})}
        >
          {copyLinkLabel}
        </button>
        <span className={sepClass} aria-hidden>
          ·
        </span>
        <a
          href={mailtoHref}
          className={linkClass}
          {...(ssdCampaignShare ? { 'data-ssd-share-channel': 'email' } : {})}
        >
          {emailLabel}
        </a>
        <span className={sepClass} aria-hidden>
          ·
        </span>
        <a
          href={linkedInShareUrl(url)}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          {...(ssdCampaignShare ? { 'data-ssd-share-channel': 'linkedin' } : {})}
        >
          LinkedIn
        </a>
        <span className={sepClass} aria-hidden>
          ·
        </span>
        <a
          href={facebookShareUrl(url)}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          {...(ssdCampaignShare ? { 'data-ssd-share-channel': 'facebook' } : {})}
        >
          Facebook
        </a>
        <span className={sepClass} aria-hidden>
          ·
        </span>
        <a
          href={twitterIntentShareUrl(url, blurb)}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          {...(ssdCampaignShare ? { 'data-ssd-share-channel': 'twitter' } : {})}
        >
          X
        </a>
        <span className={sepClass} aria-hidden>
          ·
        </span>
        <div className="relative inline-block" ref={moreWrapRef}>
          <button
            type="button"
            className={linkClass}
            aria-expanded={moreOpen}
            aria-haspopup="menu"
            onClick={() => setMoreOpen((o) => !o)}
          >
            {moreLabel}
          </button>
          {moreOpen ? (
            <div className={menuWrap} role="menu" aria-label={moreShareLabel}>
              <a
                role="menuitem"
                className={menuItemClass}
                href={whatsappShareUrl(url, blurb)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMoreOpen(false)}
                {...(ssdCampaignShare ? { 'data-ssd-share-channel': 'whatsapp' } : {})}
              >
                WhatsApp
              </a>
              <button
                type="button"
                role="menuitem"
                className={menuItemClass}
                onClick={() => openAux('wechat')}
                {...(ssdCampaignShare ? { 'data-ssd-share-channel': 'wechat' } : {})}
              >
                {weChatLabel}
              </button>
              <button
                type="button"
                role="menuitem"
                className={menuItemClass}
                onClick={() => openAux('rednote')}
                {...(ssdCampaignShare ? { 'data-ssd-share-channel': 'rednote' } : {})}
              >
                {redNoteLabel}
              </button>
              <button
                type="button"
                role="menuitem"
                className={menuItemClass}
                onClick={() => openAux('douyin')}
                {...(ssdCampaignShare ? { 'data-ssd-share-channel': 'douyin' } : {})}
              >
                {douyinLabel}
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {liveCopyText}
      </p>

      {showSharingPackPanel && (titleText || summaryText) ? (
        <div className={packWrapClass}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[12px] uppercase tracking-[0.16em] text-fg/68 dark:text-white/58">{sharingPackLabel}</p>
              <p className="mt-2 max-w-3xl text-[14px] leading-6 text-fg/82 dark:text-white/72">{sharingPackBody}</p>
            </div>
            <button
              type="button"
              className={linkClass}
              aria-expanded={sharingPackOpen}
              onClick={() => setSharingPackOpen((open) => !open)}
            >
              {sharingPackOpen ? hideSharingPackToggleLabel : showSharingPackToggleLabel}
            </button>
          </div>

          {sharingPackOpen ? (
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-base font-medium text-fg dark:text-white">{titleText}</p>
                {summaryText ? (
                  <p className="mt-2 text-[15px] leading-7 text-fg/86 dark:text-white/76 md:text-sm md:leading-6">{summaryText}</p>
                ) : null}
                <div className="mt-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-fg/58 dark:text-white/50">{canonicalLabel}</p>
                  <p className="mt-1 break-all text-[13px] leading-6 text-fg/80 dark:text-white/68">{url}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button type="button" onClick={copyLink} className={packButtonClass}>
                  {copyLinkLabel}
                </button>
                {summaryText ? (
                  <button type="button" onClick={copySummary} className={packButtonClass}>
                    {copySummaryLabel}
                  </button>
                ) : null}
                <button type="button" onClick={copySharePack} className={packButtonClass}>
                  {copyPackLabel}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <ShareAuxModal
        open={auxModal !== null}
        variant={auxModal}
        title={titleText}
        summary={summaryText}
        url={url}
        onClose={() => setAuxModal(null)}
        onCopyLink={copyLink}
        copied={copied}
        isDarkSurface={isDark}
        locale={locale}
      />
    </div>
  )
}
