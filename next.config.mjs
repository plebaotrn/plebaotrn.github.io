/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/rabbitchan",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/rabbitchan",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    loader: "custom",
    loaderFile: "./imageLoader.js",
  },
}

export default nextConfig
