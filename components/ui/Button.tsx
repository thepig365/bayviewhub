import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  external?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 tracking-wide uppercase text-sm'
  
  const variants = {
    primary: 'bg-white text-sanctuary hover:bg-neutral-200',
    secondary: 'bg-neutral-800 text-white hover:bg-neutral-700',
    accent: 'bg-gold text-sanctuary hover:bg-gold/90',
    gold: 'bg-gold text-sanctuary hover:bg-gold/90',
    outline: 'border border-neutral-600 text-white hover:border-white hover:bg-white/5',
  }
  
  const sizes = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  }

  const styles = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={styles}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={styles} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={styles} disabled={disabled}>
      {children}
    </button>
  )
}
