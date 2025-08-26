import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for better performance
  output: 'standalone',
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
