'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Globe } from 'lucide-react'
import { NAV_ITEMS, PRIMARY_CTAS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { PrelaunchButton } from '@/components/ui/PrelaunchButton'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'
import { ThemeMenu } from '@/components/theme/ThemeMenu'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md dark:bg-surface/90'
          : 'bg-white/95 backdrop-blur-sm dark:bg-surface/90'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28 md:h-32">
          {/* Logo */}
          <Logo />

          {/* Menu Toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-black dark:text-fg"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Hamburger Menu (All Screens) */}
        {isMenuOpen && (
          <div className="pb-6 space-y-4 -mx-4 px-4 pt-4 bg-white dark:bg-surface border-t border-border">
            <nav className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-fg hover:text-accent font-medium py-2 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              {PRIMARY_CTAS.map((cta) => (
                (cta as any).prelaunch ? (
                  <PrelaunchButton
                    key={cta.href}
                    href={cta.href}
                    variant={cta.variant as any}
                    size="md"
                    className="w-full"
                    onOpen={() => setIsMenuOpen(false)}
                  >
                    {cta.label}
                  </PrelaunchButton>
                ) : (
                  <Button
                    key={cta.href}
                    href={cta.href}
                    variant={cta.variant as any}
                    size="md"
                    external={cta.external}
                    className="w-full"
                  >
                    {cta.label}
                  </Button>
                )
              ))}
            </div>
            
            {/* Language Switcher */}
            <div className="pt-4 border-t border-border">
              <Link 
                href="/zh" 
                className="flex items-center justify-center space-x-2 py-3 px-4 bg-natural-100 dark:bg-surface rounded-lg hover:bg-natural-200 dark:hover:bg-surface/80 transition-colors text-fg"
                onClick={() => setIsMenuOpen(false)}
              >
                <Globe size={20} />
                <span className="font-medium">切换到中文</span>
              </Link>
            </div>

            {/* Theme */}
            <div className="pt-4 border-t border-border">
              <ThemeMenu />
            </div>
            
          </div>
        )}
      </div>
    </header>
  )
}

