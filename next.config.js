/** @type {import('next').NextConfig} */
const rewrites = process.env.NODE_ENV === 'development' ? [
  {
    source: '/api/:path*',
    destination: `https://arow-cup.vercel.app/:path*`,
  },
] : [];
const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  async rewrites() {
    return rewrites;
  },
};

module.exports = nextConfig;
