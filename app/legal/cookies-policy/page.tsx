
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CookiesPolicy() {
  return (
    <>
      <header className="sticky top-0 z-50 h-[72px] bg-white shadow-soft">
        <div className="container mx-auto flex h-full max-w-[1200px] items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2Flogo%20ca%C3%B1a%20y%20rese%C3%B1a.png?alt=media&token=971d742e-2192-49f3-b863-9b1d1ee2bd05"
              alt="Logo Caña y Reseña"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-xl font-semibold text-foreground">Caña y Reseña</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <Link href="/#features" className="font-medium text-foreground transition-colors hover:text-primary">
              Funcionalidades
            </Link>
            <Link href="/#pricing" className="font-medium text-foreground transition-colors hover:text-primary">
              Precios
            </Link>
            <Link href="/#contact" className="font-medium text-foreground transition-colors hover:text-primary">
              Contacto
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground duration-200 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/register"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>
        <div className="prose lg:prose-xl">
          <p>En Caña y Reseña, utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Una cookie es un pequeño archivo de texto que un sitio web guarda en tu ordenador o dispositivo móvil cuando visitas el sitio.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">¿Cómo utilizamos las cookies?</h2>
          <p>Utilizamos cookies para:</p>
          <ul>
            <li>Recordar tus preferencias y configuraciones.</li>
            <li>Entender cómo utilizas nuestro sitio para poder mejorarlo.</li>
            <li>Ofrecerte contenido y publicidad relevante.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Tipos de Cookies que Utilizamos</h2>
          <p><strong>Cookies Esenciales:</strong> Estas son necesarias para que el sitio web funcione y no se pueden desactivar en nuestros sistemas. Normalmente solo se configuran en respuesta a acciones realizadas por ti que equivalen a una solicitud de servicios, como establecer tus preferencias de privacidad, iniciar sesión o rellenar formularios.</p>
          <p><strong>Cookies de Rendimiento y Analíticas:</strong> Nos permiten contar las visitas y fuentes de tráfico para poder medir y mejorar el rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más o menos populares, y ver cuántas personas visitan el sitio.</p>
          <p><strong>Cookies de Funcionalidad:</strong> Permiten que el sitio web ofrezca una mejor funcionalidad y personalización. Pueden ser establecidas por nosotros o por proveedores externos cuyos servicios hemos agregado a nuestras páginas.</p>
          <p><strong>Cookies de Publicidad:</strong> Pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios. Pueden ser utilizadas por esas empresas para construir un perfil de tus intereses y mostrarte anuncios relevantes en otros sitios.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Cómo controlar las cookies</h2>
          <p>Puedes controlar y/o eliminar las cookies como desees. Para más información, visita aboutcookies.org. Puedes eliminar todas las cookies que ya están en tu ordenador y puedes configurar la mayoría de los navegadores para que no se instalen. Sin embargo, si lo haces, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites un sitio y que algunos servicios y funcionalidades no funcionen.</p>
        </div>
      </div>
    </>
  );
}
