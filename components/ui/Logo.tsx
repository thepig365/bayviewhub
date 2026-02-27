'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'

interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark' // undefined = not yet hydrated, treat as light
  const textColor = isDark ? '#F9FAFB' : '#111827'
  const mutedColor = isDark ? '#D1D5DB' : '#374151'

  return (
    <Link href="/" className={`flex items-center space-x-3 ${className}`}>
      <Image
        src="/images/bayview-estate-logo.jpg"
        alt="Bayview Estate"
        width={200}
        height={60}
        className="h-16 w-auto md:h-20"
        priority
      />
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-serif font-bold leading-tight" style={{ color: textColor }}>
          Bayview Hub
        </span>
        <span className="text-xs tracking-widest uppercase" style={{ color: mutedColor }}>
          Est. Victoria
        </span>
      </div>
    </Link>
  )
}

