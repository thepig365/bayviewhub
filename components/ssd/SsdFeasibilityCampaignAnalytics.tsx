'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { track, getAttribution } from '@/lib/analytics'
import { buildSsdPayload, postSsdCampaignEvent } from '@/components/ssd/ssd-campaign-client'

const PATH = '/backyard-small-second-home/feasibility-check'

export function SsdFeasibilityCampaignAnalytics({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const formStarted = useRef(false)

  useEffect(() => {
    if (pathname !== PATH) return
    const params =
      typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : undefined
    if (params) getAttribution(params)
    const payload = buildSsdPayload('ssd_feasibility_page_view', PATH)
    track('ssd_feasibility_page_view', { page_path: PATH })
    postSsdCampaignEvent(payload)
  }, [pathname])

  useEffect(() => {
    if (pathname !== PATH) return

    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement
      if (t.id !== 'suburb' && t.getAttribute('name') !== 'suburb') return
      if (formStarted.current) return
      formStarted.current = true
      const pl = buildSsdPayload('ssd_feasibility_form_start', PATH)
      track('ssd_feasibility_form_start', { page_path: PATH })
      postSsdCampaignEvent(pl)
    }

    document.addEventListener('focusin', onFocusIn, true)
    return () => document.removeEventListener('focusin', onFocusIn, true)
  }, [pathname])

  return <div className="contents">{children}</div>
}

export function trackFeasibilityFormSubmitSuccess() {
  const pl = buildSsdPayload('ssd_feasibility_form_submit', PATH)
  track('ssd_feasibility_form_submit', { page_path: PATH })
  postSsdCampaignEvent(pl)
}
