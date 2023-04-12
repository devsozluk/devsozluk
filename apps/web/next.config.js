/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
