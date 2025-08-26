import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for better performance
  output: 'standalone',
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Disable ESLint during production builds
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
