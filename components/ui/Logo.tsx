'use client'

import React from 'react'
import Link from 'next/link'

interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center space-x-3 no-underline text-inherit visited:text-inherit focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${className}`}
    >
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-serif font-bold leading-tight text-accent">
          Bayview Hub
        </span>
        <span className="text-xs tracking-widest uppercase text-muted">
          Est. Victoria
        </span>
      </div>
    </Link>
  )
}

