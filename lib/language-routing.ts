export type SiteLocale = 'en' | 'zh'

export const LOCALE_COOKIE = 'bayviewhub_locale'

const STATIC_EXCLUDES = new Set([
  '/favicon.ico',
  '/icon',
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt',
  '/llms-full.txt',
  '/site.webmanifest',
])

const EXCLUDED_PREFIXES = ['/api', '/private', '/_next', '/cdn-cgi']

const EXACT_ROUTE_MAP_EN_TO_ZH: Record<string, string> = {
  '/': '/zh',
  '/about': '/zh/about',
  '/experiences': '/zh/experiences',
  '/visit': '/zh/visit',
  '/workshops': '/zh/workshops',
  '/edible-gardens': '/zh/edible-gardens',
  '/backyard-small-second-home': '/zh/backyard-small-second-home',
  '/newsletter': '/zh/newsletter',
  '/mendpress': '/zh/mendpress',
  '/mendpress/editorial': '/zh/mendpress/editorial',
  '/mendpress/dialogue': '/zh/mendpress/dialogue',
  '/mendpress/visual-narrative': '/zh/mendpress/visual-narrative',
  '/mendpress/programme': '/zh/mendpress/programme',
  '/mendpress/listen': '/zh/mendpress/listen',
  '/partners': '/zh/partners',
  '/partners/founding': '/zh/partners/founding',
  '/privacy': '/zh/privacy',
  '/terms': '/zh/terms',
  '/invest': '/zh/invest',
}

function trimTrailingSlash(path: string): string {
  if (path === '/') return path
  return path.replace(/\/+$/, '') || '/'
}

export function normalizePathname(pathname: string): string {
  if (!pathname) return '/'
  return trimTrailingSlash(pathname.startsWith('/') ? pathname : `/${pathname}`)
}

export function splitHrefParts(href: string): {
  pathname: string
  suffix: string
} {
  const match = href.match(/^([^?#]*)(.*)$/)
  return {
    pathname: normalizePathname(match?.[1] || '/'),
    suffix: match?.[2] || '',
  }
}

export function localeFromPathname(pathname: string): SiteLocale {
  const normalized = normalizePathname(pathname)
  return normalized === '/zh' || normalized.startsWith('/zh/') ? 'zh' : 'en'
}

export function toEnglishPathname(pathname: string): string {
  const normalized = normalizePathname(pathname)
  if (normalized === '/zh') return '/'
  if (normalized.startsWith('/zh/')) {
    return normalizePathname(normalized.slice(3))
  }
  return normalized
}

export function toChinesePathname(pathname: string): string {
  const english = toEnglishPathname(pathname)
  return english === '/' ? '/zh' : `/zh${english}`
}

export function isSwitchablePublicPath(pathname: string): boolean {
  const normalized = normalizePathname(pathname)
  if (STATIC_EXCLUDES.has(normalized)) return false
  return !EXCLUDED_PREFIXES.some((prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`))
}

export function hasExactChineseEquivalent(pathname: string): boolean {
  const english = toEnglishPathname(pathname)
  return Boolean(EXACT_ROUTE_MAP_EN_TO_ZH[english])
}

export function exactChineseEquivalentForEnglish(pathname: string): string | null {
  const english = toEnglishPathname(pathname)
  return EXACT_ROUTE_MAP_EN_TO_ZH[english] || null
}

export function exactEnglishEquivalentForChinese(pathname: string): string | null {
  const normalized = normalizePathname(pathname)
  const pair = Object.entries(EXACT_ROUTE_MAP_EN_TO_ZH).find(([, zhPath]) => zhPath === normalized)
  return pair?.[0] || null
}

export function localizedHref(href: string, locale: SiteLocale): string {
  if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) return href

  const { pathname, suffix } = splitHrefParts(href)
  if (!isSwitchablePublicPath(pathname)) return href

  const localizedPath = locale === 'zh' ? toChinesePathname(pathname) : toEnglishPathname(pathname)
  return `${localizedPath}${suffix}`
}

export function languageSwitchTarget(pathname: string): {
  currentLocale: SiteLocale
  targetLocale: SiteLocale
  currentPath: string
  targetPath: string
  hasExactEquivalent: boolean
} {
  const currentPath = normalizePathname(pathname)
  const currentLocale = localeFromPathname(currentPath)
  const targetLocale: SiteLocale = currentLocale === 'en' ? 'zh' : 'en'

  if (currentLocale === 'zh') {
    return {
      currentLocale,
      targetLocale,
      currentPath,
      targetPath: exactEnglishEquivalentForChinese(currentPath) || toEnglishPathname(currentPath),
      hasExactEquivalent: Boolean(exactEnglishEquivalentForChinese(currentPath)),
    }
  }

  return {
    currentLocale,
    targetLocale,
    currentPath,
    targetPath: exactChineseEquivalentForEnglish(currentPath) || toChinesePathname(currentPath),
    hasExactEquivalent: hasExactChineseEquivalent(currentPath),
  }
}

export function localizedAlternates(pathname: string): {
  canonicalPath: string
  languages?: Record<string, string>
  locale: SiteLocale
} {
  const normalized = normalizePathname(pathname)
  const locale = localeFromPathname(normalized)

  if (locale === 'zh') {
    const englishExact = exactEnglishEquivalentForChinese(normalized)
    if (englishExact) {
      return {
        canonicalPath: normalized,
        locale,
        languages: {
          'en-AU': englishExact,
          'zh-CN': normalized,
          'x-default': englishExact,
        },
      }
    }

    return {
      canonicalPath: toEnglishPathname(normalized),
      locale,
    }
  }

  const chineseExact = exactChineseEquivalentForEnglish(normalized)
  if (chineseExact) {
    return {
      canonicalPath: normalized,
      locale,
      languages: {
        'en-AU': normalized,
        'zh-CN': chineseExact,
        'x-default': normalized,
      },
    }
  }

  return {
    canonicalPath: normalized,
    locale,
  }
}

export function routeLabelForChineseFallback(pathname: string): string {
  const englishPath = toEnglishPathname(pathname)
  if (englishPath === '/') return 'Bayview Hub 首页'
  if (englishPath === '/mendpress') return 'Mendpress'
  if (englishPath.startsWith('/mendpress/')) return 'Mendpress 页面'
  if (englishPath === '/newsletter') return '通讯页'
  if (englishPath === '/experiences') return '体验'
  if (englishPath.startsWith('/backyard-small-second-home')) return '后院第二小住宅'
  if (englishPath === '/about') return '关于我们'
  if (englishPath === '/visit') return '到访信息'
  if (englishPath === '/events') return '活动'
  if (englishPath.startsWith('/partners')) return '合作方'
  if (englishPath === '/workshops') return '工作坊'
  if (englishPath === '/edible-gardens') return '可食花园'
  if (englishPath === '/privacy') return '隐私政策'
  if (englishPath === '/terms') return '服务条款'
  if (englishPath === '/invest') return '投资信息'
  return englishPath
}
