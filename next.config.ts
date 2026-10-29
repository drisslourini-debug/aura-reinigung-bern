import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/dienstleistungen/spezialreinigung-baureinigung",
        destination: "/dienstleistungen/baureinigung",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
