'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  className?: string
  href?: string
  locale?: 'en' | 'zh'
}

export function Logo({ className = '', href = '/', locale = 'en' }: LogoProps) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 no-underline outline-none ${className}`}
    >
      <Image
        src="/images/bayview-estate-logo.jpg"
        alt={locale === 'zh' ? 'Bayview Hub 标识' : 'Bayview Hub logo'}
        width={200}
        height={60}
        className="h-16 w-auto md:h-20"
        priority
      />
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-serif font-bold leading-tight text-black dark:text-fg">
          Bayview Hub
        </span>
        <span className="text-[13px] tracking-widest uppercase text-black dark:text-fg md:text-sm">
          {locale === 'zh' ? '来自维州' : 'Est. Victoria'}
        </span>
      </div>
    </Link>
  )
}

