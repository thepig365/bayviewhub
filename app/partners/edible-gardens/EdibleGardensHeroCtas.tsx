'use client'

import React, { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { getAttribution, track } from '@/lib/analytics'

type Props = {
  email: string
  subject: string
}

function buildMailto(email: string, subject: string, body?: string) {
  const q: string[] = [`subject=${encodeURIComponent(subject)}`]
  if (body) q.push(`body=${encodeURIComponent(body)}`)
  return `mailto:${email}?${q.join('&')}`
}

export function EdibleGardensHeroCtas({ email, subject }: Props) {
  const params = useSearchParams()
  const attribution = useMemo(() => getAttribution(params), [params])

  const bookCallHref = useMemo(() => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const bodyLines = [
      'Hi Bayview Hub team,',
      '',
      'I’d like to book a 10-minute intro call about the Edible Gardens Founding Partner opportunity.',
      '',
      url ? `Page: ${url}` : undefined,
      Object.keys(attribution).length ? `Attribution: ${JSON.stringify(attribution)}` : undefined,
      '',
      'Thanks,',
    ].filter(Boolean) as string[]

    return buildMailto(email, subject, bodyLines.join('\n'))
  }, [email, subject, attribution])

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <Button
        href="#apply"
        variant="primary"
        size="lg"
        onClick={() => track('eg_apply_click', attribution)}
      >
        Apply Now
      </Button>
      <Button
        href={bookCallHref}
        variant="outline"
        size="lg"
        external
        onClick={() => track('eg_book_call_click', attribution)}
      >
        Book a 10-min Call
      </Button>
    </div>
  )
}


