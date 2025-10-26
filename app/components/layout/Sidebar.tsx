"use client"

import React from 'react'

interface SidebarProps {
  isOpen?: boolean
}

export default function Sidebar({ isOpen = true }: SidebarProps) {
  return (
    <aside className={`bg-white border-r ${isOpen ? 'w-64' : 'w-0'} transition-all`}>
      <nav className="p-4">
        <a href="/dashboard" className="block py-2">Dashboard</a>
        <a href="/lola" className="block py-2">Lola AI</a>
      </nav>
    </aside>
  )
}
