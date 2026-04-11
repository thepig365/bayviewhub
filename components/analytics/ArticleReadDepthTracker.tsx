'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { track } from '@/lib/analytics'

type Locale = 'en' | 'zh'

/** Fires `article_read` once when the reader has scrolled ~48% through the wrapped article block (read progress, not first pixel). */
const READ_DEPTH_RATIO = 0.48

export function ArticleReadDepthTracker({
  slug,
  locale,
  children,
}: {
  slug: string
  locale: Locale
  children: ReactNode
}) {
  const wrap = useRef<HTMLDivElement>(null)
  const fired = useRef(false)
  const pathname = usePathname()

  useEffect(() => {
    const el = wrap.current
    if (!el) return

    const maybeFire = () => {
      if (fired.current) return
      const blockHeight = el.scrollHeight
      if (blockHeight < 240) return
      const rect = el.getBoundingClientRect()
      const blockTop = rect.top + window.scrollY
      const viewportBottom = window.scrollY + window.innerHeight
      const travelled = viewportBottom - blockTop
      const ratio = travelled / blockHeight
      if (ratio >= READ_DEPTH_RATIO) {
        fired.current = true
        track('article_read', {
          article_slug: slug,
          page_section: locale === 'zh' ? 'mendpress_article_zh' : 'mendpress_article',
          page_path: pathname || '',
          read_depth_ratio: String(Math.round(READ_DEPTH_RATIO * 100)),
        })
        window.removeEventListener('scroll', maybeFire, true)
      }
    }

    window.addEventListener('scroll', maybeFire, { passive: true, capture: true })
    maybeFire()
    return () => window.removeEventListener('scroll', maybeFire, true)
  }, [slug, locale, pathname])

  return <div ref={wrap}>{children}</div>
}
