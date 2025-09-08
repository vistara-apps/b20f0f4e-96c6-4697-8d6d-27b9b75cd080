/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
    AIRSTACK_API_KEY: process.env.AIRSTACK_API_KEY,
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    PRIVY_APP_ID: process.env.PRIVY_APP_ID,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET_KEY: process.env.PINATA_SECRET_KEY,
  },
}

module.exports = nextConfig
