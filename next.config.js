/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    allowedDevOrigins: [
      '9082-firebase-studio-1751801531699.cluster-axf5tvtfjjfekvhwxwkkkzsk2y.cloudworkstations.dev'
    ]
  }
}

module.exports = nextConfig
