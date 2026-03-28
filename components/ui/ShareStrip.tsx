'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { buildShareMailto, facebookShareUrl, linkedInShareUrl } from '@/lib/share-links'
import { cn } from '@/lib/utils'

export type ShareStripVariant = 'surface' | 'dark'

export interface ShareStripProps {
  /** Absolute URL of the page being shared */
  url: string
  mailtoSubject: string
  /** Short plain-text lines for the email body (URL is appended automatically) */
  mailtoIntro: string
  variant?: ShareStripVariant
  className?: string
}

export function ShareStrip({
  url,
  mailtoSubject,
  mailtoIntro,
  variant = 'surface',
  className,
}: ShareStripProps) {
  const [copied, setCopied] = useState(false)
  const clearRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  const mailtoHref = buildShareMailto({ subject: mailtoSubject, intro: mailtoIntro, url })
  const isDark = variant === 'dark'

  const linkClass = cn(
    'text-sm transition-colors underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
    isDark
      ? 'text-white/60 hover:text-white focus-visible:ring-white/40 focus-visible:ring-offset-family-navy'
      : 'text-muted hover:text-accent focus-visible:ring-accent/40 focus-visible:ring-offset-natural-50 dark:focus-visible:ring-offset-neutral-900'
  )

  const labelClass = cn(
    'mb-3 text-[11px] font-medium uppercase tracking-[0.2em]',
    isDark ? 'text-white/40' : 'text-muted'
  )

  const sepClass = cn('select-none px-1.5 text-sm', isDark ? 'text-white/25' : 'text-border')

  return (
    <div
      className={cn(
        'border-t pt-5',
        isDark ? 'border-white/15' : 'border-border dark:border-neutral-700',
        className
      )}
    >
      <p className={labelClass}>Share</p>
      <div className="flex flex-wrap items-center gap-y-2" role="group" aria-label="Share this page">
        <button type="button" onClick={copyLink} className={linkClass}>
          {copied ? 'Link copied' : 'Copy link'}
        </button>
        <span className={sepClass} aria-hidden>
          ·
        </span>
        <a href={mailtoHref} className={linkClass}>
          Email
        </a>
        <span className={sepClass} aria-hidden>
          ·
        </span>
        <a href={linkedInShareUrl(url)} target="_blank" rel="noopener noreferrer" className={linkClass}>
          LinkedIn
        </a>
        <span className={sepClass} aria-hidden>
          ·
        </span>
        <a href={facebookShareUrl(url)} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Facebook
        </a>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? 'Page link copied to clipboard' : ''}
      </p>
    </div>
  )
}
