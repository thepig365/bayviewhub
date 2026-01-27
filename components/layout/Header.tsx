'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

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
          ? 'bg-sanctuary/95 backdrop-blur-md border-b border-neutral-800'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-neutral-400 hover:text-white text-sm tracking-wide transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/second-home"
              className="text-gold hover:text-white text-sm tracking-wide transition-colors"
            >
              SSD
            </Link>
          </nav>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 border-t border-neutral-800 mt-4 pt-6">
            <nav className="flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-neutral-400 hover:text-white text-sm tracking-wide transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/second-home"
                onClick={() => setIsMenuOpen(false)}
                className="text-gold hover:text-white text-sm tracking-wide transition-colors"
              >
                SSD Framework
              </Link>
              <Link
                href="/backyard-second-home/feasibility-checklist"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3 bg-gold text-sanctuary text-sm tracking-wide uppercase mt-4"
              >
                SSD Feasibility Tool
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
