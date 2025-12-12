/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wqsxtxaoogwgsvddefmb.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // experimental: {
  //   ppr: "incremental",
  // },
};

export default nextConfig;
