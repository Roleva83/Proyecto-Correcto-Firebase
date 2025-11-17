
'use client';
import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/ThemeProvider'
import { useEffect } from 'react';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  useEffect(() => {
    // Este script busca y elimina Service Workers "zombis" que puedan causar problemas de caché.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        if (registrations.length > 0) {
          console.log('Service Workers encontrados. Intentando eliminar...');
          let unregistered = false;
          registrations.forEach(registration => {
            registration.unregister();
            unregistered = true;
          });
          if (unregistered) {
            console.log('Service Workers eliminados. Recargando la página para aplicar cambios.');
            window.location.reload();
          }
        }
      });
    }
  }, []);

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>Caña y Reseña - Lola AI</title>
        <meta name="description" content="Gestión inteligente de reseñas con IA" />
      </head>
      <body className={`${inter.variable} ${poppins.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
