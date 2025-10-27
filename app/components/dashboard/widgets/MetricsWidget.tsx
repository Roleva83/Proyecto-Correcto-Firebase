
"use client"

import React from 'react'

interface MetricsWidgetProps {
  title: string
  value: string | number
  color?: 'yellow' | 'blue' | 'green' | 'red' | 'orange'
}

export default function MetricsWidget({ title, value, color = 'orange' }: MetricsWidgetProps) {
  const colorClasses = {
    yellow: 'text-yellow-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    red: 'text-red-500',
    orange: 'text-orange-500',
  }
  
  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-soft">
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className={`text-4xl font-bold ${colorClasses[color]}`}>{value}</p>
    </div>
  )
}
