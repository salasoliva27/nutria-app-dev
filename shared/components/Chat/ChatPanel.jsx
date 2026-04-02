import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatBubble } from './ChatBubble.jsx'
import { VoiceButton } from './VoiceButton.jsx'

export function ChatPanel({ isOpen, onClose, messages, isResponding, onSend }) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 400)
  }, [isOpen])

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
          className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl"
          style={{
            width: 420,
            height: '85vh',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid rgba(0,229,196,0.15)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          }}
          initial={{ x: 460, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 460, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid rgba(0,229,196,0.1)' }}
          >
            <div className="flex items-center gap-3">
              <OtterMini />
              <span style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)', fontSize: 16 }}>
                nutrIA
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-full transition-opacity hover:opacity-60"
              style={{ color: 'var(--text-muted)', width: 28, height: 28 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
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
            {isResponding && messages[messages.length - 1]?.content === '' && (
              <TypingIndicator />
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderTop: '1px solid rgba(0,229,196,0.1)' }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe un mensaje..."
              className="flex-1 rounded-xl px-4 py-2 text-sm outline-none"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(0,229,196,0.15)',
                color: 'var(--text-primary)',
                fontFamily: "'DM Mono', monospace",
              }}
              disabled={isResponding}
            />
            <VoiceButton onTranscript={(t) => setInput((prev) => prev + t)} />
            <button
              type="submit"
              disabled={!input.trim() || isResponding}
              className="flex items-center justify-center rounded-xl transition-opacity disabled:opacity-30"
              style={{
                width: 36,
                height: 36,
                backgroundColor: 'var(--accent-teal)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" stroke="#080c10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function OtterMini() {
  return (
    <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="22" rx="13" ry="11" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.5" />
      <ellipse cx="20" cy="16" rx="9" ry="8" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.5" />
      <circle cx="17" cy="15" r="2" fill="#f0c060" />
      <circle cx="23" cy="15" r="2" fill="#f0c060" />
      <circle cx="17.6" cy="14.4" r="0.8" fill="#080c10" />
      <circle cx="23.6" cy="14.4" r="0.8" fill="#080c10" />
      <ellipse cx="20" cy="19" rx="3" ry="2" fill="#00e5c4" opacity="0.4" />
      <ellipse cx="9" cy="16" rx="4" ry="3" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.2" />
      <ellipse cx="31" cy="16" rx="4" ry="3" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.2" />
    </svg>
  )
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div
        className="flex items-center gap-1 rounded-2xl px-4 py-3"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid rgba(0,229,196,0.12)' }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{ width: 6, height: 6, backgroundColor: 'var(--accent-teal)' }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}
