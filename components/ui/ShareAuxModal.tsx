'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { type SiteLocale } from '@/lib/language-routing'
import { buildPreparedShareText, sharePageQrImageUrl } from '@/lib/share-links'
import { cn } from '@/lib/utils'

export type ShareAuxModalVariant = 'wechat' | 'rednote' | 'douyin'

type ShareAuxModalProps = {
  open: boolean
  variant: ShareAuxModalVariant | null
  title: string
  summary?: string
  url: string
  onClose: () => void
  onCopyLink: () => void
  copied: boolean
  isDarkSurface?: boolean
  locale?: SiteLocale
}

const copy: Record<
  ShareAuxModalVariant,
  {
    title: string
    body: string
    showQr: boolean
    titleZh: string
    bodyZh: string
    platformLabel: string
    platformLabelZh: string
  }
> = {
  wechat: {
    title: 'WeChat',
    body: 'There is no reliable “share to WeChat” button in the browser. Scan the code with WeChat to open this page on your phone, or copy the link and paste it into a chat.',
    showQr: true,
    titleZh: '微信',
    bodyZh: '浏览器里没有稳定可用的“分享到微信”按钮。你可以用微信扫描二维码在手机上打开这个页面，或先复制链接，再粘贴到聊天窗口。',
    platformLabel: 'WeChat',
    platformLabelZh: '微信',
  },
  rednote: {
    title: 'RedNote',
    body: 'RedNote does not offer a reliable universal web share URL for external pages. Use the prepared share text below, copy the link, or scan the code on your phone and then paste the material into a note or message inside the app.',
    showQr: true,
    titleZh: 'RedNote（小红书）',
    bodyZh: 'RedNote 没有为外部网页提供可靠的通用网页分享链接。你可以使用下面准备好的分享文案，先复制链接，或用手机扫码打开页面，再把内容粘贴到 app 内的笔记或私信里。',
    platformLabel: 'RedNote',
    platformLabelZh: 'RedNote',
  },
  douyin: {
    title: 'Douyin',
    body: 'Douyin does not provide a lightweight universal website share action for arbitrary pages. Use the prepared share text, copy the page link, or scan the QR code on your phone and bring the material into Douyin manually if you want to reference this page there.',
    showQr: true,
    titleZh: '抖音',
    bodyZh: '抖音没有为任意网页提供轻量通用的网站分享按钮。若你要在抖音里引用这个页面，请使用下面准备好的分享文案、复制页面链接，或先用手机扫码打开页面，再手动带入抖音。',
    platformLabel: 'Douyin',
    platformLabelZh: '抖音',
  },
}

