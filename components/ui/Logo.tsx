'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center space-x-3 no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${className}`}
    >
      <Image
        src="/images/bayview-estate-logo.jpg"
        alt="Bayview Estate"
        width={200}
        height={60}
        className="h-16 w-auto md:h-20"
        priority
      />
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-serif font-bold leading-tight text-black dark:text-fg">
          Bayview Hub
        </span>
        <span className="text-xs tracking-widest uppercase text-black dark:text-fg">
          Est. Victoria
        </span>
      </div>
    </Link>
  )
}

