
'use client';
import React from 'react';
import Image from 'next/image';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white shadow-sm">
        <div className="container mx-auto px-4 h-full max-w-[1200px]">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-semibold text-[#0F0F10]">Caña y Reseña</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="font-medium text-[#0F0F10] hover:text-amber-600 transition-colors">
                Inicio
              </a>
              <a href="#features" className="font-medium text-[#0F0F10] hover:text-amber-600 transition-colors">
                Funcionalidades
              </a>
              <a href="#" className="font-medium text-[#0F0F10] hover:text-amber-600 transition-colors">
                Sobre mí
              </a>
              <a href="#pricing" className="font-medium text-[#0F0F10] hover:text-amber-600 transition-colors">
                Precios
              </a>
              <a href="#contact" className="font-medium text-[#0F0F10] hover:text-amber-600 transition-colors">
                Contacto
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <a href="/auth/login" className="px-5 py-2.5 text-sm font-semibold text-gray-800 bg-white border border-[#E5E7EB] rounded-xl hover:bg-gray-50 transition-colors">
                Iniciar Sesión
              </a>
              <a
                href="/auth/register"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#F59E0B] rounded-xl hover:bg-[#D97706] transition-colors"
              >
                Registrarse
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[72px]"></div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              La gestión inteligente que impulsa tu negocio de hostelería
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Centraliza tu reputación, reservas, TPV, marketing y fidelización con ayuda de Lola IA.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4">
                 <a
                    href="/auth/register"
                    className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Prueba 15 días gratis
                  </a>
                  <a
                    href="#video"
                    className="text-orange-600 font-semibold flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    <span>Ver vídeo</span>
                  </a>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100">
                <div className="flex border-b mb-4">
                    <button className="flex-1 py-2 text-center font-semibold text-orange-500 border-b-2 border-orange-500">Facturas</button>
                    <button className="flex-1 py-2 text-center font-semibold text-gray-500 hover:text-orange-500">Nóminas</button>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Sube aquí tu factura</label>
                        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-gray-600 justify-center">
                                    <p className="pl-1">o arrastra y suelta</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, PDF hasta 10MB</p>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">Empezar ahora</button>
                </form>
          </div>
        </div>
      </section>
      
      {/* How it works Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Así de fácil funciona Lola IA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Automatiza la gestión de tu restaurante y toma el control de tus finanzas y reputación.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Image data-ai-hint="waitress illustration" src="https://picsum.photos/seed/step1/400/300" alt="Paso 1" width={400} height={300} className="rounded-lg mx-auto mb-6 shadow-md" />
              <h3 className="text-xl font-semibold mb-2">1. Conecta tus datos</h3>
              <p className="text-gray-600">Integra tus plataformas de reseñas, sistema TPV y programa de reservas en un solo lugar.</p>
            </div>
            <div>
              <Image data-ai-hint="woman phone illustration" src="https://picsum.photos/seed/step2/400/300" alt="Paso 2" width={400} height={300} className="rounded-lg mx-auto mb-6 shadow-md" />
              <h3 className="text-xl font-semibold mb-2">2. Lola IA entra en acción</h3>
              <p className="text-gray-600">Nuestra IA analiza tus reseñas, ventas y reservas para darte una visión 360º de tu negocio.</p>
            </div>
            <div>
              <Image data-ai-hint="businesswoman illustration" src="https://picsum.photos/seed/step3/400/300" alt="Paso 3" width={400} height={300} className="rounded-lg mx-auto mb-6 shadow-md" />
              <h3 className="text-xl font-semibold mb-2">3. Recibe insights y actúa</h3>
              <p className="text-gray-600">Obtén recomendaciones claras, automatiza respuestas y optimiza tus operaciones diarias.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Resultados que marcan la diferencia</h2>
                <p className="text-xl opacity-90 max-w-3xl mx-auto">Nuestros clientes ven mejoras tangibles en menos de 3 meses.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                    <p className="text-6xl font-bold mb-2">+85%</p>
                    <p className="text-lg opacity-90">De respuestas a reseñas automatizadas con un 99% de acierto.</p>
                </div>
                <div>
                    <p className="text-6xl font-bold mb-2">+0.5</p>
                    <p className="text-lg opacity-90">Puntos de mejora en la valoración media de las principales plataformas.</p>
                </div>
                <div>
                    <p className="text-6xl font-bold mb-2">10h</p>
                    <p className="text-lg opacity-90">Ahorradas a la semana en tareas de gestión y administración.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="flex items-center mb-4">
                <Image src="https://picsum.photos/seed/avatar1/48/48" alt="Avatar" width={48} height={48} className="rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Carlos Pérez</p>
                  <p className="text-sm text-gray-600">Restaurante La Cuchara</p>
                </div>
              </div>
              <p className="text-gray-700">"Desde que usamos Caña y Reseña, hemos ahorrado horas en la gestión de reseñas y nuestra puntuación en Google ha subido 0.7 puntos."</p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="flex items-center mb-4">
                <Image src="https://picsum.photos/seed/avatar2/48/48" alt="Avatar" width={48} height={48} className="rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Ana García</p>
                  <p className="text-sm text-gray-600">Tapas y Vinos</p>
                </div>
              </div>
              <p className="text-gray-700">"Lola IA es increíble. Nos da insights que no habíamos visto y nos ayuda a responder a los clientes de forma casi instantánea. ¡Imprescindible!"</p>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="flex items-center mb-4">
                <Image src="https://picsum.photos/seed/avatar3/48/48" alt="Avatar" width={48} height={48} className="rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Javier Rodríguez</p>
                  <p className="text-sm text-gray-600">Asador El Fuego</p>
                </div>
              </div>
              <p className="text-gray-700">"La automatización de facturas y nóminas nos ha quitado un peso de encima. Ahora podemos centrarnos en lo que importa: nuestros clientes."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 relative">
                   <Image 
                    src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2Flogo%20ca%C3%B1a%20y%20rese%C3%B1a.png?alt=media&token=971d742e-2192-49f3-b863-9b1d1ee2bd05"
                    alt="Logo Caña y Reseña"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold">Caña y Reseña</span>
              </div>
              <p className="text-gray-300">
                Plataforma SaaS integral para la gestión de reputación y automatización de restaurantes y negocios gastronómicos.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#features" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="/auth/register" className="hover:text-white transition-colors">Registro</a></li>
                <li><a href="/auth/login" className="hover:text-white transition-colors">Login</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#contact" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Soporte</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Términos de Servicio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Caña y Reseña. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function Home() {
  return <Landing />;
}
