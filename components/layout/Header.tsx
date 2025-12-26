'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Facebook, Instagram, Twitter, Linkedin, Globe } from 'lucide-react'
import { NAV_ITEMS, PRIMARY_CTAS, SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
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
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28 md:h-32">
          {/* Logo */}
          <Logo />

          {/* Social Icons & Menu Toggle (All Screens) */}
          <div className="flex items-center space-x-2">
            {/* Social Icons */}
            <div className="flex items-center space-x-1">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-natural-600 hover:text-primary-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-natural-600 hover:text-primary-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-natural-600 hover:text-primary-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-natural-600 hover:text-primary-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
            
            {/* Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-natural-700"
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
                  className="text-natural-700 hover:text-primary-700 font-medium py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-2 pt-4 border-t border-natural-200">
              {PRIMARY_CTAS.map((cta) => (
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
              ))}
            </div>
            
            {/* Language Switcher */}
            <div className="pt-4 border-t border-natural-200">
              <Link 
                href="/zh" 
                className="flex items-center justify-center space-x-2 py-3 px-4 bg-natural-100 rounded-lg hover:bg-natural-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Globe size={20} />
                <span className="font-medium">切换到中文</span>
              </Link>
            </div>
            
            {/* Menu Social Links */}
            <div className="pt-4 border-t border-natural-200">
              <p className="text-xs font-medium text-natural-600 mb-3">Follow Us</p>
              <div className="flex items-center space-x-4">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-natural-600 hover:text-primary-700 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                  <span className="text-sm">Facebook</span>
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-natural-600 hover:text-primary-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                  <span className="text-sm">Instagram</span>
                </a>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-natural-600 hover:text-primary-700 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                  <span className="text-sm">Twitter</span>
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-natural-600 hover:text-primary-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

