import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '',
  env: {
    OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
    GITHUB_READ_API_KEY: process.env.GITHUB_READ_API_KEY,
  }
};

export default nextConfig;
