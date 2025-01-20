import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: { mdxRs: true },
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**",
      },
    ],
  },
};

export default nextConfig;
