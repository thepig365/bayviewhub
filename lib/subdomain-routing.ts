/**
 * Bayview Hub – marketing subdomain routing (single source of truth).
 *
 * Goal: keep canonical pages on www.bayviewhub.me untouched, but expose
 * short, memorable subdomain aliases for campaigns. Add a new alias by
 * appending one entry to SUBDOMAIN_ROUTES and adding the domain in Vercel.
 *
 * Conventions:
 * - 308 redirects are the default (preserve method, signal permanence to
 *   crawlers, transfer link equity to the canonical destination).
 * - Use `mode: 'rewrite'` only when the branded subdomain must remain in
 *   the address bar for a campaign (and add explicit canonical metadata
 *   on the destination page if you do).
 * - `external: true` means `destination` is a fully-qualified URL on a
 *   different host (e.g. gallery.bayviewhub.me) and is used verbatim.
 * - Existing app routes remain the source of truth; aliases never replace
 *   them.
 */

export type SubdomainRouteMode = 'redirect' | 'rewrite'

export type SubdomainRoute = {
  /** Hostname to match, lowercase, no port. */
  hostname: string
  /** Either a path beginning with "/" (relative to canonical host) or a full URL when `external` is true. */
  destination: string
  mode: SubdomainRouteMode
  /** HTTP status for redirects. Defaults to 308 (permanent, method-preserving). */
  status?: 301 | 302 | 307 | 308
  /** Destination is a full external URL (different host). */
  external?: boolean
  /**
   * If true and the visitor lands on a sub-path (e.g. /foo?x=1), append the
   * sub-path to the destination. Default false – aliases collapse to a single
   * landing page.
   */
  preserveSubpath?: boolean
  /** Optional editorial note for maintainers. */
  notes?: string
}

/** Canonical host the application is served from. */
export const CANONICAL_HOST = 'www.bayviewhub.me'

/**
 * Marketing subdomain aliases. Order does not matter (lookup is by hostname).
 * Add new entries here to ship a new alias in <5 minutes (plus DNS).
 */
export const SUBDOMAIN_ROUTES: SubdomainRoute[] = [
  {
    hostname: 'secondhome.bayviewhub.me',
    destination: '/backyard-small-second-home',
    mode: 'redirect',
    status: 308,
    notes: 'Backyard Small Second Home – primary marketing alias.',
  },
  {
    hostname: 'ssd.bayviewhub.me',
    destination: '/backyard-small-second-home',
    mode: 'redirect',
    status: 308,
    notes:
      'Short alias. Single-hop direct to canonical (not chained through secondhome) to preserve SEO quality and reduce latency.',
  },
  {
    hostname: 'gardens.bayviewhub.me',
    destination: '/edible-gardens',
    mode: 'redirect',
    status: 308,
    notes: 'Edible Gardens marketing alias.',
  },
  {
    hostname: 'privatewall.bayviewhub.me',
    destination: 'https://gallery.bayviewhub.me/open-your-wall',
    mode: 'redirect',
    status: 308,
    external: true,
    notes:
      'Open Your Wall lives in the gallery sub-project; this is only a short URL, NOT a re-architecture.',
  },
  {
    hostname: 'workshops.bayviewhub.me',
    destination: '/workshops',
    mode: 'redirect',
    status: 308,
  },
  {
    hostname: 'partners.bayviewhub.me',
    destination: '/partners',
    mode: 'redirect',
    status: 308,
  },
  {
    hostname: 'invest.bayviewhub.me',
    destination: '/invest',
    mode: 'redirect',
    status: 308,
  },
]

const SUBDOMAIN_ROUTE_MAP: Map<string, SubdomainRoute> = new Map(
  SUBDOMAIN_ROUTES.map((r) => [r.hostname.toLowerCase(), r])
)

/** Lookup a subdomain route by raw `host` header value. Returns null if no match (or no host). */
export function findSubdomainRoute(host: string | null | undefined): SubdomainRoute | null {
  if (!host) return null
  const hostname = host.split(':')[0].toLowerCase()
  return SUBDOMAIN_ROUTE_MAP.get(hostname) || null
}

/**
 * Resolve the absolute destination URL for a matched alias, taking into
 * account the request URL (so we can preserve query params and, when
 * configured, sub-paths).
 */
export function resolveSubdomainDestination(
  route: SubdomainRoute,
  requestUrl: URL
): URL {
  const base = route.external
    ? new URL(route.destination)
    : new URL(route.destination, `https://${CANONICAL_HOST}`)

  if (route.preserveSubpath && requestUrl.pathname && requestUrl.pathname !== '/') {
    // Append the sub-path safely (single trailing slash handling).
    const left = base.pathname.replace(/\/$/, '')
    const right = requestUrl.pathname.startsWith('/')
      ? requestUrl.pathname
      : `/${requestUrl.pathname}`
    base.pathname = `${left}${right}`
  }

  // Always preserve incoming query params (UTMs etc.); never overwrite ones
  // the destination already specified.
  requestUrl.searchParams.forEach((value, key) => {
    if (!base.searchParams.has(key)) base.searchParams.append(key, value)
  })

  return base
}
