import React from "react";

export default function Home() {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-amber-900 mb-4">
                🍺 Caña y Reseña
              </h1>
              <p className="text-2xl text-amber-700 mb-8">
                La gestión inteligente que impulsa tu negocio de hostelería
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Bienvenida a tu Software de Gestión
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Centraliza tu reputación, reservas, TPV, marketing y fidelización con ayuda de Lola IA.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 bg-amber-50 rounded-lg">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="font-semibold text-lg mb-2">Gestión TPV</h3>
                  <p className="text-sm text-gray-600">Control total de tus ventas</p>
                </div>
                
                <div className="p-6 bg-amber-50 rounded-lg">
                  <div className="text-4xl mb-3">⭐</div>
                  <h3 className="font-semibold text-lg mb-2">Reseñas</h3>
                  <p className="text-sm text-gray-600">Gestiona tu reputación online</p>
                </div>
                
                <div className="p-6 bg-amber-50 rounded-lg">
                  <div className="text-4xl mb-3">📅</div>
                  <h3 className="font-semibold text-lg mb-2">Reservas</h3>
                  <p className="text-sm text-gray-600">Organiza tus mesas fácilmente</p>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-500 text-white rounded-lg p-6">
              <p className="text-xl font-semibold">
                ✅ ¡Tu aplicación está funcionando correctamente!
              </p>
              <p className="mt-2 text-amber-100">
                Proyecto: Caña y Reseña - Firebase Studio
              </p>
            </div>
          </div>
        </div>
      </main>
    )
  }