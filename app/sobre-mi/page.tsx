
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SobreMi() {
  return (
    <div className="bg-white">
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

      <main className="bg-[radial-gradient(ellipse_at_center,_#FFF9E5_0%,_#FFFFFF_70%)]">
        <div className="container mx-auto max-w-[1200px] px-4 py-[100px]">
          <div className="text-center">
            <h1 className="font-black text-4xl text-[#0F0F10]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Sobre mí
            </h1>
            <p className="mt-4 text-lg font-medium text-[#6B7280]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              De la barra al SaaS
            </p>
          </div>

          <div className="mt-16">
            <div className="mx-auto max-w-5xl rounded-2xl border border-[#E5E7EB] bg-white p-12 shadow-lg grid md:grid-cols-3 gap-10" style={{boxShadow: '0 10px 30px rgba(0,0,0,0.06)'}}>
              <div className="flex justify-center md:col-span-1">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2Fro%20oficina.png?alt=media&token=55f3ac84-cfb7-4fd6-aa87-fb83b60ca6bf"
                  alt="Foto del fundador"
                  width={200}
                  height={200}
                  className="rounded-full object-cover border-4 border-primary shadow-md"
                />
              </div>
              <div className="md:col-span-2 text-foreground">
                <p className="mb-4">
                  Hola, soy Ro, el fundador de Caña y Reseña. Mi historia no empieza en una oficina, sino detrás de una barra. Durante años, he vivido en primera línea los desafíos de la hostelería: la gestión de equipos, la locura de los servicios y, sobre todo, la lucha constante por mantener una buena reputación.
                </p>
                <p className="mb-4">
                  Vi cómo una mala reseña podía arruinar el trabajo de semanas y cómo las buenas pasaban desapercibidas. Me di cuenta de que los hosteleros no necesitábamos más herramientas complicadas, sino un aliado. Un sistema que entendiera nuestro lenguaje y nos diera soluciones directas.
                </p>
                <p>
                  Así nació Lola IA. No es solo un software; es la experiencia de años en el sector convertida en tecnología. Es la camarera que nunca descansa, el gerente que analiza datos mientras duermes y el experto en marketing que siempre sabe qué decir. Mi misión es devolverte el control de tu negocio y el tiempo para que vuelvas a disfrutar de lo que más te gusta: crear experiencias inolvidables para tus clientes.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-soft hover:shadow-lg transition-shadow">
              <span className="text-5xl">🍽️</span>
              <h3 className="mt-4 mb-2 text-xl font-bold text-[#0F0F10]">Pasión por la Hostelería</h3>
              <p className="text-[#6B7280]">Conozco el sector desde dentro, entiendo tus dolores y hablo tu mismo idioma.</p>
            </div>
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-soft hover:shadow-lg transition-shadow">
              <span className="text-5xl">📈</span>
              <h3 className="mt-4 mb-2 text-xl font-bold text-[#0F0F10]">Visión Analítica</h3>
              <p className="text-[#6B7280]">Convierto datos complejos en acciones sencillas para que tomes mejores decisiones.</p>
            </div>
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-soft hover:shadow-lg transition-shadow">
              <span className="text-5xl">🤖</span>
              <h3 className="mt-4 mb-2 text-xl font-bold text-[#0F0F10]">Foco en IA</h3>
              <p className="text-[#6B7280]">Aplico la última tecnología para automatizar tareas y potenciar tu crecimiento.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
