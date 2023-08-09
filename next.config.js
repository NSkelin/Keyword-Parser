/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@/components/(((\\w*)?/?)*)": {
      transform: "@/components/{{matches.[1]}}/{{matches.[1]}}",
      skipDefaultConversion: true,
    },
    "@/components": {
      transform: "@/components/{{member}}/{{member}}",
    },
    "@/utils": {
      transform: "@/utils/utils",
      skipDefaultConversion: true,
    },
  },
};

module.exports = nextConfig;
