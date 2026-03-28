/**
 * Visual archetypes for the main SSD landing — illustrative formats only.
 * All remain subject to Victorian SSD limits (e.g. ≤60 sqm GFA, same title, siting rules).
 * Images: /public/images/second-home/*.jpg (README names; replace with Bayview photography when ready).
 */
export type SsdHouseArchetype = {
  image: string
  title: string
  description: string
  href?: string
  linkLabel?: string
}

export const SSD_HOUSE_ARCHETYPES: SsdHouseArchetype[] = [
  {
    image: '/images/second-home/garden-studio.jpg',
    title: 'Garden studio',
    description:
      'A light, single-volume building tucked into the backyard — work, music, or a quiet room away from the main house. The whole dwelling still has to fit the SSD gross floor area cap.',
    href: '/backyard-small-second-home/victoria-rules',
    linkLabel: 'Size and siting rules',
  },
  {
    image: '/images/second-home/guest-cottage.jpg',
    title: 'Guest annexe',
    description:
      'Reads like a small cottage: sleeping, sitting, and services in one compact footprint. Often what people picture for parents or guests — same title, behind the main home.',
    href: '/backyard-small-second-home/granny-flat-victoria',
    linkLabel: 'Granny flat wording → SSD',
  },
  {
    image: '/images/second-home/family-pod.jpg',
    title: 'Flexible living pod',
    description:
      'Open plan you can furnish for a young adult, guests, or part-time rent — still on your block and on one title. Running costs and rent context depend on your site and market.',
    href: '/backyard-small-second-home/cost-rent-roi',
    linkLabel: 'Cost and rent context',
  },
  {
    image: '/images/second-home/minimalist-studio.jpg',
    title: 'Courtyard studio',
    description:
      'Simple lines and glass where the brief favours clarity over rooms — common for a studio or deep-work space. Bushfire, overlays, and services still decide what you can build.',
    href: '/backyard-small-second-home/mornington-peninsula',
    linkLabel: 'Peninsula & overlays',
  },
  {
    image: '/images/second-home/california-bungalow.jpg',
    title: 'Gabled backyard room',
    description:
      'A familiar roof form and modest street-facing discretion; inside can still be one or two small zones if the measured GFA stays within the SSD framework.',
    href: '/backyard-small-second-home/is-this-for-you',
    linkLabel: 'Check fit for your goals',
  },
  {
    image: '/images/second-home/two-bedroom.jpg',
    title: 'Compact two-zone plan',
    description:
      'Rough sleep + living split when the overall envelope stays small enough for SSD — not a full “big second house”. If you need more than 60 sqm GFA, the pathway is different.',
    href: '/backyard-small-second-home/victoria-rules',
    linkLabel: 'Read the hard lines',
  },
]
