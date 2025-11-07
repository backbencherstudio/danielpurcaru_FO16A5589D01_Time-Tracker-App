import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  images: {
    domains: ['server.cdcg.pt','nirob.signalsmind.com'],
  },
};

export default nextConfig;
