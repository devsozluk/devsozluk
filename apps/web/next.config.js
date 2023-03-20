/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com"], formats: ['image/webp'],
  }
}

module.exports = nextConfig
