'use client'
import React from 'react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Reseñas</h3>
            <p className="text-3xl font-bold text-orange-500">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Pendientes</h3>
            <p className="text-3xl font-bold text-amber-500">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Completadas</h3>
            <p className="text-3xl font-bold text-green-500">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
