// Site-wide constants
export const SITE_CONFIG = {
  name: 'Bayview Hub',
  tagline: 'Eat, Stay, Connect, Create, Mend',
  description: 'A destination hub with winery dining, accommodation, art spaces, wellbeing programs, and edible gardens.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://bayviewhub.com.au',
  pigAndWhistleUrl: 'https://thepigandwhistle.com.au',
  email: 'leonzh@bayviewestate.com.au',
  phone: '(03) 5989 6130',
  address: '365 Purves Road, Main Ridge, Victoria 3928, Australia',
}

// Social media links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/bayviewhub',
  instagram: 'https://instagram.com/bayviewhub',
  twitter: 'https://twitter.com/bayviewhub',
  linkedin: 'https://linkedin.com/company/bayviewhub',
}

// Navigation items
export const NAV_ITEMS = [
  { label: 'Overview', href: '/' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Cellar Door', href: '/cellar-door' },
  { label: 'Events', href: '/events' },
  { label: 'Second Home', href: '/second-home' },
  { label: 'Partners', href: '/partners' },
  { label: 'Invest', href: '/invest' },
  { label: 'Visit', href: '/visit' },
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
      id: 'gallery',
      title: 'Bayview Arts Gallery',
      blurb: 'Curated exhibitions, openings, and collectible works.',
      cta: { label: 'Explore Gallery', href: '/experiences/gallery' },
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
      cta: { label: 'Subscribe', href: '/gardens' },
      prelaunch: true,
      image: '/images/gardens.jpg',
      category: 'grow',
    },
    {
      id: 'second-home',
      title: 'Small Second Home Builder',
      blurb: 'Turn your backyard into a beautiful granny flat or second home for family, guests, or rental income.',
      cta: { label: 'Explore Options', href: '/second-home' },
      image: '/images/second-home/garden-studio.jpg',
      category: 'stay',
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
      cta: { label: 'Venue Enquiry', href: 'https://www.thepigandwhistle.com.au/accommodation', external: true },
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
    title: 'Founding Art Therapy Program Lead',
    summary: 'Design safe, ethical programs and scalable workshop systems.',
    description: 'Create and lead expressive arts and wellbeing programs.',
    responsibilities: [
      'Design and deliver art therapy workshops',
      'Ensure ethical and safe program delivery',
      'Build scalable workshop systems',
      'Manage practitioner credentials and insurance',
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

