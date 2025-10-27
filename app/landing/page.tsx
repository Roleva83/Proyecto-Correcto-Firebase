"use client"

import React from 'react'
import Image from 'next/image'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* === HEADER === */}
      <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 relative">
                <Image 
                  src="https://firebasestorage.googleapis.com/v0/b/lola-ai-j1cmn.firebasestorage.app/o/Imagenes%2Flogo%20ca%C3%B1a%20y%20rese%C3%B1a.png?alt=media&token=971d742e-2192-49f3-b863-9b1d1ee2bd05"
                  alt="Logo Caña y Reseña"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gray-900">Caña y Reseña</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-600">Inicio</a>
              <a href="#features" className="text-gray-700 hover:text-orange-600">Funcionalidades</a>
              <a href="#pricing" className="text-gray-700 hover:text-orange-600">Precios</a>
              <a href="#contact" className="text-gray-700 hover:text-orange-600">Contacto</a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <a href="/auth/login" className="text-gray-700 hover:text-orange-600">
                Iniciar Sesión
              </a>
              <a 
                href="/auth/register" 
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Registrarse
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>

      {/* === HERO SECTION === */}
      <section className="bg-gradient-to-br from-orange-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Bienvenido a Caña y Reseña
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Gestión inteligente de reseñas con IA - Lola AI
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="/auth/register"
                className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                Comenzar Gratis
              </a>
              <a 
                href="#features"
                className="border-2 border-orange-500 text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors font-semibold"
              >
                Saber Más
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Más secciones vendrán después... */}
      <div className="py-20 text-center text-gray-500">
        [Diseño completo se está implementando...]
      </div>
    </div>
  )
}
