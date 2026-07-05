import type { NextConfig } from "next";

const withTM = require('next-transpile-modules')(['three'])
module.exports = withTM()

const nextConfig: NextConfig = {
  basePath: '',
  env: {
    OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
    GITHUB_READ_API_KEY: process.env.GITHUB_READ_API_KEY,
  },
  transpilePackages: ['three'],
};

export default nextConfig;
