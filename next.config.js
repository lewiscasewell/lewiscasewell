const withPWA = require("next-pwa");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true, 
})(nextConfig);
