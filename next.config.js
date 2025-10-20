/** @type {import('next').NextConfig} */
const nextConfig = {
  // Para despliegue en Firebase
  output: 'export',
  images: {
    unoptimized: true
  },
  // Configuración estricta de React
  reactStrictMode: true,
  // Sin experimental para evitar warnings
}

module.exports = nextConfig