import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
  },
  // The Readiness Assessment is a self-contained page in public/; scoring runs in the browser.
  async rewrites() {
    return [{ source: "/assessment", destination: "/assessment.html" }];
  },
};

export default nextConfig;
