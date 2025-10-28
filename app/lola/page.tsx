
'use client';
import React from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { User, Mail, Phone, Building, Search, Star, TrendingUp, Clock, Check, Sparkles, Instagram, Facebook, Linkedin } from 'lucide-react';
import ScrollToTopButton from '@/app/components/ui/ScrollToTopButton';

const inter = Inter({ subsets: ['latin'] });

export default function Landing() {
  return (
    <div className={`bg-background text-foreground ${inter.className}`}>
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 h-[72px] bg-white shadow-soft">
        <div className="container mx-auto flex h-full max-w-[1200px] items-center justify-between px-4">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            
            <span className="text-xl font-semibold text-foreground">Caña y Reseña</span>
          </a>

          {/* Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <a href="/" className="font-medium text-foreground transition-colors hover:text-primary">
              Inicio
            </a>
            <a href="#features" className="font-medium text-foreground transition-colors hover:text-primary">
              Funcionalidades
            </a>
            <a href="/sobre-mi" className="font-medium text-foreground transition-colors hover:text-primary">
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

            {/* Columna Derecha: Imagen - CORREGIDO CON STYLE INLINE */}
            <div className="hidden w-[330px] shrink-0 lg:block" style={{ position: 'relative', height: '500px' }}>
              <Image 
                src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2FLola%20Camarera%20Cerveza.png?alt=media&token=dc55f0d4-8160-4683-b923-67da50885e92" 
                alt="Asistente virtual Lola" 
                fill
                className="object-contain object-bottom"
                priority
                sizes="330px"
              />
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
            Analiza tu reputación online en segundos. Simplemente pega la URL de tu perfil de Google My Business y deja que Lola IA te revele tus puntos fuertes y áreas de mejora.
          </p>
          <div className="mx-auto flex max-w-2xl items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                placeholder="Pega aquí tu URL (ej: https://g.page/...)"
                className="h-14 w-full rounded-xl border border-border bg-background py-2 pl-12 pr-4 placeholder-gray-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              className="flex h-14 items-center gap-2 rounded-xl bg-primary px-8 font-semibold text-primary-foreground shadow-lg shadow-amber-500/20 duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <Sparkles className="h-5 w-5" />
              <span>Analizar reputación</span>
            </button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            <button className="underline hover:text-foreground">Ver cómo funciona</button> | <button className="underline hover:text-foreground">Solicitar demo gratuita</button>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-foreground">
              Funcionalidades que marcan la diferencia
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Todo lo que necesitas en un solo lugar
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-start rounded-lg border border-border bg-card p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Gestión de Reseñas IA</h3>
              <p className="text-muted-foreground">
                Responde automáticamente a todas tus reseñas de Google, TripAdvisor y más con IA. Mantén tu reputación impecable sin esfuerzo.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start rounded-lg border border-border bg-card p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Análisis de Rentabilidad</h3>
              <p className="text-muted-foreground">
                Descubre qué platos son más rentables, optimiza tu carta y toma decisiones basadas en datos reales de tu negocio.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start rounded-lg border border-border bg-card p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Sistema de Reservas</h3>
              <p className="text-muted-foreground">
                Gestiona todas tus reservas desde un solo panel. Integración con tu TPV y notificaciones automáticas a clientes.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-start rounded-lg border border-border bg-card p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Marketing Automatizado</h3>
              <p className="text-muted-foreground">
                Campañas personalizadas por email y SMS. Recupera clientes inactivos y fideliza a los habituales con ofertas inteligentes.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col items-start rounded-lg border border-border bg-card p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Programa de Fidelización</h3>
              <p className="text-muted-foreground">
                Recompensa a tus clientes habituales con puntos, descuentos exclusivos y promociones. Incrementa la repetición de visita.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="flex flex-col items-start rounded-lg border border-border bg-card p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Informes y Métricas</h3>
              <p className="text-muted-foreground">
                Accede a informes detallados de ventas, satisfacción del cliente, rotación de mesas y mucho más en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-accent py-20">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-foreground">Planes adaptados a tu negocio</h2>
            <p className="mt-4 text-lg text-muted-foreground">Elige el plan que mejor se ajuste a tus necesidades</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Plan Básico */}
            <div className="flex flex-col rounded-lg border border-border bg-card p-8 shadow-md">
              <h3 className="mb-2 text-2xl font-bold text-foreground">Básico</h3>
              <p className="mb-6 text-sm text-muted-foreground">Ideal para empezar</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-foreground">€49</span>
                <span className="text-muted-foreground">/mes</span>
              </div>
              <ul className="mb-8 space-y-3 text-sm">
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Gestión de reseñas (1 local)</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Respuestas automáticas con IA</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Análisis básico de rentabilidad</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Soporte por email</span></li>
              </ul>
              <a href="#" className="mt-auto block w-full rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground transition-colors hover:bg-amber-600">
                Empezar ahora
              </a>
            </div>

            {/* Plan Pro */}
            <div className="relative flex flex-col rounded-lg border-2 border-primary bg-card p-8 shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                Más popular
              </div>
              <h3 className="mb-2 text-2xl font-bold text-foreground">Pro</h3>
              <p className="mb-6 text-sm text-muted-foreground">Para negocios en crecimiento</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-foreground">€99</span>
                <span className="text-muted-foreground">/mes</span>
              </div>
              <ul className="mb-8 space-y-3 text-sm">
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Gestión de reseñas (hasta 3 locales)</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Respuestas automáticas con IA</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Análisis avanzado de rentabilidad</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Sistema de reservas integrado</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Marketing automatizado</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Programa de fidelización</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Soporte prioritario</span></li>
              </ul>
              <a href="#" className="mt-auto block w-full rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground transition-colors hover:bg-amber-600">
                Empezar ahora
              </a>
            </div>

            {/* Plan Empresarial */}
            <div className="flex flex-col rounded-lg border border-border bg-card p-8 shadow-md">
              <h3 className="mb-2 text-2xl font-bold text-foreground">Empresarial</h3>
              <p className="mb-6 text-sm text-muted-foreground">Solución completa</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-foreground">Personalizado</span>
              </div>
              <ul className="mb-8 space-y-3 text-sm">
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Gestión ilimitada de locales</span></li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /><span>Todas las funcionalidades Pro</span></li>
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
              <Image data-ai-hint="woman smiling" src="https://picsum.photos/seed/client1/80/80" alt="Avatar Ana S." width={80} height={80} className="mb-6 rounded-full" />
              <p className="mb-6 flex-grow italic text-foreground">"La automatización de respuestas a reseñas nos ha ahorrado horas y ha mejorado nuestra puntuación media increíblemente rápido."</p>
              <p className="font-semibold text-foreground">– Ana S.</p>
            </div>
            {/* Testimonial 2 */}
            <div className="flex flex-col items-center rounded-lg border bg-card p-8 text-center shadow-md">
              <Image data-ai-hint="man serious" src="https://picsum.photos/seed/client2/80/80" alt="Avatar Carlos R." width={80} height={80} className="mb-6 rounded-full" />
              <p className="mb-6 flex-grow italic text-foreground">"Gestionar 5 locales era un caos. Ahora tengo una visión centralizada del rendimiento de cada uno. Imprescindible."</p>
              <p className="font-semibold text-foreground">– Carlos R.</p>
            </div>
            {/* Testimonial 3 */}
            <div className="flex flex-col items-center rounded-lg border bg-card p-8 text-center shadow-md">
              <Image data-ai-hint="woman happy" src="https://picsum.photos/seed/client3/80/80" alt="Avatar Laura M." width={80} height={80} className="mb-6 rounded-full" />
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
