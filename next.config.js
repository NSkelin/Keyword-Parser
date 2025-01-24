/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@/utils"],
  },
};

module.exports = nextConfig;
