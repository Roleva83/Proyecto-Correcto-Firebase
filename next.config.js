/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed `output: 'export'` because app routes (API) are not compatible
  // with static export. Keeping default server-enabled output so API routes
  // like /api/genkit/[...flow] can be built.
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig