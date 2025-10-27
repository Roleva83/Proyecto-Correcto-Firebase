
'use client';
import React from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { User, Mail, Phone, Building } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export default function Landing() {
  return (
    <div className={`bg-background text-foreground ${inter.className}`}>
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 h-[72px] bg-white shadow-soft">
        <div className="container mx-auto flex h-full max-w-[1200px] items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <Image 
                src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2Flogo%20ca%C3%B1a%20y%20rese%C3%B1a.png?alt=media&token=971d742e-2192-49f3-b863-9b1d1ee2bd05"
                alt="Logo Caña y Reseña"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-foreground">Caña y Reseña</span>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <a href="#" className="font-medium text-foreground transition-colors hover:text-primary">
              Inicio
            </a>
            <a href="#features" className="font-medium text-foreground transition-colors hover:text-primary">
              Funcionalidades
            </a>
            <a href="#" className="font-medium text-foreground transition-colors hover:text-primary">
              Sobre mí
            </a>
            <a href="#pricing" className="font-medium text-foreground transition-colors hover:text-primary">
              Precios
            </a>
            <a href="#contact" className="font-medium text-foreground transition-colors hover:text-primary">
              Contacto
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <a href="/auth/login" className="rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground duration-200 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
              Iniciar Sesión
            </a>
            <a
              href="/auth/register"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Registrarse
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pb-[88px] pt-[72px] radial-gradient-hero">
        <div className="container relative z-10 mx-auto max-w-[1200px] px-4">
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-black text-foreground md:text-[52px]" style={{ lineHeight: 1.1 }}>
              La gestión inteligente que impulsa tu negocio de hostelería
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-secondary">
              Centraliza tu reputación, reservas, TPV, marketing y fidelización con ayuda de Lola IA.
            </p>
          </div>
          
          <div className="flex flex-wrap items-stretch justify-center gap-12">
            {/* Columna Izquierda: Formulario */}
            <div className="w-full max-w-md shrink-0 lg:w-auto">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-xl" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                  <h2 className="mb-6 text-center text-xl font-semibold">Pide tu demo</h2>
                  <form className="space-y-3">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Nombre" className="h-12 w-full rounded-xl border border-border py-2 pl-10 pr-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Apellidos" className="h-12 w-full rounded-xl border border-border py-2 pl-10 pr-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input type="email" placeholder="Email" className="h-12 w-full rounded-xl border border-border py-2 pl-10 pr-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input type="tel" placeholder="Teléfono" className="h-12 w-full rounded-xl border border-border py-2 pl-10 pr-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Nombre del negocio" className="h-12 w-full rounded-xl border border-border py-2 pl-10 pr-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                    </div>
                    <button type="submit" className="h-[50px] w-full rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-amber-500/20 duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-ring">
                      Empezar ahora
                    </button>
                  </form>
                  <p className="mt-auto pt-4 text-center text-sm text-secondary">Confiado por más de 100 negocios hosteleros</p>
              </div>
            </div>

            {/* Columna Derecha: Imagen */}
            <div className="hidden w-[330px] shrink-0 lg:block">
              <div className="relative h-full w-full">
                <Image 
                  src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2FLola%20Camarera%20Cerveza.png?alt=media&token=dc55f0d4-8160-4683-b923-67da50885e92" 
                  alt="Asistente virtual Lola" 
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How it works Section */}
      <section id="features" className="bg-card py-20">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground">
              Así de fácil funciona Lola IA
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              Automatiza la gestión de tu restaurante y toma el control de tus finanzas y reputación.
            </p>
          </div>
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <Image data-ai-hint="waitress illustration" src="https://picsum.photos/seed/step1/400/300" alt="Paso 1" width={400} height={300} className="mx-auto mb-6 rounded-lg shadow-md" />
              <h3 className="mb-2 text-xl font-semibold">1. Conecta tus datos</h3>
              <p className="text-muted-foreground">Integra tus plataformas de reseñas, sistema TPV y programa de reservas en un solo lugar.</p>
            </div>
            <div>
              <Image data-ai-hint="woman phone illustration" src="https://picsum.photos/seed/step2/400/300" alt="Paso 2" width={400} height={300} className="mx-auto mb-6 rounded-lg shadow-md" />
              <h3 className="mb-2 text-xl font-semibold">2. Lola IA entra en acción</h3>
              <p className="text-muted-foreground">Nuestra IA analiza tus reseñas, ventas y reservas para darte una visión 360º de tu negocio.</p>
            </div>
            <div>
              <Image data-ai-hint="businesswoman illustration" src="https://picsum.photos/seed/step3/400/300" alt="Paso 3" width={400} height={300} className="mx-auto mb-6 rounded-lg shadow-md" />
              <h3 className="mb-2 text-xl font-semibold">3. Recibe insights y actúa</h3>
              <p className="text-muted-foreground">Obtén recomendaciones claras, automatiza respuestas y optimiza tus operaciones diarias.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto max-w-[1200px] px-4">
            <div className="mb-12 text-center">
                <h2 className="mb-4 text-4xl font-bold">Resultados que marcan la diferencia</h2>
                <p className="mx-auto max-w-3xl text-xl opacity-90">Nuestros clientes ven mejoras tangibles en menos de 3 meses.</p>
            </div>
            <div className="grid gap-8 text-center md:grid-cols-3">
                <div>
                    <p className="mb-2 text-6xl font-bold">+85%</p>
                    <p className="text-lg opacity-90">De respuestas a reseñas automatizadas con un 99% de acierto.</p>
                </div>
                <div>
                    <p className="mb-2 text-6xl font-bold">+0.5</p>
                    <p className="text-lg opacity-90">Puntos de mejora en la valoración media de las principales plataformas.</p>
                </div>
                <div>
                    <p className="mb-2 text-6xl font-bold">10h</p>
                    <p className="text-lg opacity-90">Ahorradas a la semana en tareas de gestión y administración.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-foreground">
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="rounded-lg border bg-card p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <Image src="https://picsum.photos/seed/avatar1/48/48" alt="Avatar" width={48} height={48} className="mr-4 rounded-full" />
                <div>
                  <p className="font-semibold">Carlos Pérez</p>
                  <p className="text-sm text-muted-foreground">Restaurante La Cuchara</p>
                </div>
              </div>
              <p className="text-foreground">"Desde que usamos Caña y Reseña, hemos ahorrado horas en la gestión de reseñas y nuestra puntuación en Google ha subido 0.7 puntos."</p>
            </div>
            {/* Testimonial 2 */}
            <div className="rounded-lg border bg-card p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <Image src="https://picsum.photos/seed/avatar2/48/48" alt="Avatar" width={48} height={48} className="mr-4 rounded-full" />
                <div>
                  <p className="font-semibold">Ana García</p>
                  <p className="text-sm text-muted-foreground">Tapas y Vinos</p>
                </div>
              </div>
              <p className="text-foreground">"Lola IA es increíble. Nos da insights que no habíamos visto y nos ayuda a responder a los clientes de forma casi instantánea. ¡Imprescindible!"</p>
            </div>
            {/* Testimonial 3 */}
            <div className="rounded-lg border bg-card p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <Image src="https://picsum.photos/seed/avatar3/48/48" alt="Avatar" width={48} height={48} className="mr-4 rounded-full" />
                <div>
                  <p className="font-semibold">Javier Rodríguez</p>
                  <p className="text-sm text-muted-foreground">Asador El Fuego</p>
                </div>
              </div>
              <p className="text-foreground">"La automatización de facturas y nóminas nos ha quitado un peso de encima. Ahora podemos centrarnos en lo que importa: nuestros clientes."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-foreground py-12 text-background">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="relative h-8 w-8">
                   <Image 
                    src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2Flogo%20ca%C3%B1a%20y%20rese%C3%B1a.png?alt=media&token=971d742e-2192-49f3-b863-9b1d1ee2bd05"
                    alt="Logo Caña y Reseña"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold">Caña y Reseña</span>
              </div>
              <p className="text-muted-foreground">
                Plataforma SaaS integral para la gestión de reputación y automatización de restaurantes y negocios gastronómicos.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold">Producto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="transition-colors hover:text-background">Funcionalidades</a></li>
                <li><a href="#pricing" className="transition-colors hover:text-background">Precios</a></li>
                <li><a href="/auth/register" className="transition-colors hover:text-background">Registro</a></li>
                <li><a href="/auth/login" className="transition-colors hover:text-background">Login</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold">Soporte</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#contact" className="transition-colors hover:text-background">Contacto</a></li>
                <li><a href="#" className="transition-colors hover:text-background">Documentación</a></li>
                <li><a href="#" className="transition-colors hover:text-background">FAQ</a></li>
                <li><a href="#" className="transition-colors hover:text-background">Soporte</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-background">Términos de Servicio</a></li>
                <li><a href="#" className="transition-colors hover:text-background">Política de Privacidad</a></li>
                <li><a href="#" className="transition-colors hover:text-background">Cookies</a></li>
                <li><a href="#" className="transition-colors hover:text-background">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-muted pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Caña y Reseña. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
