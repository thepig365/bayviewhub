'use client'

import React, { useEffect, useState } from 'react'
import { type SiteLocale } from '@/lib/language-routing'

type Props = {
  alt: string
  src: string
  fullSrc?: string | null
  caption?: React.ReactNode
  locale?: SiteLocale
}

export function EditorialImageFigure({ alt, src, fullSrc, caption, locale = 'en' }: Props) {
  const [open, setOpen] = useState(false)
  const expandedSrc = fullSrc || src

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <figure className="mt-10 first:mt-0">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group block w-full text-left"
          aria-label={locale === 'zh' ? `打开图片：${alt}` : `Open image: ${alt}`}
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-natural-100 dark:border-border dark:bg-surface">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="h-auto max-h-[78vh] w-full object-contain transition-transform duration-200 group-hover:scale-[1.01]"
            />
          </div>
        </button>
        {caption ? (
          <figcaption className="mt-4 max-w-3xl text-sm leading-7 text-fg/72 dark:text-white/72">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {open ? (
        <div
          className="fixed inset-0 z-[220] flex items-center justify-center bg-black/90 p-4"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="relative max-h-[94vh] w-full max-w-7xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/65 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-black/80"
            >
              {locale === 'zh' ? '关闭' : 'Close'}
            </button>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <img
                src={expandedSrc}
                alt={alt}
                className="h-auto max-h-[88vh] w-full object-contain"
              />
            </div>
            {caption ? (
              <div className="mt-3 text-sm leading-7 text-white/80">
                {caption}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
