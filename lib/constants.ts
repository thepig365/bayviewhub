/** External Bayview Arts Gallery (subdomain) — single source for hub → gallery links */
export const GALLERY_EXTERNAL = {
  base: 'https://gallery.bayviewhub.me',
  archive: 'https://gallery.bayviewhub.me/archive',
  /** Private Viewing Network programme (hosts, artists, viewers) */
  openYourWall: 'https://gallery.bayviewhub.me/open-your-wall',
  passportRegister: 'https://gallery.bayviewhub.me/passport/register',
  submit: 'https://gallery.bayviewhub.me/submit',
  protocol: 'https://gallery.bayviewhub.me/protocol',
  rights: 'https://gallery.bayviewhub.me/rights',
} as const

/** Mailto for invited viewing access (viewer / collector path) */
export const GALLERY_VIEWING_REQUEST_MAILTO =
  'mailto:gallery@bayviewhub.me?subject=' +
  encodeURIComponent('Viewing Access Request — Bayview Hub Private Viewing Network')

/** Main-site Backyard Small Second Home (SSD) landing and key conversion paths */
export const SSD_LANDING = {
  overview: '/backyard-small-second-home',
  feasibility: '/backyard-small-second-home/feasibility-check',
  costRoi: '/backyard-small-second-home/cost-rent-roi',
  victoriaRules: '/backyard-small-second-home/victoria-rules',
} as const

/** Mobile nav + footer: hub, philosophy, fit, then practical + conversion */
export const SSD_QUICK_LINKS: { label: string; href: string }[] = [
  { label: 'Overview', href: SSD_LANDING.overview },
  { label: 'Why this pathway', href: '/backyard-small-second-home/approach' },
  { label: 'Is this for you?', href: '/backyard-small-second-home/is-this-for-you' },
  { label: 'Feasibility check', href: SSD_LANDING.feasibility },
  { label: 'Cost, rent & ROI', href: SSD_LANDING.costRoi },
  { label: 'Victoria rules', href: SSD_LANDING.victoriaRules },
]

/** Full SSD funnel: one job per URL; used on the main hub programme map */
export const SSD_PROGRAMME_MAP: { href: string; label: string; job: string }[] = [
  {
    href: SSD_LANDING.overview,
    label: 'Overview',
    job: 'Start here: short definition, programme list, and feasibility CTA.',
  },
  {
    href: '/backyard-small-second-home/approach',
    label: 'Why this pathway',
    job: 'Why we lead with rules and planning clarity — not a sales script.',
  },
  {
    href: '/backyard-small-second-home/is-this-for-you',
    label: 'Is this for you?',
    job: 'Fit check: strong match vs poor match; when to use the feasibility tool.',
  },
  {
    href: SSD_LANDING.victoriaRules,
    label: 'Victoria rules',
    job: 'VC253/VC282 hard lines; official links — always verify on your title.',
  },
  {
    href: SSD_LANDING.costRoi,
    label: 'Cost, rent & ROI',
    job: 'What drives build cost; rental context without “get rich” framing.',
  },
  {
    href: '/backyard-small-second-home/granny-flat-victoria',
    label: 'Granny flat (Victoria)',
    job: 'If you searched “granny flat”: how that lines up with SSD.',
  },
  {
    href: '/backyard-small-second-home/mornington-peninsula',
    label: 'Mornington Peninsula',
    job: 'Peninsula overlays, access, and why site review still matters.',
  },
  {
    href: SSD_LANDING.feasibility,
    label: 'Feasibility check',
    job: 'Interactive pathway check + optional submission for a written response.',
  },
]

// Site-wide constants
export const SITE_CONFIG = {
  name: 'Bayview Hub',
  tagline: 'Backyard Small Second Home, Estate Dining & Creative Experiences in Victoria',
  description: 'Estate dining, live music, and farmhouse accommodation at Bayview Hub, Main Ridge, Mornington Peninsula. Backyard Small Second Home design-build enquiries now open across Victoria. Creative programs including arts, workshops, and edible gardens in development.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bayviewhub.me',
  pigAndWhistleUrl: 'https://thepigandwhistle.com.au',
  email: 'leonzh@bayviewestate.com.au',
  phone: '0499 6666 88',
  address: '365 Purves Road, Main Ridge, Victoria 3928, Australia',
}

