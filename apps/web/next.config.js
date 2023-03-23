/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ["avatars.githubusercontent.com", "api.dicebear.com", "avatars.dicebear.com"], formats: ['image/webp'],
  }
}

module.exports = nextConfig