export function ShareAuxModal({
  open,
  variant,
  title: pageTitleProp,
  summary,
  url,
  onClose,
  onCopyLink,
  copied,
  isDarkSurface = false,
  locale = 'en',
}: ShareAuxModalProps) {
  const [copiedPack, setCopiedPack] = useState(false)
  const [copiedSummary, setCopiedSummary] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setCopiedPack(false)
      setCopiedSummary(false)
    }
  }, [open])

  if (!open || !variant) return null

  const cfg = copy[variant]
  const qrSrc = sharePageQrImageUrl(url, 200)
  const modalTitle = locale === 'zh' ? cfg.titleZh : cfg.title
  const body = locale === 'zh' ? cfg.bodyZh : cfg.body
  const pageTitle = cleanText(pageTitleProp || summary || '')
  const pageSummary = (summary || '').trim()
  const preparedText = useMemo(
    () =>
      buildPreparedShareText({
        title: pageTitle,
        summary: pageSummary,
        url,
      }),
    [pageSummary, pageTitle, url]
  )

  async function copyPreparedText() {
    try {
      await navigator.clipboard.writeText(preparedText)
      setCopiedPack(true)
      window.setTimeout(() => setCopiedPack(false), 2500)
    } catch {
      setCopiedPack(false)
    }
  }

  async function copySummaryOnly() {
    if (!pageSummary) return
    try {
      await navigator.clipboard.writeText(pageSummary)
      setCopiedSummary(true)
      window.setTimeout(() => setCopiedSummary(false), 2500)
    } catch {
      setCopiedSummary(false)
    }
  }

  const btnClass = cn(
    'rounded-lg px-4 py-2.5 text-[15px] leading-6 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:text-sm sm:leading-5',
    isDarkSurface
      ? 'bg-white/10 text-white hover:bg-white/15 focus-visible:ring-white/40 focus-visible:ring-offset-neutral-900'
      : 'bg-natural-100 text-fg hover:bg-natural-200 focus-visible:ring-accent/40 focus-visible:ring-offset-white dark:bg-white/10 dark:text-white dark:hover:bg-white/15 dark:focus-visible:ring-offset-neutral-900'
  )

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/50 p-4 sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-aux-title"
        className={cn(
          'max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-xl border p-5 shadow-xl',
          isDarkSurface
            ? 'border-white/15 bg-neutral-900 text-white'
            : 'border-border bg-white text-fg dark:border-neutral-700 dark:bg-surface dark:text-white'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="share-aux-title" className="font-serif text-lg font-semibold">
          {modalTitle}
        </h3>
        <p className="mt-3 text-[15px] leading-7 text-muted dark:text-white/70 sm:text-sm sm:leading-relaxed">{body}</p>
        <div
          className={cn(
            'mt-4 rounded-lg border p-4',
            isDarkSurface
              ? 'border-white/10 bg-white/5'
              : 'border-border bg-natural-50 dark:border-white/10 dark:bg-white/5'
          )}
        >
          <p className="text-[12px] uppercase tracking-[0.16em] text-muted dark:text-white/55">
            {locale === 'zh' ? `${cfg.platformLabelZh} 分享信息` : `${cfg.platformLabel} sharing pack`}
          </p>
          <h4 className="mt-2 text-base font-medium text-fg dark:text-white">{pageTitle}</h4>
          {pageSummary ? (
            <p className="mt-2 text-[14px] leading-6 text-muted dark:text-white/70">{pageSummary}</p>
          ) : null}
          <p className="mt-3 break-all text-[13px] leading-6 text-fg/82 dark:text-white/72">{url}</p>
        </div>
        {cfg.showQr ? (
          <>
            <div className="mt-4 flex justify-center rounded-lg border border-border bg-white p-3 dark:border-white/10 dark:bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element -- external QR API, no next/image remote config */}
              <img src={qrSrc} alt="" width={200} height={200} className="h-[200px] w-[200px]" />
            </div>
            <p className="mt-3 text-[13px] leading-6 text-muted dark:text-white/60">
              {locale === 'zh'
                ? '建议先用手机扫码打开当前页面，再把链接或准备好的文案带入对应 app。'
                : 'Best used as a phone-first handoff: scan to open this page on mobile, then bring the link or prepared text into the app.'}
            </p>
          </>
        ) : null}
        <p className="sr-only" id="share-aux-url">
          {url}
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button type="button" className={btnClass} onClick={onCopyLink}>
            {copied ? (locale === 'zh' ? '链接已复制' : 'Link copied') : locale === 'zh' ? '复制链接' : 'Copy link'}
          </button>
          <button type="button" className={btnClass} onClick={copyPreparedText}>
            {copiedPack
              ? locale === 'zh'
                ? '标题摘要链接已复制'
                : 'Title, summary, and link copied'
              : locale === 'zh'
                ? '复制标题+摘要+链接'
                : 'Copy title + summary + link'}
          </button>
          {pageSummary ? (
            <button type="button" className={btnClass} onClick={copySummaryOnly}>
              {copiedSummary
                ? locale === 'zh'
                  ? '摘要已复制'
                  : 'Summary copied'
                : locale === 'zh'
                  ? '只复制摘要'
                  : 'Copy summary only'}
            </button>
          ) : null}
          <button
            type="button"
            className={cn(btnClass, 'border border-border bg-transparent dark:border-white/20')}
            onClick={onClose}
          >
            {locale === 'zh' ? '关闭' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  )
}

function cleanText(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}
