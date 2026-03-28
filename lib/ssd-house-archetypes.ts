/**
 * Named house-type visuals for the main SSD hub.
 * Files live in /public/images/second-home/ — use exact filenames (including typos on disk).
 */
export type SsdHouseArchetypeExterior = {
  kind: 'exterior'
  image: string
  title: string
  description: string
  /** Descriptive alt for accessibility / AEO */
  imageAlt: string
  href?: string
  linkLabel?: string
}

export type SsdHouseArchetypeFloorPlan = {
  kind: 'floorPlan'
  image: string
  title: string
  description: string
  imageAlt: string
  href?: string
  linkLabel?: string
}

/** Four hero-style exterior / render cards */
export const SSD_HOUSE_ARCHETYPES_EXTERIOR: SsdHouseArchetypeExterior[] = [
  {
    kind: 'exterior',
    image: '/images/second-home/Blackwood Reteat.jpg',
    title: 'Blackwood Retreat',
    imageAlt:
      'Blackwood Retreat — small second dwelling with dark timber cladding and gabled roof, backyard setting.',
    description:
      'Dark timber and a simple gabled form — a compact annexe or guest read that still has to sit inside the SSD size and siting tests on your lot.',
    href: '/backyard-small-second-home/victoria-rules',
    linkLabel: 'Size and siting rules',
  },
  {
    kind: 'exterior',
    image: '/images/second-home/Skylark Pavilion.jpg',
    title: 'Skylark Pavilion',
    imageAlt: 'Skylark Pavilion — light-filled pavilion-style small home with large glass walls opening to garden.',
    description:
      'Pavilion-style glazing and a light shell — a useful mental model for a garden studio or second living volume when overlays and privacy allow.',
    href: '/backyard-small-second-home/mornington-peninsula',
    linkLabel: 'Peninsula & overlays',
  },
  {
    kind: 'exterior',
    image: '/images/second-home/Skydeck Retreat.jpg',
    title: 'Skydeck Retreat',
    imageAlt: 'Skydeck Retreat — modern small second dwelling with deck and elevated outdoor living space.',
    description:
      'Deck-led outdoor living attached to a small box — shows how a second volume can feel separate without another title, if height and setbacks comply.',
    href: '/backyard-small-second-home/cost-rent-roi',
    linkLabel: 'Indicative cost context',
  },
  {
    kind: 'exterior',
    image: '/images/second-home/Heritage Verandah.jpg',
    title: 'Heritage Verandah',
    imageAlt: 'Heritage Verandah — cottage-style small home with verandah and traditional roofline.',
    description:
      'Verandah-front cottage language many people associate with a granny flat — still only SSD if measured GFA and siting match the framework.',
    href: '/backyard-small-second-home/granny-flat-victoria',
    linkLabel: 'Granny flat wording → SSD',
  },
]

/** Supporting layout — not a hero exterior; rendered smaller and separately */
export const SSD_HOUSE_ARCHETYPE_FLOOR_PLAN: SsdHouseArchetypeFloorPlan = {
  kind: 'floorPlan',
  image: '/images/second-home/Typical two bedroom.jpg',
  title: 'Typical two bedroom floor plan',
  imageAlt: 'Typical two bedroom floor plan — schematic layout with bedroom, living, and wet areas in a compact footprint.',
  description:
    'Indicative plan only: one way to split sleep and living in a small footprint — your surveyor still measures gross floor area against the 60 sqm SSD cap.',
  href: '/backyard-small-second-home/victoria-rules',
  linkLabel: 'How GFA is counted',
}
