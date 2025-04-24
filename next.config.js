
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lovable-uploads.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
