/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  mode: "production",
  swSrc: "service-worker.js",
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

 /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  reactStrictMode: true,
});

module.exports = nextConfig;