// Canonical opening hours (source of truth for entire site)
export const SITE_HOURS = {
  schedule: [
    { days: 'Monday & Tuesday', hours: 'Closed' },
    { days: 'Wednesday', hours: '11:00 AM – 4:00 PM' },
    { days: 'Thursday – Sunday', hours: '11:00 AM – Late' },
  ],
  summary: 'Wed–Sun | 11 AM – Late',
  note: 'Individual venue hours may vary. Check specific experiences for details.',
}

// Social media links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/bayviewhub',
  instagram: 'https://instagram.com/bayviewhub',
  twitter: 'https://twitter.com/bayviewhub',
  linkedin: 'https://www.linkedin.com/',
}

/** Single row in a nav dropdown */
export type SiteNavChild = { label: string; href: string; external?: boolean }

/** Top-level navigation (desktop + mobile IA) */
export type SiteNavEntry =
  | {
      kind: 'group'
      label: string
      /** Primary tap target for the parent label (desktop) */
      href: string
      external?: boolean
      children: SiteNavChild[]
    }
  | {
      kind: 'link'
      label: string
      href: string
      external?: boolean
      /** Extra rows in mobile drawer only (e.g. SSD deep links) */
      mobileSublinks?: SiteNavChild[]
    }

const PIG_WHISTLE = 'https://www.thepigandwhistle.com.au/'

export const SITE_NAV: SiteNavEntry[] = [
  {
    kind: 'group',
    label: "What's On",
    href: '/events',
    children: [
      { label: 'Workshops', href: '/workshops' },
      { label: 'Events', href: '/events' },
      { label: 'Live Music', href: `${PIG_WHISTLE}what-s-on`, external: true },
      { label: 'Cellar Door', href: '/cellar-door' },
    ],
  },
  { kind: 'link', label: 'Food/Wine', href: PIG_WHISTLE, external: true },
  {
    kind: 'link',
    label: 'Backyard Small Second Home',
    href: SSD_LANDING.overview,
    mobileSublinks: SSD_QUICK_LINKS.map((l) => ({ label: l.label, href: l.href })),
  },
  {
    kind: 'group',
    label: 'Gallery',
    href: GALLERY_EXTERNAL.archive,
    external: true,
    children: [
      { label: 'Collection', href: GALLERY_EXTERNAL.archive, external: true },
      { label: 'Private Viewing', href: GALLERY_EXTERNAL.openYourWall, external: true },
      { label: 'Open Your Wall — Register a Work', href: GALLERY_EXTERNAL.passportRegister, external: true },
      { label: 'Submit Artwork', href: GALLERY_EXTERNAL.submit, external: true },
      { label: 'Assessment Protocol', href: GALLERY_EXTERNAL.protocol, external: true },
      { label: 'Rights & Licensing', href: GALLERY_EXTERNAL.rights, external: true },
    ],
  },
  { kind: 'link', label: 'Edible Gardens', href: '/edible-gardens' },
  {
    kind: 'group',
    label: 'Visit Us',
    href: '/visit',
    children: [
      { label: 'Plan your visit', href: '/visit' },
      { label: 'Hours & contact', href: '/visit#visit-info' },
      { label: 'Directions', href: '/visit#visit-directions' },
      { label: 'Map', href: '/visit#visit-map' },
      { label: 'Surrounding destinations', href: '/visit#visit-nearby' },
      { label: 'Cellar Door tastings', href: '/visit#cellar' },
    ],
  },
]

// Primary CTAs
export const PRIMARY_CTAS = [
  { label: 'Become a Partner', href: '/partners', variant: 'primary', external: false },
  { label: 'Book Wine Tasting', href: '/cellar-door#book', variant: 'accent', external: false, prelaunch: true },
]

