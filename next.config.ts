import type { NextConfig } from "next";

/**
 * Media hosts. Brand assets live in /public/brand (src/features/core/config/brandAssets.config.ts);
 * if product photos move to a free host (Cloudinary, ImgBB, …) add its hostname here.
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
      { source: '/reclamaciones', destination: '/libro-de-reclamaciones', permanent: true },
      { source: '/nosotros', destination: '/sobre-santanita', permanent: true },
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
