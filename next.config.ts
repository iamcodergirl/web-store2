import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  /* config options here */
  images:{
    remotePatterns:[{ hostname: "cdn.sanity.io"}]
  }
};

export default nextConfig;
