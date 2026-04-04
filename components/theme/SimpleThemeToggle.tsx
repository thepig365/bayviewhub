'use client'

import React from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { localeFromPathname, type SiteLocale } from '@/lib/language-routing'
import { cn } from '@/lib/utils'

export function SimpleThemeToggle({ locale: forcedLocale }: { locale?: SiteLocale }) {
  const { setTheme, theme } = useTheme()
  const pathname = usePathname() || '/'
  const locale = forcedLocale || localeFromPathname(pathname)

  const themes = [
    { id: 'light', icon: Sun, label: locale === 'zh' ? '浅色' : 'Light' },
    { id: 'dark', icon: Moon, label: locale === 'zh' ? '深色' : 'Dark' },
    { id: 'system', icon: Monitor, label: locale === 'zh' ? '自动' : 'Auto' },
  ]

  return (
    <div className="flex items-center gap-1">
      {themes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={cn(
            'p-1.5 rounded transition-colors',
            theme === id
              ? 'text-white bg-gray-600'
              : 'text-gray-500 hover:text-white'
          )}
          aria-label={locale === 'zh' ? `切换到${label}主题` : `Set ${label} theme`}
          title={label}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  )
}
