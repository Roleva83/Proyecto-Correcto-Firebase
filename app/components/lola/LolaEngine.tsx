"use client"

import React, { useState } from 'react'

export default function LolaEngine() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([])
  const [input, setInput] = useState('')

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-4">
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          placeholder="Escribe un mensaje..."
        />
      </div>
    </div>
  )
}
