'use client'

import React, { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { getAttribution, track } from '@/lib/analytics'
import { SSD_LANDING } from '@/lib/constants'

/** Hub hero CTAs — feasibility first, fit-check second */
export function SsdHubCtas() {
  const params = useSearchParams()
  const attribution = useMemo(() => getAttribution(params), [params])

  return (
    <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
      <Button
        href={SSD_LANDING.feasibility}
        variant="accent"
        size="lg"
        className="w-full sm:w-auto"
        onClick={() => track('ssd_hub_cta_feasibility', attribution)}
      >
        Open the feasibility checklist
      </Button>
      <Button
        href="/backyard-small-second-home/is-this-for-you"
        variant="outline"
        size="lg"
        className="w-full sm:w-auto"
        onClick={() => track('ssd_hub_cta_fit', attribution)}
      >
        Find out if this pathway suits you
      </Button>
    </div>
  )
}
