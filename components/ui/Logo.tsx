'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  className?: string
  href?: string
}

export function Logo({ className = '', href = '/' }: LogoProps) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 no-underline outline-none ${className}`}
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
        <span className="text-sm tracking-widest uppercase text-black dark:text-fg">
          Est. Victoria
        </span>
      </div>
    </Link>
  )
}

