'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Monitor, Moon, Sun, Clock3 } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

type ThemeMode = 'system' | 'auto' | 'light' | 'dark'

function computeAutoTheme(date = new Date()): 'light' | 'dark' {
  const hour = date.getHours()
  // Night mode: 18:00 - 06:59
  return hour >= 18 || hour < 7 ? 'dark' : 'light'
}

export function ThemeMenu({ className }: { className?: string }) {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mode, setMode] = useState<ThemeMode>('system')

  // Load persisted mode
  useEffect(() => {
    const saved = window.localStorage.getItem('bayviewhub-theme-mode') as ThemeMode | null
    if (saved) setMode(saved)
  }, [])

  // Apply mode -> theme
  useEffect(() => {
    window.localStorage.setItem('bayviewhub-theme-mode', mode)

    if (mode === 'system') {
      setTheme('system')
      return
    }

    if (mode === 'light' || mode === 'dark') {
      setTheme(mode)
      return
    }

    // auto
    const apply = () => setTheme(computeAutoTheme())
    apply()
    const id = window.setInterval(apply, 60 * 60 * 1000) // hourly
    return () => window.clearInterval(id)
  }, [mode, setTheme])

  const effective = useMemo(() => {
    // This helps show what's actually active (light/dark) even when mode is system/auto
    return resolvedTheme ?? theme ?? 'system'
  }, [resolvedTheme, theme])

  const items: Array<{
    id: ThemeMode
    label: string
    sub: string
    icon: React.ComponentType<{ className?: string }>
  }> = [
    { id: 'system', label: 'System', sub: 'Match device', icon: Monitor },
    { id: 'auto', label: 'Auto', sub: 'Day/Night', icon: Clock3 },
    { id: 'light', label: 'Light', sub: 'Always light', icon: Sun },
    { id: 'dark', label: 'Dark', sub: 'Always dark', icon: Moon },
  ]

  return (
    <div className={cn('rounded-xl border border-natural-200 bg-white p-3 dark:bg-primary-900 dark:border-primary-700', className)}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-natural-900 dark:text-natural-50">Theme</p>
          <p className="text-xs text-natural-600 dark:text-natural-200">
            Active: <span className="font-medium">{effective}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {items.map(({ id, label, sub, icon: Icon }) => {
          const selected = mode === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={cn(
                'flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors',
                selected
                  ? 'border-primary-600 bg-primary-50 text-primary-800 dark:bg-primary-800 dark:text-white dark:border-primary-500'
                  : 'border-natural-200 bg-white text-natural-800 hover:bg-natural-100 dark:bg-primary-900 dark:text-natural-50 dark:border-primary-700 dark:hover:bg-primary-800'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="leading-tight">
                <span className="block text-sm font-medium">{label}</span>
                <span className="block text-xs opacity-80">{sub}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}


