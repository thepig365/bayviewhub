'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  buildShareMailto,
  facebookShareUrl,
  linkedInShareUrl,
  twitterIntentShareUrl,
  whatsappShareUrl,
} from '@/lib/share-links'
import { ShareAuxModal, type ShareAuxModalVariant } from '@/components/ui/ShareAuxModal'
import { cn } from '@/lib/utils'

export type ShareStripVariant = 'surface' | 'dark'

export interface ShareStripProps {
  /** Absolute URL of the page being shared */
  url: string
  mailtoSubject: string
  /** Short plain-text lines for the email body (URL is appended automatically) */
  mailtoIntro: string
  /** Optional line for X / WhatsApp prefills (defaults to a short slice of mailtoIntro) */
  shortShareBlurb?: string
  variant?: ShareStripVariant
  className?: string
  /** When set, adds data-ssd-share-channel on controls for SSD hub campaign capture */
  ssdCampaignShare?: boolean
}

export function ShareStrip({
  url,
  mailtoSubject,
  mailtoIntro,
  shortShareBlurb,
  variant = 'surface',
  className,
  ssdCampaignShare = false,
}: ShareStripProps) {
  const [copied, setCopied] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [auxModal, setAuxModal] = useState<ShareAuxModalVariant | null>(null)
  const clearRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const moreWrapRef = useRef<HTMLDivElement>(null)

  const blurb = (shortShareBlurb ?? mailtoIntro).trim().slice(0, 220)

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

  const linkClass = cn(
    'inline-flex min-h-[44px] min-w-0 items-center text-sm transition-colors underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm px-0.5 py-2 sm:min-h-0 sm:py-0',
    isDark
      ? 'text-white/60 hover:text-white focus-visible:ring-white/40 focus-visible:ring-offset-family-navy'
      : 'text-muted hover:text-accent focus-visible:ring-accent/40 focus-visible:ring-offset-natural-50 dark:focus-visible:ring-offset-neutral-900'
  )

  const labelClass = cn(
    'mb-3 text-[11px] font-medium uppercase tracking-[0.2em]',
    isDark ? 'text-white/40' : 'text-muted'
  )

  const sepClass = cn('hidden select-none px-1 text-sm sm:inline', isDark ? 'text-white/25' : 'text-border')

  const menuItemClass = cn(
    'flex w-full min-h-[44px] items-center px-4 py-3 text-left text-sm transition-colors focus:outline-none focus-visible:bg-natural-100 dark:focus-visible:bg-white/10',
    isDark ? 'text-white/90 hover:bg-white/10' : 'text-fg hover:bg-natural-50 dark:text-white dark:hover:bg-white/10'
  )

  const menuWrap = cn(
    'absolute right-0 top-full z-50 mt-1 w-[min(100vw-2rem,16rem)] overflow-hidden rounded-lg border shadow-lg',
    isDark ? 'border-white/15 bg-neutral-900' : 'border-border bg-bg dark:border-neutral-700 dark:bg-surface'
  )

  const openAux = (v: ShareAuxModalVariant) => {
    setMoreOpen(false)
    setAuxModal(v)
  }

  return (
    <div
      className={cn(
        'border-t pt-5',
        isDark ? 'border-white/15' : 'border-border dark:border-neutral-700',
        className
      )}
    >
      <p className={labelClass}>Share</p>
      <div className="flex flex-wrap items-center gap-x-0 gap-y-1 sm:gap-y-2" role="group" aria-label="Share this page">
        <button
          type="button"
          onClick={copyLink}
          className={linkClass}
          {...(ssdCampaignShare ? { 'data-ssd-share-channel': 'copy_link' } : {})}
        >
          {copied && !auxModal ? 'Link copied' : 'Copy link'}
        </button>
        <span className={sepClass} aria-hidden>
          ·
        </span>
        <a
          href={mailtoHref}
          className={linkClass}
          {...(ssdCampaignShare ? { 'data-ssd-share-channel': 'email' } : {})}
        >
          Email
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
            More
          </button>
          {moreOpen ? (
            <div className={menuWrap} role="menu" aria-label="More share options">
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
                WeChat
              </button>
              <button
                type="button"
                role="menuitem"
                className={menuItemClass}
                onClick={() => openAux('xiaohongshu')}
                {...(ssdCampaignShare ? { 'data-ssd-share-channel': 'xiaohongshu' } : {})}
              >
                Xiaohongshu
              </button>
              <button
                type="button"
                role="menuitem"
                className={menuItemClass}
                onClick={() => openAux('messenger')}
                {...(ssdCampaignShare ? { 'data-ssd-share-channel': 'messenger' } : {})}
              >
                Messenger
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? 'Page link copied to clipboard' : ''}
      </p>

      <ShareAuxModal
        open={auxModal !== null}
        variant={auxModal}
        url={url}
        onClose={() => setAuxModal(null)}
        onCopyLink={copyLink}
        copied={copied}
        isDarkSurface={isDark}
      />
    </div>
  )
}
