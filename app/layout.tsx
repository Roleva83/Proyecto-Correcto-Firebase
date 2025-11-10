import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import ClientAuthProvider from './contexts/ClientAuthProvider'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/ThemeProvider'


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
})

export const metadata = {
  title: 'Caña y Reseña - Lola AI',
  description: 'Gestión inteligente de reseñas con IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientAuthProvider>
            {children}
          </ClientAuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
