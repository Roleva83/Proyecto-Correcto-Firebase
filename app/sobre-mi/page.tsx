
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UtensilsCrossed, AreaChart, BrainCircuit } from 'lucide-react';

export default function SobreMi() {
  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 h-[72px] bg-white shadow-soft">
        <div className="container mx-auto flex h-full max-w-[1200px] items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-10">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2Flogo%20ca%C3%B1a%20y%20rese%C3%B1a.png?alt=media&token=971d742e-2192-49f3-b863-9b1d1ee2bd05"
                alt="Logo Caña y Reseña"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-foreground">Caña y Reseña</span>
          </Link>
          <nav className="hidden items-center space-x-8 md:flex">
            <Link href="/#features" className="font-medium text-foreground transition-colors hover:text-primary">
              Funcionalidades
            </Link>
            <Link href="/#pricing" className="font-medium text-foreground transition-colors hover:text-primary">
              Precios
            </Link>
            <Link href="/sobre-mi" className="font-medium text-primary">
              Sobre mí
            </Link>
            <Link href="/#contact" className="font-medium text-foreground transition-colors hover:text-primary">
              Contacto
            </Link>
          </nav>
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

      {/* Main Content */}
      <main className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-50 to-white">
        <div className="container mx-auto max-w-5xl px-4 py-24 sm:py-32">
          {/* Intro Section */}
          <div className="grid items-center gap-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative flex justify-center lg:col-span-2">
              <div className="absolute -inset-4 rounded-full bg-primary/10 blur-2xl"></div>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2Fro%20oficina.png?alt=media&token=55f3ac84-cfb7-4fd6-aa87-fb83b60ca6bf"
                alt="Foto de la fundadora Rocío"
                width={280}
                height={280}
                className="relative h-64 w-64 rounded-full object-contain border-4 border-white shadow-xl"
              />
            </div>
            <div className="text-center md:text-left lg:col-span-3">
              <p className="font-medium text-primary">De la barra al SaaS</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Hola, soy Rocío, la fundadora de Caña y Reseña.
              </h1>
              <p className="mt-6 text-lg leading-8 text-secondary">
                Mi historia no empieza en una oficina, sino detrás de una barra. Durante años, he vivido en primera línea los desafíos de la hostelería: la gestión de equipos, la locura de los servicios y, sobre todo, la lucha constante por mantener una buena reputación.
              </p>
              <p className="mt-4 text-secondary">
                Vi cómo una mala reseña podía arruinar el trabajo de semanas y cómo las buenas pasaban desapercibidas. Me di cuenta de que los hosteleros no necesitábamos más herramientas complicadas, sino un aliado. Un sistema que entendiera nuestro lenguaje y nos diera soluciones directas. Así nació Lola IA.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24 sm:mt-32">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 text-center md:grid-cols-3 lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <UtensilsCrossed className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">Pasión por la Hostelería</h3>
                <p className="mt-2 text-base text-secondary">Conozco el sector desde dentro, entiendo tus dolores y hablo tu mismo idioma.</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <AreaChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">Visión Analítica</h3>
                <p className="mt-2 text-base text-secondary">Convierto datos complejos en acciones sencillas para que tomes mejores decisiones.</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">Foco en IA</h3>
                <p className="mt-2 text-base text-secondary">Aplico la última tecnología para automatizar tareas y potenciar tu crecimiento.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
