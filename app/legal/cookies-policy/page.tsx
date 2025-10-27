
import React from 'react';

export default function CookiesPolicy() {
  return (
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
  );
}
