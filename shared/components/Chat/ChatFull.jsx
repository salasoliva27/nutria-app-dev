import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatBubble } from './ChatBubble.jsx'
import { VoiceButton } from './VoiceButton.jsx'

export function ChatFull({ isOpen, onClose, messages, isResponding, onSend }) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSubmit(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || isResponding) return
    onSend(text)
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: 'var(--bg-deep)', paddingBottom: 'env(safe-area-inset-bottom)' }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{
              borderBottom: '1px solid rgba(0,229,196,0.1)',
              paddingTop: 'max(1rem, env(safe-area-inset-top))',
            }}
          >
            <span style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: 18 }}>
              nutrIA
            </span>
            <button
              onClick={onClose}
              className="flex items-center justify-center"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center">
                <p style={{ color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", fontSize: 13, textAlign: 'center' }}>
                  Hola, soy nutrIA 🦦<br />¿En qué puedo ayudarte hoy?
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <ChatBubble key={i} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderTop: '1px solid rgba(0,229,196,0.1)' }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe un mensaje..."
              className="flex-1 rounded-xl px-4 py-3 text-sm outline-none"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(0,229,196,0.15)',
                color: 'var(--text-primary)',
                fontFamily: "'DM Mono', monospace",
                fontSize: 16,
              }}
              disabled={isResponding}
            />
            <VoiceButton onTranscript={(t) => setInput((prev) => prev + t)} />
            <button
              type="submit"
              disabled={!input.trim() || isResponding}
              className="flex items-center justify-center rounded-xl disabled:opacity-30"
              style={{ width: 44, height: 44, backgroundColor: 'var(--accent-teal)', flexShrink: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" stroke="#080c10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
