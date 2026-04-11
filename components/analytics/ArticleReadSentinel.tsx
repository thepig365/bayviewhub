'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { track } from '@/lib/analytics'

type Locale = 'en' | 'zh'

/**
 * Fires `article_read` once when the reader scrolls the article body into view
 * (intersection ratio ≥ 0.2). Place immediately before {@link EditorialBody}.
 */
export function ArticleReadSentinel({ slug, locale }: { slug: string; locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null)
  const fired = useRef(false)
  const pathname = usePathname()

  useEffect(() => {
    const el = ref.current
    if (!el || fired.current) return

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.2) {
            fired.current = true
            track('article_read', {
              article_slug: slug,
              page_section: locale === 'zh' ? 'mendpress_article_zh' : 'mendpress_article',
              page_path: pathname || '',
            })
            obs.disconnect()
            break
          }
        }
      },
      { threshold: [0, 0.2, 0.4, 0.6] }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [slug, locale, pathname])

  return <div ref={ref} className="h-px w-full" aria-hidden />
}
