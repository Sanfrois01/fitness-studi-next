/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  images: {
    path: '/_next/image', 
    loader: 'default',
    unoptimized: true,
  },

  env: {
    API_URL : "http://localhost:8000",
    IMAGES_DOMAIN : "localhost"
  }
  
}

module.exports = nextConfig
