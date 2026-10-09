/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // static HTML in /out — host on any server / Nginx / Vercel
  reactStrictMode: true,
  images: { unoptimized: true },
  compiler: { removeConsole: process.env.NODE_ENV === "production" },
};
export default nextConfig;
