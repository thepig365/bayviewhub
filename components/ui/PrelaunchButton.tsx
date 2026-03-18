'use client'

import React, { useCallback, useId, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

type PrelaunchButtonProps = {
  href: string
  external?: boolean
  variant?: 'primary' | 'secondary' | 'accent' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
  onOpen?: () => void
  heading?: string
  message?: string
}

const DEFAULT_HEADING = 'Pre-launch Program'
const DEFAULT_MESSAGE =
  `Bayview Hub's physical Arts Gallery, Art Therapy Workshops, Edible Gardens, and Cellar Door programs are in their founding phase — open for expressions of interest and priority registration. The Pig & Whistle restaurant, live music, accommodation, and functions are fully operational. Our online gallery is live. Our Small Second Home service is actively taking enquiries. Dates, inclusions and pricing are indicative and subject to change.

Program Status & Expressions of Interest (EOI)
The Bayview Arts Gallery, Art Workshops & Art Therapy, Edible Gardens Subscriptions, and Cellar Door wine tastings (“Programs”) may be shown on this website before public launch.

Expressions of interest are not bookings. Submitting an EOI does not create a binding agreement, does not guarantee availability, and does not confirm dates or inclusions.

Information may change. Program details (including pricing, inclusions, schedules, capacity, facilitators, and venue access) may be updated, delayed, or withdrawn at any time due to operational requirements, safety, weather, supplier availability, licensing, or other factors.

No reliance for critical decisions. Please contact us for confirmation before making travel plans or other commitments based on information on this website.`

export function PrelaunchButton({
  href,
  external = false,
  variant = 'outline',
  size = 'sm',
  className,
  children,
  onOpen,
  heading = DEFAULT_HEADING,
  message = DEFAULT_MESSAGE,
}: PrelaunchButtonProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const descId = useId()

  const proceed = useCallback(() => {
    setOpen(false)
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }
    router.push(href)
  }, [external, href, router])

  return (
    <>
      <Button
        onClick={() => {
          onOpen?.()
          setOpen(true)
        }}
        variant={variant}
        size={size}
        className={className}
      >
        {children}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          <button
            className="absolute inset-0 bg-black/50"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-border dark:bg-bg dark:border-border">
            <div className="inline-flex items-center rounded-full bg-natural-200 text-fg px-3 py-1 text-xs font-bold tracking-wide uppercase dark:bg-surface dark:text-fg">
              About These Programs
            </div>
            <h3
              id={titleId}
              className="mt-4 text-2xl font-serif font-bold text-fg"
            >
              {heading}
            </h3>
            <p
              id={descId}
              className="mt-3 text-sm leading-relaxed whitespace-pre-line text-fg"
            >
              {message}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button variant="outline" size="md" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button variant="primary" size="md" onClick={proceed}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


