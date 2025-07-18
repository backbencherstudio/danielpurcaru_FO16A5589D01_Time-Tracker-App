import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  images: {
    domains: ['laboratory-auctions-comes-cooler.trycloudflare.com'], // Add your image source domain here
  },
};

export default nextConfig;
