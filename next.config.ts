import type { NextConfig } from "next";

const isTurbo = process.env.npm_lifecycle_event === "dev"; // 터보 전용 스크립트에서도 확인 가능

const nextConfig: NextConfig = {
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_STORAGE_HOSTNAME || "localhost",
        search: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  ...(isTurbo && {
    turbopack: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  }),
};

export default nextConfig;
