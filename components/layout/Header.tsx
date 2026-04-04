'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { ChevronDown, Menu, X } from 'lucide-react'
import { GALLERY_EXTERNAL, SITE_NAV, type SiteNavChild, type SiteNavEntry, SSD_LANDING } from '@/lib/constants'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { localizedHref, localeFromPathname } from '@/lib/language-routing'
import { cn } from '@/lib/utils'

function zhNavLabel(label: string): string {
  switch (label) {
    case "What's On":
      return '近期活动'
    case 'Workshops':
      return '工作坊'
    case 'Events':
      return '活动'
    case 'Live Music':
      return '现场音乐'
    case 'Cellar Door':
      return '酒窖品鉴'
    case 'About':
      return '关于我们'
    case 'Food/Wine':
      return '餐饮与葡萄酒'
    case 'Gallery':
      return '画廊'
    case 'Collection':
      return '作品收藏'
    case 'Private Viewing':
      return '私人观看'
    case 'Open Your Wall — Register a Work':
      return 'Open Your Wall - 登记作品'
    case 'Submit Artwork':
      return '提交作品'
    case 'Assessment Protocol':
      return '评估流程'
    case 'Rights & Licensing':
      return '权利与授权'
    case 'Edible Gardens':
      return '可食花园'
    case 'Visit Us':
      return '到访信息'
    case 'Plan your visit':
      return '规划到访'
    case 'Hours & contact':
      return '营业时间与联系'
    case 'Directions':
      return '路线指引'
    case 'Map':
      return '地图'
    case 'Surrounding destinations':
      return '周边去处'
    case 'Cellar Door tastings':
      return '酒窖品鉴'
    case 'Overview':
      return '总览'
    case 'Why this pathway':
      return '为何选择这一路径'
    case 'Is this for you?':
      return '是否适合你'
    case 'Feasibility check':
      return '可行性评估'
    case 'Cost, rent & ROI':
      return '成本、租金与回报'
    case 'Victoria rules':
      return '维州规则'
    case 'Become a Partner':
      return '成为合作伙伴'
    case 'Book Wine Tasting':
      return '预约葡萄酒品鉴'
    case 'Browse gallery':
      return '浏览画廊'
    default:
      return label
  }
}

