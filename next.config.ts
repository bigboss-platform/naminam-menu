import type { NextConfig } from "next";

/**
 * Media hosts. Every image URL lives in `src/features/core/config/media.config.ts`;
 * when the client's real photos move to another free host (Cloudinary, ImgBB, …)
 * add its hostname here — no component changes needed.
 */
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  /** Removed routes keep working — workspace rule: old routes redirect, never 404. */
  async redirects() {
    return [
      { source: '/contacto', destination: '/', permanent: true },
      { source: '/menu/:slug', destination: '/menu', permanent: true },
      // Section theme comparison pages, also reachable without the dash
      { source: '/testmoderno', destination: '/test-moderno', permanent: false },
      { source: '/testrasgado', destination: '/test-rasgado', permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
