import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Caña y Reseña - Lola AI',
  description: 'Gestión inteligente de reseñas con IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
