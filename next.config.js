/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@/components", "@/utils"],
  },
};

module.exports = nextConfig;
