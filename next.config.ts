import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true, // This allows SVG usage
    remotePatterns: [
      {
        protocol: "https", // Or 'http' if that's what your URLs use
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**", // Allows any path under this hostname
      },
      {
        protocol: "https", // Or 'http' if that's what your URLs use
        hostname: "utfs.io",
        port: "",
        pathname: "/a/uy24lm300a/**", // Allows any path under this hostname
      },
      {
        protocol: "https", // Or 'http' if that's what your URLs use
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**", // Allows any path under this hostname
      }
      // You can add other hostnames here if needed
      // Example:
      // {
      //   protocol: 'https',
      //   hostname: 'another-image-provider.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
};

export default nextConfig;