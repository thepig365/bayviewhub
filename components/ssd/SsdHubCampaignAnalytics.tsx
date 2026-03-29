'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { track } from '@/lib/analytics'
import { buildSsdPayload, postSsdCampaignEvent } from '@/components/ssd/ssd-campaign-client'
import { getAttribution } from '@/lib/analytics'

const HUB_PATH = '/backyard-small-second-home'

function classifyHubLink(href: string, zone: string | null): string {
  if (href.includes('feasibility-check')) return 'feasibility'
  if (href.includes('victoria-rules')) return 'victoria_rules'
  if (href.includes('cost-rent-roi')) return 'cost_roi'
  if (href.includes('is-this-for-you')) return 'fit'
  if (href.includes('granny-flat')) return 'granny_flat'
  if (href.includes('mornington-peninsula')) return 'mornington'
  if (href.includes('approach')) return 'approach'
  if (href === HUB_PATH || href.startsWith(`${HUB_PATH}#`)) return 'hub_overview'
  if (zone === 'house_types') return 'house_type_zone'
  if (zone === 'programme') return 'programme_map'
  if (zone === 'share') return 'share_surface'
  return 'other_internal'
}

export function SsdHubCampaignAnalytics({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const scrollSent = useRef<Set<number>>(new Set())
  const visibleMs = useRef(0)
  const visibleTick = useRef<number | null>(null)

  useEffect(() => {
    if (pathname !== HUB_PATH) return

    const params =
      typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : undefined
    if (params) getAttribution(params)

    const payload = buildSsdPayload('ssd_hub_page_view', HUB_PATH)
    track('ssd_hub_page_view', {
      page_path: HUB_PATH,
      utm_source: payload.utm_source || undefined,
      utm_medium: payload.utm_medium || undefined,
      utm_campaign: payload.utm_campaign || undefined,
      referrer_host: payload.referrer_host || undefined,
    })
    postSsdCampaignEvent(payload)

    const onScroll = () => {
      const el = document.documentElement
      const h = el.scrollHeight - el.clientHeight
      if (h <= 0) return
      const p = Math.round((el.scrollTop / h) * 100)
      for (const mark of [25, 50, 75, 90] as const) {
        if (p >= mark && !scrollSent.current.has(mark)) {
          scrollSent.current.add(mark)
          const pl = buildSsdPayload('ssd_hub_scroll', HUB_PATH, { scroll_depth: String(mark) })
          track('ssd_hub_scroll', { scroll_depth: mark, page_path: HUB_PATH })
          postSsdCampaignEvent(pl)
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const bumpVisible = () => {
      if (document.visibilityState !== 'visible' || visibleTick.current === null) return
      visibleMs.current += Math.min(60_000, Date.now() - visibleTick.current)
      visibleTick.current = Date.now()
    }

    const flushEngagement = () => {
      bumpVisible()
      const secs = Math.round(visibleMs.current / 1000)
      if (secs < 5) return
      const pl = buildSsdPayload('ssd_hub_engagement', HUB_PATH, { visible_seconds: secs })
      track('ssd_hub_engagement', { visible_seconds: secs, page_path: HUB_PATH })
      postSsdCampaignEvent(pl)
      visibleMs.current = 0
      visibleTick.current = Date.now()
    }

    const onVis = () => {
      if (document.visibilityState === 'visible') {
        visibleTick.current = Date.now()
      } else {
        flushEngagement()
      }
    }

    visibleTick.current = Date.now()
    document.addEventListener('visibilitychange', onVis)

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (!t) return
      if (!t.closest('[data-ssd-hub-root]')) return

      const shareCh = t.closest('[data-ssd-share-channel]')?.getAttribute('data-ssd-share-channel')
      if (shareCh) {
        const pl = buildSsdPayload('ssd_hub_share_click', HUB_PATH, { share_channel: shareCh })
        track('ssd_hub_share_click', { share_channel: shareCh, page_path: HUB_PATH })
        postSsdCampaignEvent(pl)
        return
      }

      const a = t.closest('a[href]') as HTMLAnchorElement | null
      if (!a?.href) return
      let href = a.getAttribute('href') || ''
      if (href.startsWith('#')) href = `${HUB_PATH}${href}`
      if (!href.startsWith('/')) return
      const zone = a.closest('[data-ssd-zone]')?.getAttribute('data-ssd-zone') ?? null
      const category = classifyHubLink(href, zone)
      const pl = buildSsdPayload('ssd_hub_link_click', HUB_PATH, {
        link_target: href.slice(0, 240),
        link_category: category,
        zone: zone || '',
      })
      track('ssd_hub_link_click', {
        link_category: category,
        link_target: href,
        zone: zone || undefined,
        page_path: HUB_PATH,
      })
      postSsdCampaignEvent(pl)
    }

    document.addEventListener('click', onClick, true)

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVis)
      document.removeEventListener('click', onClick, true)
      flushEngagement()
    }
  }, [pathname])

  return (
    <div data-ssd-hub-root className="contents">
      {children}
    </div>
  )
}
