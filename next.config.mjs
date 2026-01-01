/** @type {import('next').NextConfig} */
const nextConfig = {
 reactCompiler: true,
 images: {
  remotePatterns: [
   {
    protocol: 'https',
    hostname: 'res.cloudinary.com',
   },
  ],
 },
 serverExternalPackages: ['iyzipay'],
};

export default nextConfig;
