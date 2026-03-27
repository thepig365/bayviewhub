'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { ChevronDown, Menu, X } from 'lucide-react'
import { GALLERY_EXTERNAL, GALLERY_VIEWING_REQUEST_MAILTO, NAV_ITEMS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const triggerBtnRef = useRef<HTMLButtonElement>(null)
  const { resolvedTheme } = useTheme()
  const iconColor = resolvedTheme === 'dark' ? '#f5ede0' : '#111827' // undefined = light
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    // iOS-safe scroll lock: fix body and restore exact scroll position on close.
    const scrollY = window.scrollY
    const prevOverflow = document.body.style.overflow
    const prevPosition = document.body.style.position
    const prevTop = document.body.style.top
    const prevWidth = document.body.style.width
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    closeBtnRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
        return
      }
      if (e.key !== 'Tab' || !modalRef.current) return

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.position = prevPosition
      document.body.style.top = prevTop
      document.body.style.width = prevWidth
      window.removeEventListener('keydown', onKeyDown)
      window.scrollTo(0, scrollY)
      triggerBtnRef.current?.focus()
    }
  }, [isMenuOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md dark:bg-[#1a1408]'
          : 'bg-white dark:bg-[#1a1408]'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28 md:h-32">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 text-base md:text-lg" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-gray-900 hover:text-accent dark:text-gray-100 dark:hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-900 hover:text-accent dark:text-gray-100 dark:hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button
              ref={triggerBtnRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3"
              style={{ color: iconColor }}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="site-menu-dialog"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-sm md:hidden"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeMenu()
          }}
        >
          <div
            id="site-menu-dialog"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation menu"
            className="fixed top-0 right-0 h-[100dvh] w-[88vw] max-w-[420px] overflow-y-auto overscroll-contain border-l border-border bg-white dark:bg-surface shadow-2xl"
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-border bg-white/95 dark:bg-surface/95 backdrop-blur">
              <h2 className="text-lg font-semibold text-fg">Navigation</h2>
              <button
                ref={closeBtnRef}
                onClick={closeMenu}
                className="p-2 rounded-md hover:bg-natural-100 dark:hover:bg-bg"
                style={{ color: iconColor }}
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-5 md:p-6 space-y-6">
              <section className="space-y-3">
                <h3 className="text-sm font-bold tracking-wide uppercase text-fg">Primary Navigation</h3>
                <nav className="grid grid-cols-1 md:grid-cols-2 gap-2" aria-label="Primary">
                  {NAV_ITEMS.map((item) => (
                    item.external ? (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        onClick={closeMenu}
                        className="rounded-lg px-3 py-2 text-fg hover:bg-natural-100 dark:hover:bg-bg transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className="rounded-lg px-3 py-2 text-fg hover:bg-natural-100 dark:hover:bg-bg transition-colors"
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                </nav>
              </section>

              <section className="space-y-3 border-t border-border pt-5">
                <h3 className="text-sm font-bold tracking-wide uppercase text-fg">Sub-Sites</h3>
                <details className="rounded-lg border border-border bg-surface/50 dark:bg-bg/40" open>
                  <summary className="flex items-center justify-between cursor-pointer list-none px-4 py-3 text-fg font-medium">
                    <span>Art Gallery</span>
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  </summary>
                  <div className="px-4 pb-4 space-y-4">
                    <div className="rounded-lg border border-accent/25 bg-natural-50 dark:bg-bg/80 p-3 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent dark:text-accent">
                        Private viewing network
                      </p>
                      <p className="text-sm text-muted leading-snug">
                        By arrangement — for hosts, artists, and invited viewers.
                      </p>
                      <a
                        href={GALLERY_EXTERNAL.openYourWall}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="block rounded-md px-3 py-2.5 text-base font-semibold text-fg bg-white/90 dark:bg-surface border border-border hover:border-accent hover:text-accent transition-colors"
                      >
                        Open Your Wall
                      </a>
                      <a
                        href={GALLERY_VIEWING_REQUEST_MAILTO}
                        onClick={closeMenu}
                        className="block rounded-md px-3 py-2 text-base font-medium text-fg/90 hover:text-accent transition-colors underline-offset-2 hover:underline"
                      >
                        Request private viewing
                      </a>
                    </div>
                    <div className="space-y-1">
                      <p className="px-2 text-xs font-semibold uppercase tracking-wide text-muted">Collection & artists</p>
                      <a
                        href={GALLERY_EXTERNAL.archive}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="block rounded px-2 py-2 text-muted hover:text-fg hover:bg-natural-100 dark:hover:bg-surface/80"
                      >
                        Browse collection
                      </a>
                      <a
                        href={GALLERY_EXTERNAL.submit}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="block rounded px-2 py-2 text-muted hover:text-fg hover:bg-natural-100 dark:hover:bg-surface/80"
                      >
                        Submit artwork for curation
                      </a>
                      <a
                        href={GALLERY_EXTERNAL.protocol}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="block rounded px-2 py-2 text-muted hover:text-fg hover:bg-natural-100 dark:hover:bg-surface/80"
                      >
                        Assessment protocol
                      </a>
                      <a
                        href={GALLERY_EXTERNAL.rights}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="block rounded px-2 py-2 text-muted hover:text-fg hover:bg-natural-100 dark:hover:bg-surface/80"
                      >
                        Rights & licensing
                      </a>
                    </div>
                  </div>
                </details>
                <details className="rounded-lg border border-border bg-surface/50 dark:bg-bg/40">
                  <summary className="flex items-center justify-between cursor-pointer list-none px-4 py-3 text-fg font-medium">
                    <span>Backyard Small Second Home</span>
                    <ChevronDown className="h-4 w-4" />
                  </summary>
                  <div className="px-4 pb-4 space-y-1">
                    <Link href="/backyard-small-second-home" onClick={closeMenu} className="block rounded px-2 py-2 text-muted hover:text-fg hover:bg-natural-100 dark:hover:bg-surface/80">
                      Overview
                    </Link>
                    <Link href="/backyard-small-second-home/victoria-rules" onClick={closeMenu} className="block rounded px-2 py-2 text-muted hover:text-fg hover:bg-natural-100 dark:hover:bg-surface/80">
                      Victoria Rules
                    </Link>
                    <Link href="/backyard-small-second-home/cost-rent-roi" onClick={closeMenu} className="block rounded px-2 py-2 text-muted hover:text-fg hover:bg-natural-100 dark:hover:bg-surface/80">
                      Cost & ROI Calculator
                    </Link>
                    <Link href="/backyard-small-second-home/feasibility-check" onClick={closeMenu} className="block rounded px-2 py-2 text-muted hover:text-fg hover:bg-natural-100 dark:hover:bg-surface/80">
                      Feasibility Check
                    </Link>
                  </div>
                </details>
              </section>

              <section className="space-y-3 border-t border-border pt-5">
                <h3 className="text-sm font-bold tracking-wide uppercase text-fg">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button href="/partners" variant="primary" size="md" className="w-full" onClick={closeMenu}>
                    Become a Partner
                  </Button>
                  <Button href="/cellar-door#book" variant="accent" size="md" className="w-full" onClick={closeMenu}>
                    Book Wine Tasting
                  </Button>
                  <Button href="/backyard-small-second-home#register" variant="outline" size="md" className="w-full" onClick={closeMenu}>
                    Build Second Home
                  </Button>
                  <Button href={GALLERY_EXTERNAL.openYourWall} variant="outline" size="md" className="w-full" onClick={closeMenu}>
                    Open Your Wall
                  </Button>
                  <Button href={GALLERY_EXTERNAL.archive} variant="outline" size="md" className="w-full" onClick={closeMenu}>
                    Browse gallery
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

