"use client"

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const baseClass = "px-4 py-2 rounded-lg font-semibold transition-colors"
  const variantClass = variant === 'primary' 
    ? "bg-orange-500 text-white hover:bg-orange-600"
    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
  
  return (
    <button className={`${baseClass} ${variantClass}`} {...props}>
      {children}
    </button>
  )
}
