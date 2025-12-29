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
          ? 'bg-white/95 backdrop-blur-md shadow-md dark:bg-primary-900/90'
          : 'bg-white/80 backdrop-blur-sm dark:bg-primary-900/75'
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
              className="p-2 text-natural-700 dark:text-natural-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Hamburger Menu (All Screens) */}
        {isMenuOpen && (
          <div className="pb-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-natural-700 hover:text-primary-700 font-medium py-2 dark:text-natural-100 dark:hover:text-primary-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-2 pt-4 border-t border-natural-200 dark:border-primary-700">
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
            <div className="pt-4 border-t border-natural-200 dark:border-primary-700">
              <Link 
                href="/zh" 
                className="flex items-center justify-center space-x-2 py-3 px-4 bg-natural-100 rounded-lg hover:bg-natural-200 transition-colors dark:bg-primary-800 dark:hover:bg-primary-700 dark:text-natural-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <Globe size={20} />
                <span className="font-medium">切换到中文</span>
              </Link>
            </div>

            {/* Theme */}
            <div className="pt-4 border-t border-natural-200 dark:border-primary-700">
              <ThemeMenu />
            </div>
            
          </div>
        )}
      </div>
    </header>
  )
}

