'use client'

import React from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function SimpleThemeToggle() {
  const { setTheme, theme } = useTheme()

  const themes = [
    { id: 'light', icon: Sun, label: 'Light' },
    { id: 'dark', icon: Moon, label: 'Dark' },
    { id: 'system', icon: Monitor, label: 'Auto' },
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
          aria-label={`Set ${label} theme`}
          title={label}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  )
}
