/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "discord.com",
      "xizrnnflqgzdyahkwtrr.supabase.co",
      "xizrnnflqgzdyahkwtrr.supabase.co/storage/",
    ],
  },
};

module.exports = nextConfig;
