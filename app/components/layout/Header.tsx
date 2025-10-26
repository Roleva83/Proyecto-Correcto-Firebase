"use client"

import React from 'react'

interface HeaderProps {
  user?: any
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Caña y Reseña</h1>
        {user && <div>Usuario: {user.name}</div>}
      </div>
    </header>
  )
}