// Experiences data
export const EXPERIENCES = {
  new: [
    {
      id: 'second-home',
      title: 'Backyard Small Second Home',
      blurb: 'Create a calm, flexible space on your property — for family, privacy, rental income, or long-term value. Enquiries for site assessment are now open across Victoria.',
      cta: { label: 'Check If My Property Qualifies', href: SSD_LANDING.overview },
      image: '/images/stay.jpg',
      category: 'stay',
    },
    {
      id: 'gallery',
      title: 'Bayview Arts Gallery',
      blurb: 'Browse the collection online. Private viewing by arrangement — and a host pathway for works on private walls.',
      cta: { label: 'Browse collection', href: GALLERY_EXTERNAL.archive, external: true },
      ctaSecondary: { label: 'Private Viewing', href: GALLERY_EXTERNAL.openYourWall, external: true },
      prelaunch: true,
      image: '/images/gallery.jpg',
      category: 'create',
    },
    {
      id: 'workshops',
      title: 'Art Workshops & Art Therapy',
      blurb: 'Expressive arts programs for wellbeing, guided by professionals.',
      cta: { label: 'Book a Workshop', href: '/workshops' },
      prelaunch: true,
      image: '/images/workshops.jpg',
      category: 'create',
    },
    {
      id: 'gardens',
      title: 'Edible Gardens Subscriptions',
      blurb: 'Seasonal harvest, family-friendly garden days, and member experiences.',
      cta: { label: 'Founding Partner', href: '/partners/edible-gardens' },
      prelaunch: true,
      image: '/images/gardens.jpg',
      category: 'grow',
    },
  ],
  core: [
    {
      id: 'restaurant',
      title: 'Winery Restaurant',
      blurb: 'Farm-to-table dining with estate wines and seasonal produce.',
      cta: { label: 'Book at Pig & Whistle', href: SITE_CONFIG.pigAndWhistleUrl, external: true },
      image: '/images/restaurant.jpg',
      category: 'eat',
    },
    {
      id: 'cellar',
      title: 'Cellar Door',
      blurb: 'Wine tastings and cellar door experiences.',
      cta: { label: 'Taste & Visit', href: '/visit#cellar' },
      prelaunch: true,
      image: '/images/cellar.jpg',
      category: 'drink',
    },
    {
      id: 'music',
      title: 'The Shed Music',
      blurb: 'Live music weekends featuring local and touring artists.',
      cta: { label: 'Tickets at Pig & Whistle', href: 'https://www.thepigandwhistle.com.au/what-s-on', external: true },
      image: '/images/music.jpg',
      category: 'listen',
    },
    {
      id: 'functions',
      title: 'Functions & Groups',
      blurb: 'Private events, weddings, and corporate gatherings on our beautiful 30-acre property.',
      cta: { label: 'Venue Enquiry', href: 'https://www.thepigandwhistle.com.au/function-bookings', external: true },
      image: '/images/functions.jpg',
      category: 'celebrate',
    },
    {
      id: 'stay',
      title: 'Stay',
      blurb: 'The Farmhouse accommodation on 30 acres with rolling hills, just 15 minutes from Peninsula Hot Springs.',
      cta: { label: 'View Accommodation', href: 'https://www.thepigandwhistle.com.au/accommodation', external: true },
      image: '/images/stay.jpg',
      category: 'stay',
    },
  ],
}

// Founding roles
export const FOUNDING_ROLES = [
  {
    id: 'curator',
    title: 'Founding Curator / Gallery Director',
    summary: 'Build exhibitions, artist relationships, and sales operations.',
    description: 'Lead the establishment of Bayview Arts Gallery from the ground up.',
    responsibilities: [
      'Curate exhibitions and manage artist relationships',
      'Develop sales operations and collector network',
      'Design gallery programs and events calendar',
      'Build partnerships with art institutions',
    ],
  },
  {
    id: 'art-therapy',
    title: 'Founding Therapeutic Workshops Program Director',
    summary: "Lead the design and launch of Bayview Hub's therapeutic workshop program—safe, ethical, and commercially viable.",
    description: "Lead the design and launch of Bayview Hub's therapeutic workshop program—safe, ethical, and commercially viable.",
    responsibilities: [
      'Build the workshop calendar, formats, and facilitator roster',
      'Set safety, consent, and non-clinical boundaries (no medical claims)',
      'Own delivery quality, feedback loops, and partner collaborations',
    ],
    requirements: ['Qualified art therapist or equivalent', 'Professional indemnity insurance'],
  },
  {
    id: 'garden-ops',
    title: 'Founding Edible Garden Ops Lead',
    summary: 'Turn gardens into a subscription model with reliable delivery.',
    description: 'Build and operate the edible gardens subscription system.',
    responsibilities: [
      'Design seasonal harvest and delivery systems',
      'Manage subscriber experiences and events',
      'Build family-friendly garden programs',
      'Ensure operational reliability',
    ],
  },
]

