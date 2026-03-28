'use client'

import React, { useEffect } from 'react'
import { sharePageQrImageUrl } from '@/lib/share-links'
import { cn } from '@/lib/utils'

export type ShareAuxModalVariant = 'wechat' | 'xiaohongshu' | 'messenger'

type ShareAuxModalProps = {
  open: boolean
  variant: ShareAuxModalVariant | null
  url: string
  onClose: () => void
  onCopyLink: () => void
  copied: boolean
  isDarkSurface?: boolean
}

const copy: Record<
  ShareAuxModalVariant,
  { title: string; body: string; showQr: boolean }
> = {
  wechat: {
    title: 'WeChat',
    body: 'There is no reliable “share to WeChat” button in the browser. Scan the code with WeChat to open this page on your phone, or copy the link and paste it into a chat.',
    showQr: true,
  },
  xiaohongshu: {
    title: 'Xiaohongshu (Little Red Book)',
    body: 'This platform does not offer a standard web share URL for external pages. Copy the link, open the Xiaohongshu app, and paste it into a note or DM. You can also scan the code on your phone to open the page in a browser.',
    showQr: true,
  },
  messenger: {
    title: 'Messenger',
    body: 'Messenger does not provide a universal web share link for arbitrary URLs. Copy the link below and paste it into a Messenger conversation.',
    showQr: false,
  },
}

export function ShareAuxModal({
  open,
  variant,
  url,
  onClose,
  onCopyLink,
  copied,
  isDarkSurface = false,
}: ShareAuxModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open || !variant) return null

  const cfg = copy[variant]
  const qrSrc = sharePageQrImageUrl(url, 200)

  const btnClass = cn(
    'rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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
          {cfg.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted dark:text-white/70">{cfg.body}</p>
        {cfg.showQr ? (
          <div className="mt-4 flex justify-center rounded-lg border border-border bg-white p-3 dark:border-white/10 dark:bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element -- external QR API, no next/image remote config */}
            <img src={qrSrc} alt="" width={200} height={200} className="h-[200px] w-[200px]" />
          </div>
        ) : null}
        <p className="sr-only" id="share-aux-url">
          {url}
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button type="button" className={btnClass} onClick={onCopyLink}>
            {copied ? 'Link copied' : 'Copy link'}
          </button>
          <button
            type="button"
            className={cn(btnClass, 'border border-border bg-transparent dark:border-white/20')}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
