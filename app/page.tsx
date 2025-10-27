
'use client';
import React from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { User, Mail, Phone, Building, Search, Star } from 'lucide-react';
import DonutChart from './components/charts/DonutChart';
import BarChartComponent from './components/charts/BarChart';
import SentimentChart from './components/charts/SentimentChart';

const inter = Inter({ subsets: ['latin'] });

export default function Landing() {
  return (
    <div className={`bg-background text-foreground ${inter.className}`}>
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 h-[72px] bg-white shadow-soft">
        <div className="container mx-auto flex h-full max-w-[1200px] items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative h-10 w-10">
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
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-5xl font-black text-foreground md:text-[52px]" style={{ lineHeight: 1.1 }}>
              La gestión inteligente que impulsa tu negocio de hostelería
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-secondary">
              Centraliza tu reputación, reservas, TPV, marketing y fidelización con ayuda de Lola IA.
            </p>
          </div>
          
          <div className="flex flex-wrap items-stretch justify-center gap-8">
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
            <div className="relative hidden w-[330px] shrink-0 lg:block">
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

      {/* New Free Analysis Section */}
      <section className="bg-accent py-20">
        <div className="container mx-auto max-w-[1200px] px-4 text-center">
          <h2 className="mb-4 text-4xl font-black text-foreground">
            Descubre tu Potencial, Gratis.
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-secondary">
            Analiza tu reputación online en segundos. Simplemente pega la URL de tu perfil de Google My Business y deja que Lola IA te muestre cómo puedes mejorar.
          </p>

          <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-center space-x-4">
              <div className="relative w-[70%]">
                <input
                  type="text"
                  placeholder="Pega aquí la URL de tu perfil de Google My Business"
                  className="h-12 w-full rounded-xl border border-border bg-background py-2 pl-4 pr-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-ring">
                <Search className="h-5 w-5" />
                <span>Analizar reputación</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <a href="#" className="rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-amber-500/20 duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-ring">
              Solicitar demo gratuita
            </a>
            <a href="#" className="rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground duration-200 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
              Ver cómo funciona
            </a>
          </div>
        </div>
      </section>
      
      {/* How it works Section */}
      <section id="features" className="bg-accent py-20">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground">
              Así de fácil funciona Lola IA
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-secondary">
              Desde la conexión inicial hasta la acción automatizada, Lola transforma tus datos en crecimiento.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-8 lg:col-span-2">
              {/* Card 1 */}
              <div className="flex flex-col rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                <h3 className="mb-2 text-xl font-semibold">1. Conecta tus herramientas</h3>
                <p className="mb-6 text-muted-foreground">Integra en minutos tus perfiles de reseñas, sistema de reservas y TPV.</p>
                <div className="mt-auto flex h-[200px] w-full items-center justify-center">
                  <DonutChart />
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                <h3 className="mb-2 text-xl font-semibold">2. Lola analiza en tiempo real</h3>
                <p className="mb-6 text-muted-foreground">Nuestra IA procesa cada dato: ventas, opiniones, reservas y menciones.</p>
                <div className="mt-auto flex h-[200px] w-full items-center justify-center">
                  <BarChartComponent />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-3">
              <h3 className="mb-1 text-center text-xl font-semibold">3. Recibe acciones, no solo datos</h3>
              <p className="mb-4 text-center text-muted-foreground">Recibe recomendaciones automáticas, respuestas optimizadas y acciones concretas para mejorar.</p>
              
              <div className="my-4">
                <p className="text-center text-sm font-semibold text-muted-foreground">ÚLTIMO TRIMESTRE</p>
                <SentimentChart />
              </div>

              <div className="mt-4 space-y-4">
                <p className="font-semibold text-foreground">Reseñas clasificadas</p>
                {/* Review 1 */}
                <div className="flex items-start space-x-4">
                  <Image src="https://picsum.photos/seed/avatar1/40/40" alt="Avatar" width={40} height={40} className="rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Carlos Pérez</p>
                      <p className="text-xs text-muted-foreground">Google</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-muted text-muted" />
                    </div>
                    <p className="text-sm text-muted-foreground">"El servicio fue un poco lento, pero la comida excelente."</p>
                  </div>
                </div>
                {/* Review 2 */}
                <div className="flex items-start space-x-4">
                  <Image src="https://picsum.photos/seed/avatar2/40/40" alt="Avatar" width={40} height={40} className="rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Ana García</p>
                      <p className="text-xs text-muted-foreground">TripAdvisor</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">"¡Una experiencia increíble! Volveremos seguro."</p>
                  </div>
                </div>
              </div>
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
                <div className="relative h-10 w-10">
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

    