
'use client';
import React from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { User, Mail, Phone, Building, Search, Star, TrendingUp, Clock, Check, Sparkles, Instagram, Facebook, Linkedin } from 'lucide-react';
import ScrollToTopButton from './components/ui/ScrollToTopButton';

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
            <a href="/" className="font-medium text-foreground transition-colors hover:text-primary">
              Inicio
            </a>
            <a href="#features" className="font-medium text-foreground transition-colors hover:text-primary">
              Funcionalidades
            </a>
            <a href="#pricing" className="font-medium text-foreground transition-colors hover:text-primary">
              Precios
            </a>
             <a href="/sobre-mi" className="font-medium text-foreground transition-colors hover:text-primary">
              Sobre mí
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
            <p className="mx-auto max-w-3xl text-lg text-secondary" style={{color: '#6B7280', fontFamily: 'Inter', fontWeight: 500, marginBottom: '40px'}}>
              Desde la conexión inicial hasta la acción automatizada, Lola transforma tus datos en crecimiento.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-8 lg:col-span-3">
              {/* Card 1 */}
              <div className="flex flex-col rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                <h3 className="mb-2 text-xl font-semibold">1. Conecta tus herramientas</h3>
                <p className="mb-6 text-muted-foreground">Integra en minutos tus perfiles de reseñas, sistema de reservas y TPV.</p>
                <div className="mx-auto mt-auto flex h-[200px] w-[200px] items-center justify-center">
                    <div
                        className="relative flex h-40 w-40 items-center justify-center rounded-full"
                        style={{ background: 'conic-gradient(#fecaca 48%, #fde68a 0)'}}
                    >
                        <div className="absolute flex h-[130px] w-[130px] items-center justify-center rounded-full bg-card">
                            <span className="text-3xl font-bold">48%</span>
                        </div>
                    </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                <h3 className="mb-2 text-xl font-semibold">2. Lola analiza en tiempo real</h3>
                <p className="mb-6 text-muted-foreground">Nuestra IA procesa cada dato: ventas, opiniones, reservas y menciones.</p>
                <div className="mt-auto flex h-[200px] w-full items-end justify-around px-4">
                    <div className="flex flex-col items-center">
                        <div className="w-10 rounded-t-lg bg-pink-400" style={{height: '93px'}}></div>
                        <span className="mt-2 text-sm">Serv.</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 rounded-t-lg bg-purple-400" style={{height: '152px'}}></div>
                        <span className="mt-2 text-sm">Comida</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 rounded-t-lg bg-green-400" style={{height: '118px'}}></div>
                        <span className="mt-2 text-sm">Amb.</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 rounded-t-lg bg-yellow-400" style={{height: '36px'}}></div>
                        <span className="mt-2 text-sm">Precio</span>
                    </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
              <h3 className="mb-1 text-center text-xl font-semibold">3. Recibe acciones, no solo datos</h3>
              <p className="mb-4 text-center text-muted-foreground">Recibe recomendaciones automáticas basadas en IA, respuestas optimizadas y acciones concretas para mejorar tus resultados.</p>
              
              <div className="my-4">
                <p className="text-center text-sm font-semibold text-muted-foreground">ÚLTIMO TRIMESTRE</p>
                <div className="flex items-center justify-center gap-6 p-4">
                    <div
                        className="relative flex h-32 w-32 items-center justify-center rounded-full"
                        style={{ background: 'conic-gradient(hsl(var(--primary)) 65%, #9ca3af 0 90%, #4b5563 0)' }}
                    >
                        <div className="absolute flex h-[100px] w-[100px] items-center justify-center rounded-full bg-card">
                            <span className="text-2xl font-bold">65%</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-primary"></span><span>Positivo</span><span className="ml-auto font-semibold">65%</span></div>
                        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-gray-400"></span><span>Neutral</span><span className="ml-auto font-semibold">25%</span></div>
                        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-gray-700"></span><span>Negativo</span><span className="ml-auto font-semibold">10%</span></div>
                    </div>
                </div>
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

      {/* New AI Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-foreground">
              Diseñado para la hostelería, impulsado por IA
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Columna Izquierda: Features */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Feature 1 */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="mb-2 text-lg font-semibold">Gestión de Reseñas Inteligente</h3>
                <p className="text-sm text-muted-foreground">Centraliza y responde a todas tus reseñas (Google, TripAdvisor, TheFork) con respuestas generadas por IA que mantienen tu tono de voz.</p>
              </div>
              {/* Feature 2 */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="mb-2 text-lg font-semibold">Análisis de Sentimiento y Datos</h3>
                <p className="text-sm text-muted-foreground">Lola lee cada reseña, la clasifica y extrae insights clave sobre tus platos, servicio, ambiente y precios.</p>
              </div>
              {/* Feature 3 */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="mb-2 text-lg font-semibold">Automatización de Marketing</h3>
                <p className="text-sm text-muted-foreground">Crea campañas de email y SMS, fideliza a tus clientes y recupera a los que no han vuelto, todo de forma automática.</p>
              </div>
              {/* Feature 4 */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="mb-2 text-lg font-semibold">Informes y Alertas Proactivas</h3>
                <p className="text-sm text-muted-foreground">Recibe informes semanales con tu progreso y alertas en tiempo real sobre reseñas negativas o tendencias importantes.</p>
              </div>
              {/* Feature 5 */}
              <div className="col-span-1 rounded-2xl border border-border bg-card p-6 shadow-soft sm:col-span-2">
                <h3 className="mb-2 text-lg font-semibold">Optimización de Menú y Precios</h3>
                <p className="text-sm text-muted-foreground">Descubre qué platos son más rentables y cuáles necesitan mejorar basándose en datos reales de ventas y opiniones de tus clientes.</p>
              </div>
            </div>
            {/* Columna Derecha: Imagen */}
            <div className="flex items-center justify-center">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2FLola%20IA.png?alt=media&token=5057c323-0d30-43b8-82b4-e1111b1475bc"
                alt="Lola IA Assistant"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">Resultados que marcan la diferencia</h2>
            <p className="mx-auto max-w-3xl text-lg text-secondary">Nuestros clientes ven mejoras tangibles en menos de 3 meses.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Metric 1 */}
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
              <Star className="mx-auto mb-4 h-10 w-10 text-primary" />
              <p className="mb-2 text-5xl font-bold text-primary">+65%</p>
              <p className="text-lg text-muted-foreground">más reseñas positivas</p>
            </div>
            {/* Metric 2 */}
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
              <TrendingUp className="mx-auto mb-4 h-10 w-10 text-primary" />
              <p className="mb-2 text-5xl font-bold text-primary">+0.5</p>
              <p className="text-lg text-muted-foreground">puntos en valoración media</p>
            </div>
            {/* Metric 3 */}
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
              <Clock className="mx-auto mb-4 h-10 w-10 text-primary" />
              <p className="mb-2 text-5xl font-bold text-primary">10h</p>
              <p className="text-lg text-muted-foreground">ahorradas por semana</p>
            </div>
          </div>
          <div className="mt-16">
            <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 shadow-soft">
              <Image src="https://picsum.photos/seed/testimonial1/80/80" alt="Avatar Cliente" width={80} height={80} className="mx-auto -mt-16 rounded-full border-4 border-white" />
              <p className="mt-6 text-center text-xl italic text-foreground">
                "Desde que usamos Caña y Reseña, hemos ahorrado horas en la gestión de reseñas y nuestra puntuación en Google ha subido 0.7 puntos."
              </p>
              <p className="mt-6 text-right font-semibold text-primary">— Carlos R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* All in one place Section */}
      <section className="bg-accent py-20">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-foreground">
              Todo lo que necesitas, en un solo lugar
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex items-center justify-center">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2FLola%20Asesora.png?alt=media&token=c1e28067-4758-4e74-9f6c-36c5388af73a"
                alt="Lola IA con portátil"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="mb-2 text-lg font-semibold">Gestión de Reputación Online con IA</h3>
                <p className="text-sm text-muted-foreground">Centraliza, analiza y responde a todas tus reseñas con la ayuda de la IA.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="mb-2 text-lg font-semibold">Marketing y Fidelización Automática</h3>
                <p className="text-sm text-muted-foreground">Crea campañas, recupera clientes y premia la lealtad sin mover un dedo.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="mb-2 text-lg font-semibold">Gestión de Horarios Inteligente</h3>
                <p className="text-sm text-muted-foreground">Optimiza turnos y personal según la demanda prevista por la IA.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="mb-2 text-lg font-semibold">Reservas y TPV Conectados</h3>
                <p className="text-sm text-muted-foreground">Unifica tus canales de venta y gestión de mesas en una sola plataforma.</p>
              </div>
              <div className="col-span-1 sm:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="mb-2 text-lg font-semibold">Análisis Inteligente con Lola IA</h3>
                <p className="text-sm text-muted-foreground">Recibe informes proactivos y alertas sobre lo que de verdad importa en tu negocio.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-background py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-foreground">Planes para cada tipo de negocio</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Básico */}
            <div className="flex flex-col rounded-lg border bg-card p-8 shadow-soft">
              <h3 className="mb-2 text-2xl font-semibold">Básico</h3>
              <p className="mb-6 text-muted-foreground">Ideal para negocios que empiezan a digitalizar su reputación.</p>
              <p className="mb-6 text-4xl font-bold">XX€<span className="text-lg font-normal text-muted-foreground">/mes</span></p>
              <ul className="mb-8 space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Gestión de Reseñas (1 Perfil)</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Respuestas con IA (10/mes)</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Análisis Básico</span></li>
              </ul>
              <a href="#" className="mt-auto block w-full rounded-lg border border-primary py-3 text-center font-semibold text-primary transition-colors hover:bg-primary/10">
                Elegir Plan
              </a>
            </div>

            {/* Profesional */}
            <div className="relative flex flex-col rounded-lg border-2 border-primary bg-card p-8 shadow-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                Recomendado
              </div>
              <h3 className="mb-2 text-2xl font-semibold">Profesional</h3>
              <p className="mb-6 text-muted-foreground">La solución completa para optimizar y crecer.</p>
              <p className="mb-6 text-4xl font-bold">XX€<span className="text-lg font-normal text-muted-foreground">/mes</span></p>
              <ul className="mb-8 space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Todo lo del plan Básico</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Conexión TPV y Reservas</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Marketing y Fidelización</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Análisis Avanzado con Lola IA</span></li>
              </ul>
              <a href="#" className="mt-auto block w-full rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground transition-colors hover:bg-amber-600">
                Elegir Plan
              </a>
            </div>

            {/* Empresa */}
            <div className="flex flex-col rounded-lg border bg-card p-8 shadow-soft">
              <h3 className="mb-2 text-2xl font-semibold">Empresa</h3>
              <p className="mb-6 text-muted-foreground">Soluciones a medida para cadenas y grandes operaciones.</p>
              <p className="mb-6 text-4xl font-bold">Consultar</p>
              <ul className="mb-8 space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Soporte dedicado</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Integraciones personalizadas</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Funciones multi-local</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Formación a medida</span></li>
              </ul>
              <a href="#" className="mt-auto block w-full rounded-lg border border-primary py-3 text-center font-semibold text-primary transition-colors hover:bg-primary/10">
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-accent py-20">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-foreground">
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="flex flex-col items-center rounded-lg border bg-card p-8 text-center shadow-md">
              <Image src="https://picsum.photos/seed/client1/80/80" alt="Avatar Ana S." width={80} height={80} className="mb-6 rounded-full" />
              <p className="mb-6 flex-grow italic text-foreground">"La automatización de respuestas a reseñas nos ha ahorrado horas y ha mejorado nuestra puntuación media increíblemente rápido."</p>
              <p className="font-semibold text-foreground">– Ana S.</p>
            </div>
            {/* Testimonial 2 */}
            <div className="flex flex-col items-center rounded-lg border bg-card p-8 text-center shadow-md">
              <Image src="https://picsum.photos/seed/client2/80/80" alt="Avatar Carlos R." width={80} height={80} className="mb-6 rounded-full" />
              <p className="mb-6 flex-grow italic text-foreground">"Gestionar 5 locales era un caos. Ahora tengo una visión centralizada del rendimiento de cada uno. Imprescindible."</p>
              <p className="font-semibold text-foreground">– Carlos R.</p>
            </div>
            {/* Testimonial 3 */}
            <div className="flex flex-col items-center rounded-lg border bg-card p-8 text-center shadow-md">
              <Image src="https://picsum.photos/seed/client3/80/80" alt="Avatar Laura M." width={80} height={80} className="mb-6 rounded-full" />
              <p className="mb-6 flex-grow italic text-foreground">"Gracias a Lola IA, por fin entiendo qué platos son rentables y cuáles no. He ajustado el menú y los beneficios han subido un 15%."</p>
              <p className="font-semibold text-foreground">– Laura M.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-foreground">¿Listo para transformar tu negocio?</h2>
            <p className="mt-4 text-lg text-muted-foreground">Agenda una demo personalizada con Lola IA y descubre cómo optimizar tu restaurante.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <input type="text" placeholder="Nombre" className="h-12 w-full rounded-xl border border-border bg-background py-2 px-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" />
                <input type="email" placeholder="Email" className="h-12 w-full rounded-xl border border-border bg-background py-2 px-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <input type="text" placeholder="Nombre del negocio" className="h-12 w-full rounded-xl border border-border bg-background py-2 px-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <textarea placeholder="Cuéntanos tu caso" rows={5} className="w-full rounded-xl border border-border bg-background py-3 px-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring"></textarea>
              </div>
              <div>
                <button type="submit" className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-amber-500/20 duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-ring">
                  <Sparkles className="h-5 w-5" />
                  <span>Hablar con Lola</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-accent py-12 text-foreground">
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
              <p className="text-sm text-muted-foreground">
                La gestión inteligente que impulsa tu negocio de hostelería. Centraliza tu reputación, reservas, TPV, marketing y fidelización con ayuda de Lola IA.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold">Navegación</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="transition-colors hover:text-foreground">Funcionalidades</a></li>
                <li><a href="#pricing" className="transition-colors hover:text-foreground">Precios</a></li>
                 <li><a href="/sobre-mi" className="transition-colors hover:text-foreground">Sobre mí</a></li>
                <li><a href="#contact" className="transition-colors hover:text-foreground">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/legal/privacy-policy" className="transition-colors hover:text-foreground">Política de Privacidad</a></li>
                <li><a href="/legal/cookies-policy" className="transition-colors hover:text-foreground">Política de Cookies</a></li>
                <li><a href="/legal/legal-notice" className="transition-colors hover:text-foreground">Aviso Legal</a></li>
                <li><a href="/legal/terms-and-conditions" className="transition-colors hover:text-foreground">Términos y condiciones</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4 text-lg font-semibold">Social</h4>
              <div className="flex items-center space-x-4">
                <a href="#" className="transition-colors hover:text-foreground"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="transition-colors hover:text-foreground"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="transition-colors hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
              </div>
            </div>

          </div>

          <div className="mt-8 border-t border-border pt-8 flex items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2025 Caña y Reseña. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      <ScrollToTopButton />
    </div>
  );
}

    