/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/pigandwhistle',
        destination: 'https://thepigandwhistle.com.au',
        permanent: false,
      },
      {
        source: '/second-home/feasibility-check',
        destination: '/backyard-second-home/feasibility-checklist',
        permanent: true,
      },
      {
        source: '/gardens',
        destination: '/edible-gardens',
        permanent: true,
      },
      {
        source: '/experiences/gallery',
        destination: '/art-gallery',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

