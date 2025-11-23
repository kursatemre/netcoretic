/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-cdn-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Vercel deployment için trailing slash devre dışı
  trailingSlash: false,
  // Skip trailing slash redirect
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
