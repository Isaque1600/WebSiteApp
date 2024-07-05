/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/loader/imageLoader.ts",
  },
};

export default nextConfig;
