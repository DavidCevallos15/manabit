import type { NextConfig } from "next";

/** Export estático: se despliega igual en Vercel o Azure Static Web Apps. */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
