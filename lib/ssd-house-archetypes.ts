/**
 * Visual house-type row on the main SSD hub — one card per image in /public/images/second-home/.
 * Filenames match the project’s second-home asset set (see README in that folder).
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
      'A light backyard studio volume — work, music, or a quiet room. Still has to meet SSD gross floor area, siting, and title rules for your lot.',
    href: '/backyard-small-second-home/victoria-rules',
    linkLabel: 'Size and siting rules',
  },
  {
    image: '/images/second-home/guest-cottage.jpg',
    title: 'Guest cottage',
    description:
      'Small cottage-style annexe for guests or family on the same title — the shape many people describe as a granny flat before they read the official SSD wording.',
    href: '/backyard-small-second-home/granny-flat-victoria',
    linkLabel: 'Granny flat wording → SSD',
  },
  {
    image: '/images/second-home/family-pod.jpg',
    title: 'Family pod',
    description:
      'Flexible pod-style space for a second adult, visitors, or part-time rent — always on one title and behind the main house when the pathway fits.',
    href: '/backyard-small-second-home/cost-rent-roi',
    linkLabel: 'Cost and rent context',
  },
  {
    image: '/images/second-home/minimalist-studio.jpg',
    title: 'Minimalist studio',
    description:
      'Simple form and glazing where the brief is a single clear room — overlays, bush fire, and services on your block still set the real constraints.',
    href: '/backyard-small-second-home/mornington-peninsula',
    linkLabel: 'Peninsula & overlays',
  },
  {
    image: '/images/second-home/california-bungalow.jpg',
    title: 'California bungalow',
    description:
      'Traditional roof and modest street presence; inside can stay compact enough for SSD if the measured GFA and siting stack up on your title.',
    href: '/backyard-small-second-home/is-this-for-you',
    linkLabel: 'Check fit for your goals',
  },
  {
    image: '/images/second-home/two-bedroom.jpg',
    title: 'Two-bedroom',
    description:
      'Sleep and living split in one small dwelling — only on the SSD pathway when the whole building stays within the State cap, not a full-size second house.',
    href: '/backyard-small-second-home/victoria-rules',
    linkLabel: 'Read the hard lines',
  },
]
