/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/login",
      permanent: false,
    },
  ],
};

export default nextConfig;
