'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { ChevronDown, Menu, X } from 'lucide-react'
import { GALLERY_EXTERNAL, SITE_NAV, type SiteNavChild, type SiteNavEntry, SSD_LANDING } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

function DesktopNavLink({
  href,
  external,
  className,
  children,
}: {
  href: string
  external?: boolean
  className?: string
  children: React.ReactNode
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function MobileNavRow({
  item,
  onNavigate,
  className,
}: {
  item: SiteNavChild
  onNavigate: () => void
  className?: string
}) {
  const rowClass = cn(
    'block rounded-lg px-3 py-2 text-fg hover:bg-natural-100 dark:hover:bg-bg transition-colors',
    className
  )
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={rowClass}
      >
        {item.label}
      </a>
    )
  }
  return (
    <Link href={item.href} onClick={onNavigate} className={rowClass}>
      {item.label}
    </Link>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const triggerBtnRef = useRef<HTMLButtonElement>(null)
  const { resolvedTheme } = useTheme()
  const iconColor = resolvedTheme === 'dark' ? '#f5ede0' : '#111827'
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

  const topLinkClass =
    'text-gray-900 hover:text-accent dark:text-gray-100 dark:hover:text-accent transition-colors whitespace-nowrap'
  const dropdownItemClass =
    'block px-4 py-2.5 text-sm text-fg hover:bg-natural-100 dark:hover:bg-bg transition-colors'

  const renderDesktopEntry = (entry: SiteNavEntry) => {
    if (entry.kind === 'link') {
      return (
        <DesktopNavLink
          key={entry.label}
          href={entry.href}
          external={entry.external}
          className={topLinkClass}
        >
          {entry.label}
        </DesktopNavLink>
      )
    }

    return (
      <div key={entry.label} className="relative group">
        <DesktopNavLink
          href={entry.href}
          external={entry.external}
          className={cn(topLinkClass, 'inline-flex items-center gap-1')}
        >
          {entry.label}
          <ChevronDown className="h-3.5 w-3.5 opacity-70 shrink-0" aria-hidden />
        </DesktopNavLink>
        <div
          className="absolute left-0 top-full z-50 hidden min-w-[15rem] pt-2 group-hover:block"
          role="menu"
          aria-label={entry.label}
        >
          <div className="rounded-lg border border-border bg-white py-1 shadow-lg dark:bg-surface dark:border-border">
            {entry.children.map((child) => (
              <DesktopNavLink
                key={`${entry.label}-${child.href}`}
                href={child.href}
                external={child.external}
                className={dropdownItemClass}
              >
                {child.label}
              </DesktopNavLink>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderMobileEntry = (entry: SiteNavEntry) => {
    if (entry.kind === 'group') {
      return (
        <details
          key={entry.label}
          className="rounded-lg border border-border bg-surface/50 dark:bg-bg/40"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-fg font-medium">
            <span>{entry.label}</span>
            <ChevronDown className="h-4 w-4 shrink-0" />
          </summary>
          <div className="space-y-1 border-t border-border px-4 pb-4 pt-3">
            <MobileNavRow
              item={{ label: `All ${entry.label}`, href: entry.href, external: entry.external }}
              onNavigate={closeMenu}
              className="text-muted font-medium"
            />
            {entry.children.map((child) => (
              <MobileNavRow key={`${entry.label}-${child.href}`} item={child} onNavigate={closeMenu} />
            ))}
          </div>
        </details>
      )
    }

    if (entry.mobileSublinks?.length) {
      return (
        <details
          key={entry.label}
          className="rounded-lg border border-border bg-surface/50 dark:bg-bg/40"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-fg font-medium">
            <span>{entry.label}</span>
            <ChevronDown className="h-4 w-4 shrink-0" />
          </summary>
          <div className="space-y-1 border-t border-border px-4 pb-4 pt-3">
            {entry.mobileSublinks.map((child) => (
              <MobileNavRow key={child.href} item={child} onNavigate={closeMenu} />
            ))}
          </div>
        </details>
      )
    }

    return (
      <MobileNavRow
        key={entry.label}
        item={{ label: entry.label, href: entry.href, external: entry.external }}
        onNavigate={closeMenu}
        className="font-medium"
      />
    )
  }

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
          <Logo />

          <nav
            className="hidden md:flex flex-wrap items-center justify-end gap-x-4 gap-y-2 lg:gap-x-5 text-base lg:text-lg"
            aria-label="Primary"
          >
            {SITE_NAV.map(renderDesktopEntry)}
          </nav>

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
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white/95 px-5 py-4 backdrop-blur dark:bg-surface/95">
              <h2 className="text-lg font-semibold text-fg">Navigation</h2>
              <button
                ref={closeBtnRef}
                onClick={closeMenu}
                className="rounded-md p-2 hover:bg-natural-100 dark:hover:bg-bg"
                style={{ color: iconColor }}
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-3 p-5">
              {SITE_NAV.map(renderMobileEntry)}
            </div>

            <div className="space-y-3 border-t border-border p-5 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wide text-fg">Quick actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <Button href="/partners" variant="primary" size="md" className="w-full" onClick={closeMenu}>
                  Become a Partner
                </Button>
                <Button href="/cellar-door#book" variant="accent" size="md" className="w-full" onClick={closeMenu}>
                  Book Wine Tasting
                </Button>
                <Button
                  href={`${SSD_LANDING.overview}#register`}
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={closeMenu}
                >
                  Backyard Small Second Home
                </Button>
                <Button href={SSD_LANDING.feasibility} variant="outline" size="md" className="w-full" onClick={closeMenu}>
                  Feasibility check
                </Button>
                <Button href={GALLERY_EXTERNAL.archive} variant="outline" size="md" className="w-full" onClick={closeMenu}>
                  Browse gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
