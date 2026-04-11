'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import {
  GALLERY_EXTERNAL,
  GALLERY_VIEWING_REQUEST_MAILTO,
  SITE_CONFIG,
  SOCIAL_LINKS,
  SITE_HOURS,
  SSD_LANDING,
  SSD_QUICK_LINKS,
} from '@/lib/constants'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { SimpleThemeToggle } from '@/components/theme/SimpleThemeToggle'
import { TrackedOutboundConversionLink } from '@/components/analytics/TrackedOutboundConversionLink'
import { localizedHref, localeFromPathname } from '@/lib/language-routing'

function zhFooterLabel(label: string): string {
  switch (label) {
    case 'Visit':
      return '到访'
    case 'Cellar Door':
      return '酒窖品鉴'
    case 'Events':
      return '活动'
    case 'Restaurant':
      return '餐厅'
    case 'Hours':
      return '营业时间'
    case 'Experiences':
      return '体验'
    case 'Arts Gallery — Online':
      return '线上艺术画廊'
    case 'Workshops':
      return '工作坊'
    case 'Edible Gardens':
      return '可食花园'
    case 'The Shed Music':
      return 'The Shed 音乐'
    case 'Accommodation':
      return '住宿'
    case 'Editorial Login':
      return '编辑后台登录'
    case 'Newsletter Login':
      return '通讯后台登录'
    case 'Distribution Console':
      return '分发控制台'
    case 'Programs':
      return '项目'
    case 'Founding Partners':
      return '创始合作伙伴'
    case 'Backyard Small Second Home':
      return '后院第二小住宅'
    case 'Invest':
      return '投资'
    case 'Small Second Home paths':
      return '第二小住宅路径'
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
    case 'Gallery':
      return '画廊'
    case 'Private Viewing':
      return '私人观看'
    case 'Open Your Wall — register a work':
      return 'Open Your Wall - 登记作品'
    case 'Request private viewing access':
      return '申请私人观看通道'
    case 'Browse collection':
      return '浏览作品收藏'
    case 'Submit artwork':
      return '提交作品'
    case 'Theme:':
      return '主题:'
    case 'Partners':
      return '合作方'
    case 'Site Map':
      return '网站地图'
    case 'Contact':
      return '联系'
    case 'Privacy Policy':
      return '隐私政策'
    case 'Terms of Service':
      return '服务条款'
    default:
      return label
  }
}

