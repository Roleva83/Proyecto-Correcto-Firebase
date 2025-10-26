export const metadata = {
  title: 'Lola AI',
  description: 'Caña y Reseña',
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
