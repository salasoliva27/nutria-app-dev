import { useEffect, useState } from 'react'
import { GlowEffect } from './GlowEffect.jsx'

export function ChatBubble({ message }) {
  const isUser = message.role === 'user'
  const [showGlow, setShowGlow] = useState(message.isNew === true)

  useEffect(() => {
    if (showGlow) {
      const t = setTimeout(() => setShowGlow(false), 2800)
      return () => clearTimeout(t)
    }
  }, [showGlow])

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className="relative max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
        style={{
          backgroundColor: isUser ? 'rgba(240,192,96,0.15)' : 'var(--bg-surface)',
          border: isUser
            ? '1px solid rgba(240,192,96,0.3)'
            : showGlow
            ? '1px solid rgba(0,229,196,0.6)'
            : '1px solid rgba(0,229,196,0.12)',
          color: 'var(--text-primary)',
          fontFamily: "'DM Mono', monospace",
          transition: 'border-color 2s ease',
        }}
      >
        {!isUser && showGlow && <GlowEffect />}
        <span className="relative z-10 whitespace-pre-wrap">{message.content}</span>
      </div>
    </div>
  )
}