function t(label: string, locale: 'en' | 'zh') {
  return locale === 'zh' ? zhFooterLabel(label) : label
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname() || '/'
  const locale = localeFromPathname(pathname)

  const socialPlatforms = [
    { name: 'Facebook', icon: Facebook, url: SOCIAL_LINKS.facebook },
    { name: 'Instagram', icon: Instagram, url: SOCIAL_LINKS.instagram },
    { name: 'Twitter', icon: Twitter, url: SOCIAL_LINKS.twitter },
    { name: 'LinkedIn', icon: Linkedin, url: SOCIAL_LINKS.linkedin },
  ]

  return (
    <footer className="bg-shell-footer text-[#f5ede0]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand + Address */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-[1.02rem] leading-8 text-shell-footer-muted mb-4 md:text-base md:leading-relaxed">
              {locale === 'zh'
                ? '在维州 30 英亩庄园中提供庄园餐饮、现场音乐与农舍住宿。后院第二小住宅咨询现已开放，更多创意项目持续发展中。'
                : 'Estate dining, live music, and farmhouse accommodation on a 30-acre Victoria estate. Backyard Small Second Home enquiries now open. Creative programs in development.'}
            </p>
            <p className="text-[15px] leading-7 text-shell-footer-muted mb-2 md:text-base md:leading-relaxed">
              365 Purves Road,
            </p>
            <p className="text-[15px] leading-7 text-shell-footer-muted md:text-base md:leading-relaxed">
              Main Ridge, Victoria 3928
            </p>
          </div>

          {/* Column 2: Tickets & Hours */}
          <div>
            <h4 className="text-[13px] font-bold tracking-widest uppercase mb-5 md:text-sm">
              {t('Visit', locale)}
            </h4>
            <ul className="space-y-2 mb-8">
              <li>
                <Link href={localizedHref('/cellar-door', locale)} className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                  {t('Cellar Door', locale)}
                </Link>
              </li>
              <li>
                <Link href={localizedHref('/events', locale)} className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                  {t('Events', locale)}
                </Link>
              </li>
              <li>
                <a href={SITE_CONFIG.pigAndWhistleUrl} target="_blank" rel="noopener noreferrer" className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                  {t('Restaurant', locale)}
                </a>
              </li>
            </ul>

            <h4 className="text-[13px] font-bold tracking-widest uppercase mb-4 md:text-sm">
              {t('Hours', locale)}
            </h4>
            <div className="text-shell-footer-muted text-[15px] leading-7 space-y-1 md:text-base">
              <p>{locale === 'zh' ? '周三至周日 | 上午 11 点至深夜' : SITE_HOURS.summary}</p>
              <p className="italic text-shell-footer-muted/80 mt-2 text-[15px] leading-7 md:text-base">
                {locale === 'zh' ? '圣诞节当天休息' : 'Closed Christmas Day'}
              </p>
            </div>
          </div>

          {/* Column 3: Experiences */}
          <div>
            <h4 className="text-[13px] font-bold tracking-widest uppercase mb-5 md:text-sm">
              {t('Experiences', locale)}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href={GALLERY_EXTERNAL.base} target="_blank" rel="noopener noreferrer" className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                  {t('Arts Gallery — Online', locale)}
                </a>
              </li>
              <li>
                <Link href={localizedHref('/workshops', locale)} className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                  {t('Workshops', locale)}
                </Link>
              </li>
              <li>
                <Link href={localizedHref('/edible-gardens', locale)} className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                  {t('Edible Gardens', locale)}
                </Link>
              </li>
              <li>
                <a href="https://www.thepigandwhistle.com.au/what-s-on" target="_blank" rel="noopener noreferrer" className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                  {t('The Shed Music', locale)}
                </a>
              </li>
              <li>
                <a href="https://www.thepigandwhistle.com.au/accommodation" target="_blank" rel="noopener noreferrer" className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                  {t('Accommodation', locale)}
                </a>
              </li>
            </ul>

            <ul className="mt-5 space-y-2 border-t border-shell-footer-border pt-4">
              <li>
                <Link href="/private/editorial/login" className="text-[15px] leading-7 text-shell-footer-muted/75 hover:text-accent transition-colors md:text-base">
                  {t('Editorial Login', locale)}
                </Link>
              </li>
              <li>
                <Link href="/private/newsletter/login" className="text-[15px] leading-7 text-shell-footer-muted/75 hover:text-accent transition-colors md:text-base">
                  {t('Newsletter Login', locale)}
                </Link>
              </li>
              <li>
                <Link href="/private/distribution" className="text-[15px] leading-7 text-shell-footer-muted/75 hover:text-accent transition-colors md:text-base">
                  {t('Distribution Console', locale)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Programs */}
          <div>
            <h4 className="text-[13px] font-bold tracking-widest uppercase mb-5 md:text-sm">
              {t('Programs', locale)}
            </h4>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href={localizedHref('/partners/founding', locale)} className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                  {t('Founding Partners', locale)}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedHref('/art-gallery/founding-partners', locale)}
                  className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base"
                >
                  {locale === 'zh' ? '艺术画廊 — 创始策展合作' : 'Arts Gallery — founding curator'}
                </Link>
              </li>
              <li>
                <Link href={localizedHref(SSD_LANDING.overview, locale)} className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                  {t('Backyard Small Second Home', locale)}
                </Link>
              </li>
              <li>
                <Link href={localizedHref('/invest', locale)} className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                  {t('Invest', locale)}
                </Link>
              </li>
            </ul>

            <h4 className="text-[13px] font-bold tracking-widest uppercase mb-3 md:text-sm">
              {t('Small Second Home paths', locale)}
            </h4>
            <ul className="space-y-2 mb-8">
              {SSD_QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={localizedHref(item.href, locale)} className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                    {t(item.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-[13px] font-bold tracking-widest uppercase mb-4 md:text-sm">
              {t('Gallery', locale)}
            </h4>
            <ul className="space-y-2">
              <li>
                <TrackedOutboundConversionLink
                  href={GALLERY_EXTERNAL.openYourWall}
                  eventName="private_viewing_request"
                  pageSection="footer_gallery"
                  className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base"
                >
                  {t('Private Viewing', locale)}
                </TrackedOutboundConversionLink>
              </li>
              <li>
                <a href={GALLERY_EXTERNAL.passportRegister} target="_blank" rel="noopener noreferrer" className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                  {t('Open Your Wall — register a work', locale)}
                </a>
              </li>
              <li>
                <TrackedOutboundConversionLink
                  href={GALLERY_VIEWING_REQUEST_MAILTO}
                  eventName="private_viewing_request"
                  pageSection="footer_gallery"
                  className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base"
                >
                  {t('Request private viewing access', locale)}
                </TrackedOutboundConversionLink>
              </li>
              <li>
                <a href={GALLERY_EXTERNAL.archive} target="_blank" rel="noopener noreferrer" className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base">
                  {t('Browse collection', locale)}
                </a>
              </li>
              <li>
                <TrackedOutboundConversionLink
                  href={GALLERY_EXTERNAL.submit}
                  eventName="artist_submission_start"
                  pageSection="footer_gallery"
                  className="text-[15px] leading-7 text-shell-footer-muted hover:text-accent transition-colors md:text-base"
                >
                  {t('Submit artwork', locale)}
                </TrackedOutboundConversionLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preferences - Simple inline */}
      <div className="border-t border-shell-footer-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-base">
            {/* Language */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher
                labelClassName="text-shell-footer-muted/70"
                linkClassName="text-shell-footer-muted hover:text-accent"
                activeClassName="text-[#f5ede0]"
                separatorClassName="text-shell-footer-muted/50"
              />
            </div>
            {/* Theme */}
            <div className="flex items-center gap-2">
              <span className="text-[15px] leading-6 text-shell-footer-muted/70 md:text-base">{t('Theme:', locale)}</span>
              <SimpleThemeToggle locale={locale} />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Links Bar */}
      <div className="border-t border-shell-footer-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-base">
            <Link href={localizedHref('/partners', locale)} className="text-shell-footer-muted hover:text-accent transition-colors tracking-wide uppercase">
              {t('Partners', locale)}
            </Link>
            <Link href={localizedHref('/visit', locale)} className="text-shell-footer-muted hover:text-accent transition-colors tracking-wide uppercase">
              {t('Visit', locale)}
            </Link>
            <Link href={localizedHref('/site-map', locale)} className="text-shell-footer-muted hover:text-accent transition-colors tracking-wide uppercase">
              {t('Site Map', locale)}
            </Link>
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-shell-footer-muted hover:text-accent transition-colors tracking-wide uppercase">
              {t('Contact', locale)}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-shell-footer-border bg-shell-footer-deep">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-shell-footer-border flex items-center justify-center text-shell-footer-muted hover:text-accent hover:border-accent transition-colors"
                    aria-label={platform.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

            {/* Copyright & Legal */}
            <div className="flex flex-wrap justify-center gap-4 text-base text-shell-footer-muted">
              <span>© {currentYear} {SITE_CONFIG.name}. {locale === 'zh' ? '保留所有权利。' : 'All rights reserved.'}</span>
              <span className="hidden md:inline">|</span>
              <Link href={localizedHref('/privacy', locale)} className="hover:text-accent transition-colors">
                {t('Privacy Policy', locale)}
              </Link>
              <span className="hidden md:inline">|</span>
              <Link href={localizedHref('/terms', locale)} className="hover:text-accent transition-colors">
                {t('Terms of Service', locale)}
              </Link>
            </div>
          </div>

          {/* Acknowledgement */}
          <div className="mt-6 pt-6 border-t border-shell-footer-border">
            <p className="text-[15px] leading-7 text-shell-footer-muted/85 text-center max-w-3xl mx-auto md:text-sm md:leading-relaxed">
              {locale === 'zh'
                ? 'Bayview Hub 向 Kulin Nation 的 Bunurong / Boon Wurrung 人民致意，承认他们是 Mornington Peninsula 土地与水域的传统守护者，并向过去与现在的长者表达敬意。'
                : 'Bayview Hub acknowledges the Bunurong / Boon Wurrung people of the Kulin Nation as the Traditional Custodians of the lands and waters of the Mornington Peninsula, and pays respect to Elders past and present.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
