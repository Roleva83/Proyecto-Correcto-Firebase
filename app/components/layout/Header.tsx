"use client"

import React from 'react'
import { useAuth } from '@/app/contexts/AuthContext'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'

interface HeaderProps {
  user?: any
}

export default function Header({ user }: HeaderProps) {
  const { signOut } = useAuth()

  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Caña y Reseña</h1>
        {user && (
          <div className="flex items-center gap-4">
            <div>Usuario: {user.name}</div>
            <Button variant="ghost" size="icon" onClick={signOut} aria-label="Cerrar sesión">
              <LogOut className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
