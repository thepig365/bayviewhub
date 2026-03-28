/**
 * Practical SSD use-case types for the main hub (not separate planning pathways).
 * Copy is grounded in funnel language: same 60 sqm / same title / siting rules apply.
 */
export type SsdHouseUseType = {
  label: string
  description: string
  /** Internal route when a programme page adds clarity */
  href?: string
  linkLabel?: string
}

export const SSD_HOUSE_USE_TYPES: SsdHouseUseType[] = [
  {
    label: 'Close family or carer annexe',
    description:
      'A separate small home for a parent or family member on the same title, behind the main house — what many people still call a granny flat.',
    href: '/backyard-small-second-home/granny-flat-victoria',
    linkLabel: 'Granny flat wording → SSD',
  },
  {
    label: 'Studio or separate workspace',
    description:
      'A detached room for focused work or study; the layout still has to sit inside the SSD gross floor area cap and behind the front wall.',
    href: '/backyard-small-second-home/victoria-rules',
    linkLabel: 'Read the hard lines',
  },
  {
    label: 'Rental on the same lot',
    description:
      'A compliant second dwelling can be rented while it stays on your title — running costs and rent context vary by site and market.',
    href: '/backyard-small-second-home/cost-rent-roi',
    linkLabel: 'Explore likely costs',
  },
  {
    label: 'Youth or second adult',
    description:
      'A young adult or second household member with their own door, without subdividing — useful only when your block can meet the same SSD tests.',
    href: '/backyard-small-second-home/is-this-for-you',
    linkLabel: 'Check fit for your goals',
  },
  {
    label: 'Overlay-heavy blocks',
    description:
      'State SSD rules are Victoria-wide; heritage, flood, bush fire, or Green Wedge-style overlays often decide whether you stay on a light pathway.',
    href: '/backyard-small-second-home/mornington-peninsula',
    linkLabel: 'Peninsula & overlay context',
  },
]
