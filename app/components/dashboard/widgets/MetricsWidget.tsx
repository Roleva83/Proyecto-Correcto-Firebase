"use client"

import React from 'react'

interface MetricsWidgetProps {
  title: string
  value: string | number
  color?: string
}

export default function MetricsWidget({ title, value, color = 'orange' }: MetricsWidgetProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className={`text-3xl font-bold text-${color}-500`}>{value}</p>
    </div>
  )
}
