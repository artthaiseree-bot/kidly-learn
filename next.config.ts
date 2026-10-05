import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // สั่งให้ข้ามการตรวจจับ Error ของ TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // สั่งให้ข้ามการตรวจจับ Error ของ ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;