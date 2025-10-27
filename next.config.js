/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  experimental: {
    // This is to allow cross-origin requests from the Firebase Studio dev environment.
    allowedDevOrigins: [
      "https://6000-firebase-studio-1751801531699.cluster-axf5tvtfjjfekvhwxwkkkzsk2y.cloudworkstations.dev",
    ],
  },
}

module.exports = nextConfig
