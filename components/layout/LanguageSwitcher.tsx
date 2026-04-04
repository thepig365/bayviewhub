'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { isSwitchablePublicPath, languageSwitchTarget, localeFromPathname } from '@/lib/language-routing'

type Props = {
  className?: string
  compact?: boolean
  labelClassName?: string
  linkClassName?: string
  activeClassName?: string
  separatorClassName?: string
}

export function LanguageSwitcher({
  className,
  compact = false,
  labelClassName,
  linkClassName,
  activeClassName,
  separatorClassName,
}: Props) {
  const pathname = usePathname() || '/'
  if (!isSwitchablePublicPath(pathname)) return null

  const currentLocale = localeFromPathname(pathname)
  const { targetPath } = languageSwitchTarget(pathname)
  const englishHref = currentLocale === 'en' ? pathname : targetPath
  const chineseHref = currentLocale === 'zh' ? pathname : targetPath
  const languageLabel = currentLocale === 'zh' ? '语言:' : 'Language:'

  return (
    <div className={cn('flex items-center gap-2 text-sm', className)}>
      {!compact ? <span className={cn('text-muted', labelClassName)}>{languageLabel}</span> : null}
      {currentLocale === 'en' ? (
        <span className={cn('font-medium text-fg', activeClassName)}>EN</span>
      ) : (
        <Link href={englishHref} className={cn('text-muted hover:text-fg transition-colors', linkClassName)}>
          EN
        </Link>
      )}
      <span className={cn('text-muted/60', separatorClassName)}>/</span>
      {currentLocale === 'zh' ? (
        <span className={cn('font-medium text-fg', activeClassName)}>中文</span>
      ) : (
        <Link href={chineseHref} className={cn('text-muted hover:text-fg transition-colors', linkClassName)}>
          中文
        </Link>
      )}
    </div>
  )
}
