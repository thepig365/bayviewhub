import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './Button'
import { PrelaunchButton } from './PrelaunchButton'

interface CardProps {
  title: string
  description: string
  image?: string
  cta?: {
    label: string
    href: string
    external?: boolean
  }
  ctaSecondary?: {
    label: string
    href: string
    external?: boolean
  }
  prelaunch?: boolean
  className?: string
  variant?: 'default' | 'highlight'
}

export function Card({
  title,
  description,
  image,
  cta,
  ctaSecondary,
  prelaunch = false,
  className,
  variant = 'default',
}: CardProps) {
  const isHighlight = variant === 'highlight'

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-primary-900/60 dark:border dark:border-primary-700',
        isHighlight && 'ring-2 ring-accent-500',
        className
      )}
    >
      {image && (
        <div className="relative h-64 w-full overflow-hidden bg-natural-200 dark:bg-primary-800">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {isHighlight && (
            <div className="absolute top-4 right-4 bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              New
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold mb-3 text-natural-900 dark:text-natural-50">
          {title}
        </h3>
        <p className="text-natural-600 mb-6 leading-relaxed dark:text-natural-200">
          {description}
        </p>
        {cta && (
          prelaunch ? (
            <PrelaunchButton
              href={cta.href}
              external={cta.external}
              variant={isHighlight ? 'accent' : 'outline'}
              size="sm"
            >
              {cta.label}
            </PrelaunchButton>
          ) : (
            <Button
              href={cta.href}
              external={cta.external}
              variant={isHighlight ? 'accent' : 'outline'}
              size="sm"
            >
              {cta.label}
            </Button>
          )
        )}
        {ctaSecondary && (
          <a
            href={ctaSecondary.href}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="mt-2 block text-xs text-natural-500 hover:text-primary-600 dark:text-natural-400 dark:hover:text-primary-400 transition-colors"
          >
            {ctaSecondary.label}
          </a>
        )}
      </div>
    </div>
  )
}

