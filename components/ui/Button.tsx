import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent' | 'outline'
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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-primary-900'
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-primary-800 text-white hover:bg-primary-900 focus:ring-primary-600',
    accent: 'bg-accent text-bg hover:bg-accent-hover focus:ring-accent',
    outline: 'border border-border text-fg hover:bg-fg hover:text-bg focus:ring-accent',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
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

