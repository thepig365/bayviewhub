import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
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
        <span className="text-2xl md:text-3xl font-serif font-bold leading-tight text-[#111827] dark:text-[#F9FAFB]">
          Bayview Hub
        </span>
        <span className="text-xs tracking-widest uppercase text-[#374151] dark:text-[#D1D5DB]">
          Est. Victoria
        </span>
      </div>
    </Link>
  )
}

