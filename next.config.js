/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      { source: '/__version', destination: '/version' },
    ]
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'bayviewhub.me' }],
        destination: 'https://www.bayviewhub.me/:path*',
        permanent: true,
      },
      {
        source: '/pigandwhistle',
        destination: 'https://thepigandwhistle.com.au',
        permanent: false,
      },
      {
        source: '/favicon.ico',
        destination: '/icon',
        permanent: true,
      },
      {
        source: '/second-home',
        destination: '/backyard-small-second-home',
        permanent: true,
      },
      {
        source: '/second-home/victoria-rules',
        destination: '/backyard-small-second-home/victoria-rules',
        permanent: true,
      },
      {
        source: '/second-home/cost-rent-roi',
        destination: '/backyard-small-second-home/cost-rent-roi',
        permanent: true,
      },
      {
        source: '/second-home/feasibility-check',
        destination: '/backyard-small-second-home/feasibility-check',
        permanent: true,
      },
      {
        source: '/backyard-second-home/feasibility-checklist',
        destination: '/backyard-small-second-home/feasibility-check',
        permanent: true,
      },
      {
        source: '/backyard-second-home/feasibility-checklist/thank-you',
        destination: '/backyard-small-second-home/feasibility-check/thank-you',
        permanent: true,
      },
      {
        source: '/gardens',
        destination: '/edible-gardens',
        permanent: true,
      },
      {
        source: '/experiences/gallery',
        destination: 'https://gallery.bayviewhub.me',
        permanent: false,
      },
      {
        source: '/art-gallery',
        destination: 'https://gallery.bayviewhub.me',
        permanent: false,
      },
      {
        source: '/events',
        destination: 'https://www.thepigandwhistle.com.au/what-s-on',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig

