'use client'

import type { ReactNode } from 'react'
import { track } from '@/lib/analytics'

type ConversionKind = 'artist_submission_start' | 'private_viewing_request' | 'gallery_outbound'

type Props = {
  href: string
  className?: string
  children: ReactNode
  eventName: ConversionKind
  pageSection: string
  /** When true, still follows the link after tracking (default: true). */
  navigate?: boolean
}

/**
 * Outbound gallery / conversion links with explicit GA4 event names.
 */
export function TrackedOutboundConversionLink({
  href,
  className,
  children,
  eventName,
  pageSection,
  navigate = true,
}: Props) {
  return (
    <a
      href={href}
      className={className}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      onClick={() => {
        track(eventName, {
          page_section: pageSection,
          destination_url: href.slice(0, 200),
        })
        if (!navigate) {
          // Let the browser handle mailto/tel; external http(s) still navigates unless prevented elsewhere
        }
      }}
    >
      {children}
    </a>
  )
}
