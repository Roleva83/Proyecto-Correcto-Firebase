'use client'
import React from 'react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🍺</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">Caña y Reseña</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-orange-600 transition-colors">
                Funcionalidades
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-orange-600 transition-colors">
                Precios
              </a>
              <a href="#contact" className="text-gray-600 hover:text-orange-600 transition-colors">
                Contacto
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="/auth/login" className="text-gray-600 hover:text-orange-600 transition-colors">
                Iniciar Sesión
              </a>
              <a href="/auth/register" className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Registrarse
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Bienvenido a Caña y Reseña
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gestión inteligente de reseñas con IA - Lola AI
          </p>
          <div className="flex justify-center gap-4">
            <a href="/auth/register" className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors">
              Comenzar Gratis
            </a>
            <a href="#features" className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-50 transition-colors">
              Saber Más
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
