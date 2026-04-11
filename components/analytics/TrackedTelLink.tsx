'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { track } from '@/lib/analytics'

type Props = {
  href: string
  className?: string
  children: ReactNode
  /** Logical placement for GA4 (e.g. visit_contact, home_hero). */
  pageSection: string
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>['onClick']
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick' | 'className' | 'children'>

/**
 * `tel:` link with `phone_click` (page_section, link_destination).
 */
export function TrackedTelLink({ href, className, children, pageSection, onClick, ...rest }: Props) {
  return (
    <a
      href={href}
      className={className}
      {...rest}
      onClick={(e) => {
        track('phone_click', {
          page_section: pageSection,
          link_destination: href.replace(/\s/g, ''),
        })
        onClick?.(e)
      }}
    >
      {children}
    </a>
  )
}
