
"use client"

import React from 'react'
import Link from 'next/link'
import { Home, Bot, BarChart2, Users, TrendingUp, CircleDollarSign, Megaphone, Settings, Award } from 'lucide-react'

interface SidebarProps {
  isOpen?: boolean
}

const navItems = [
    { href: "/dashboard", icon: <Home className="h-5 w-5" />, label: "Inicio" },
    { href: "/lola", icon: <Bot className="h-5 w-5" />, label: "Lola: Reseñas y Acción" },
    { href: "/menu-analysis", icon: <BarChart2 className="h-5 w-5" />, label: "Análisis de Menú" },
    { href: "/team", icon: <Users className="h-5 w-5" />, label: "Equipo y Rendimiento" },
    { href: "/mis-metas-y-medallas", icon: <Award className="h-5 w-5" />, label: "Mis Metas y Medallas" },
    { href: "/financial-simulator", icon: <CircleDollarSign className="h-5 w-5" />, label: "Simulador Financiero" },
    { href: "/marketing", icon: <Megaphone className="h-5 w-5" />, label: "Marketing y Clientes" },
]

export default function Sidebar({ isOpen = true }: SidebarProps) {
  const activePath = "/mis-metas-y-medallas" // Placeholder for active path logic

  return (
    <aside className={`bg-card text-card-foreground border-r transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} flex flex-col`}>
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">Caña y Reseña</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activePath === item.href
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Link
            href="/settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              activePath === "/settings"
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span className="font-medium">Configuración</span>
        </Link>
      </div>
    </aside>
  )
}
