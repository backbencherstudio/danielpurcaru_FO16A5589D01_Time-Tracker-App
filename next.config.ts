import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  images: {
    domains: ['server.cdcg.pt'], // Add your image source domain here
  },
};

export default nextConfig;
