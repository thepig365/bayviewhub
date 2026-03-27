import Link from 'next/link'
import { ReactNode } from 'react'

interface CTAProps {
  label: string
  href: string
  external?: boolean
}

interface HomeModuleProps {
  eyebrow?: string
  title: string
  description: string
  primaryCta?: CTAProps
  secondaryCta?: CTAProps
  children?: ReactNode
  className?: string
  align?: 'left' | 'center'
  titleAs?: 'h1' | 'h2' | 'h3'
}

export function HomeModule({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  children,
  className = '',
  align = 'left',
  titleAs = 'h2',
}: HomeModuleProps) {
  const TitleTag = titleAs
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <div className={`${className}`}>
      <div className={`max-w-2xl ${alignClass}`}>
        {/* Eyebrow */}
        {eyebrow && (
          <p className="eyebrow text-accent mb-3">
            {eyebrow}
          </p>
        )}

        {/* Title */}
        <TitleTag className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-fg mb-4 leading-tight">
          {title}
        </TitleTag>

        {/* Description - max 65ch for readability */}
        <p className="text-lg text-muted mb-6 leading-relaxed reading">
          {description}
        </p>

        {/* CTA Row */}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-wrap gap-4">
            {primaryCta && (
              primaryCta.external ? (
                <a
                  href={primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white font-semibold text-base tracking-wide uppercase hover:bg-accent-hover transition-colors rounded"
                >
                  {primaryCta.label}
                </a>
              ) : (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white font-semibold text-base tracking-wide uppercase hover:bg-accent-hover transition-colors rounded"
                >
                  {primaryCta.label}
                </Link>
              )
            )}
            {secondaryCta && (
              secondaryCta.external ? (
                <a
                  href={secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-accent text-accent font-semibold text-base tracking-wide uppercase hover:bg-accent hover:text-white transition-colors rounded"
                >
                  {secondaryCta.label}
                </a>
              ) : (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-accent text-accent font-semibold text-base tracking-wide uppercase hover:bg-accent hover:text-white transition-colors rounded"
                >
                  {secondaryCta.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>

      {/* Optional children for custom content */}
      {children && <div className="mt-8">{children}</div>}
    </div>
  )
}

// Grid wrapper for multiple modules
interface HomeModuleGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

export function HomeModuleGrid({ 
  children, 
  columns = 3,
  className = '' 
}: HomeModuleGridProps) {
  const colClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <div className={`grid gap-8 md:gap-12 ${colClass} ${className}`}>
      {children}
    </div>
  )
}
