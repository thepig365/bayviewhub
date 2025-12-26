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
    ]
  },
}

module.exports = nextConfig

