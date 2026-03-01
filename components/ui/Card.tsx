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
        'group relative overflow-hidden rounded-2xl bg-white border border-border transition-all duration-300 hover:border-accent dark:bg-surface dark:border-border dark:hover:border-accent',
        isHighlight && 'ring-1 ring-accent',
        className
      )}
    >
      {image && (
        <div className="relative h-64 w-full overflow-hidden bg-natural-200 dark:bg-surface">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {isHighlight && (
            <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
              New
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold mb-3 text-fg">
          {title}
        </h3>
        <p className="text-muted mb-6 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
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
              className="text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-2 transition-colors"
            >
              {ctaSecondary.label}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

