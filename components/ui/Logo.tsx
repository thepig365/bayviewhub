import React from 'react'
import Link from 'next/link'

interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <span className="text-xl font-serif font-bold text-white tracking-tight">
        Bayview Hub
      </span>
    </Link>
  )
}
