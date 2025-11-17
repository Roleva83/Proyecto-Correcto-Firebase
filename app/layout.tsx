
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
    // Es una solución robusta para forzar al navegador a obtener la versión más reciente.
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations()
        .then((registrations) => {
          if (registrations.length > 0) {
            console.log('Service Workers encontrados. Eliminando...');
            const unregisterPromises = registrations.map(registration => registration.unregister());
            
            Promise.all(unregisterPromises).then(unregistered => {
              if (unregistered.some(Boolean)) {
                console.log('Todos los Service Workers han sido eliminados. Recargando la página...');
                window.location.reload(true); // Forzar recarga desde el servidor
              } else {
                 console.log('No se pudo eliminar ningún Service Worker.');
              }
            }).catch(err => console.error("Error al eliminar los Service Workers:", err));
          }
        })
        .catch(error => {
          console.error('Error al obtener los registros de Service Worker:', error);
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