function t(label: string, locale: 'en' | 'zh') {
  return locale === 'zh' ? zhNavLabel(label) : label
}

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
  const pathname = usePathname() || '/'
  const locale = localeFromPathname(pathname)
  const iconColor = resolvedTheme === 'dark' ? '#f5ede0' : '#111827'
  const closeMenu = () => setIsMenuOpen(false)
  const navAriaLabel = locale === 'zh' ? '主导航' : 'Primary'
  const openMenuAria = locale === 'zh' ? '打开导航菜单' : 'Open navigation menu'
  const siteMenuAria = locale === 'zh' ? '站点导航菜单' : 'Site navigation menu'
  const navigationHeading = locale === 'zh' ? '导航' : 'Navigation'
  const quickActionsHeading = locale === 'zh' ? '快捷操作' : 'Quick actions'

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
    const localizedEntryHref = entry.external ? entry.href : localizedHref(entry.href, locale)
    if (entry.kind === 'link') {
      return (
        <DesktopNavLink
          key={entry.label}
          href={localizedEntryHref}
          external={entry.external}
          className={topLinkClass}
        >
          {t(entry.label, locale)}
        </DesktopNavLink>
      )
    }

    return (
      <div key={entry.label} className="relative group">
        <DesktopNavLink
          href={localizedEntryHref}
          external={entry.external}
          className={cn(topLinkClass, 'inline-flex items-center gap-1')}
        >
          {t(entry.label, locale)}
          <ChevronDown className="h-3.5 w-3.5 opacity-70 shrink-0" aria-hidden />
        </DesktopNavLink>
        <div
          className="absolute left-0 top-full z-50 hidden min-w-[15rem] pt-2 group-hover:block"
          role="menu"
          aria-label={t(entry.label, locale)}
        >
          <div className="rounded-lg border border-border bg-white py-1 shadow-lg dark:bg-surface dark:border-border">
            {entry.children.map((child) => (
              <DesktopNavLink
                key={`${entry.label}-${child.href}`}
                href={child.external ? child.href : localizedHref(child.href, locale)}
                external={child.external}
                className={dropdownItemClass}
              >
                {t(child.label, locale)}
              </DesktopNavLink>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderMobileEntry = (entry: SiteNavEntry) => {
    const localizedEntryHref = entry.external ? entry.href : localizedHref(entry.href, locale)
    if (entry.kind === 'group') {
      return (
        <details
          key={entry.label}
          className="rounded-lg border border-border bg-surface/50 dark:bg-bg/40"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-fg font-medium">
            <span>{t(entry.label, locale)}</span>
            <ChevronDown className="h-4 w-4 shrink-0" />
          </summary>
          <div className="space-y-1 border-t border-border px-4 pb-4 pt-3">
            <MobileNavRow
              item={{ label: locale === 'zh' ? `查看全部 ${t(entry.label, locale)}` : `All ${entry.label}`, href: localizedEntryHref, external: entry.external }}
              onNavigate={closeMenu}
              className="text-muted font-medium"
            />
            {entry.children.map((child) => (
              <MobileNavRow
                key={`${entry.label}-${child.href}`}
                item={{ ...child, label: t(child.label, locale), href: child.external ? child.href : localizedHref(child.href, locale) }}
                onNavigate={closeMenu}
              />
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
            <span>{t(entry.label, locale)}</span>
            <ChevronDown className="h-4 w-4 shrink-0" />
          </summary>
          <div className="space-y-1 border-t border-border px-4 pb-4 pt-3">
            {entry.mobileSublinks.map((child) => (
              <MobileNavRow
                key={child.href}
                item={{ ...child, label: t(child.label, locale), href: child.external ? child.href : localizedHref(child.href, locale) }}
                onNavigate={closeMenu}
              />
            ))}
          </div>
        </details>
      )
    }

    return (
      <MobileNavRow
        key={entry.label}
        item={{ label: t(entry.label, locale), href: localizedEntryHref, external: entry.external }}
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
          <Logo href={localizedHref('/', locale)} />

          <nav
            className="hidden md:flex flex-wrap items-center justify-end gap-x-4 gap-y-2 lg:gap-x-5 text-base lg:text-lg"
            aria-label={navAriaLabel}
          >
            {SITE_NAV.map(renderDesktopEntry)}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <LanguageSwitcher compact />
          </div>

          <div className="flex items-center md:hidden">
            <button
              ref={triggerBtnRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3"
              style={{ color: iconColor }}
              aria-label={openMenuAria}
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
            aria-label={siteMenuAria}
            className="fixed top-0 right-0 h-[100dvh] w-[88vw] max-w-[420px] overflow-y-auto overscroll-contain border-l border-border bg-white dark:bg-surface shadow-2xl"
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white/95 px-5 py-4 backdrop-blur dark:bg-surface/95">
              <h2 className="text-lg font-semibold text-fg">{navigationHeading}</h2>
              <button
                ref={closeBtnRef}
                onClick={closeMenu}
                className="rounded-md p-2 hover:bg-natural-100 dark:hover:bg-bg"
                style={{ color: iconColor }}
                aria-label={locale === 'zh' ? '关闭导航菜单' : 'Close navigation menu'}
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-3 p-5">
              <div className="pb-2">
                <LanguageSwitcher />
              </div>
              {SITE_NAV.map(renderMobileEntry)}
            </div>

            <div className="space-y-3 border-t border-border p-5 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wide text-fg">{quickActionsHeading}</h3>
              <div className="grid grid-cols-1 gap-3">
                <Button href={localizedHref('/partners', locale)} variant="primary" size="md" className="w-full" onClick={closeMenu}>
                  {t('Become a Partner', locale)}
                </Button>
                <Button href={localizedHref('/cellar-door#book', locale)} variant="accent" size="md" className="w-full" onClick={closeMenu}>
                  {t('Book Wine Tasting', locale)}
                </Button>
                <Button
                  href={localizedHref(`${SSD_LANDING.overview}#register`, locale)}
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={closeMenu}
                >
                  {t('Backyard Small Second Home', locale)}
                </Button>
                <Button href={localizedHref(SSD_LANDING.feasibility, locale)} variant="outline" size="md" className="w-full" onClick={closeMenu}>
                  {t('Feasibility check', locale)}
                </Button>
                <Button href={GALLERY_EXTERNAL.archive} variant="outline" size="md" className="w-full" onClick={closeMenu}>
                  {t('Browse gallery', locale)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
