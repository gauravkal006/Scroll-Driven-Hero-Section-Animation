/** @type {import('next').NextConfig} */

// github pages serves the site from /repo-name/
const basePath =
  process.env.NODE_ENV === "production" ? "/Scroll-Driven-Hero-Section-Animation" : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
