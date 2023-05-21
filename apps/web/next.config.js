/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  experimental: {
    appDir: false,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "avatars.githubusercontent.com",
      "api.dicebear.com",
      "avatars.dicebear.com",
      "hbtqnagzrlfxnfdugkvr.supabase.co",
    ],
    formats: ["image/webp"],
  },
    reactStrictMode: true,
});

module.exports = nextConfig;
