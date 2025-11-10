/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  experimental: {
    allowedDevOrigins: [
      "https://6000-firebase-studio-1751801531699.cluster-axf5tvtfjjfekvhwxwkkkzsk2y.cloudworkstations.dev",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      }
    ],
  },
  webpack: (config) => {
    config.externals.push({
        'sharp': 'commonjs sharp',
        'onnxruntime-node': 'commonjs onnxruntime-node',
    })
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './app'),
    }
    return config
  },
};

module.exports = nextConfig;
