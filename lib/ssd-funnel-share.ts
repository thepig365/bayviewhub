/**
 * Mailto + share copy for SSD funnel pages (used with ShareStrip).
 * URLs are built with SITE_CONFIG.url + path at render time.
 */
export const SSD_FUNNEL_SHARE = {
  '/backyard-small-second-home': {
    subject: 'Backyard Small Second Home — Bayview Hub',
    intro:
      'Sharing Bayview Hub’s Victorian Backyard Small Second Home (SSD) hub — overview, programme pages, and feasibility check.',
  },
  '/backyard-small-second-home/approach': {
    subject: 'Why this SSD pathway — Bayview Hub',
    intro: 'Sharing Bayview Hub’s page on why we lead with Victorian SSD rules and planning clarity.',
  },
  '/backyard-small-second-home/is-this-for-you': {
    subject: 'Is this SSD pathway for you? — Bayview Hub',
    intro: 'Sharing Bayview Hub’s fit check for the Victorian Backyard Small Second Home framework.',
  },
  '/backyard-small-second-home/victoria-rules': {
    subject: 'Victorian SSD rules — Bayview Hub',
    intro: 'Sharing Bayview Hub’s plain-English summary of Victorian Small Second Dwelling hard lines — verify on your title.',
  },
  '/backyard-small-second-home/cost-rent-roi': {
    subject: 'SSD cost and context — Bayview Hub',
    intro: 'Sharing Bayview Hub’s indicative Victorian SSD cost tiers and rental context (not a quote).',
  },
  '/backyard-small-second-home/granny-flat-victoria': {
    subject: 'Granny flat / SSD Victoria — Bayview Hub',
    intro: 'Sharing Bayview Hub’s page mapping “granny flat” searches to the Victorian SSD framework.',
  },
  '/backyard-small-second-home/mornington-peninsula': {
    subject: 'SSD Mornington Peninsula — Bayview Hub',
    intro: 'Sharing Bayview Hub’s Mornington Peninsula context for small second dwellings — overlays and site review.',
  },
  '/backyard-small-second-home/feasibility-check': {
    subject: 'SSD feasibility check — Bayview Hub',
    intro: 'Sharing Bayview Hub’s interactive Victorian SSD feasibility checklist and optional written response.',
  },
} as const

export type SsdFunnelSharePath = keyof typeof SSD_FUNNEL_SHARE
