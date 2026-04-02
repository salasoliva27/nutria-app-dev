import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatBubble } from './ChatBubble.jsx'
import { VoiceButton } from './VoiceButton.jsx'
import { exportTXT, exportMD, exportCSV, exportDOC, exportPDF } from '../../lib/exportChat.js'

export function ChatPanel({ isOpen, onClose, messages, isResponding, onSend }) {
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 420)
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
          className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden"
          style={{
            width: 840,
            height: '92vh',
            borderRadius: 20,
            backgroundColor: 'rgba(8,12,16,0.92)',
            backdropFilter: 'blur(32px) saturate(1.6)',
            WebkitBackdropFilter: 'blur(32px) saturate(1.6)',
            border: '1px solid rgba(0,229,196,0.14)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(0,229,196,0.08)',
          }}
          initial={{ x: 440, opacity: 0, scale: 0.97 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 440, opacity: 0, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        >
          {/* Ambient glow blob */}
          <div
            className="pointer-events-none absolute"
            style={{
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,229,196,0.06) 0%, transparent 70%)',
              top: -60,
              right: -40,
              zIndex: 0,
            }}
          />

          {/* Header */}
          <div
            className="relative z-10 flex items-center justify-between"
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(0,229,196,0.08)',
              background: 'linear-gradient(180deg, rgba(0,229,196,0.04) 0%, transparent 100%)',
            }}
          >
            <div className="flex items-center gap-3">
              <OtterMini />
              <div>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                }}>
                  nutrIA
                </p>
                <p style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: 'var(--accent-teal)',
                  opacity: 0.7,
                  lineHeight: 1,
                  marginTop: 2,
                }}>
                  {isResponding ? 'escribiendo...' : 'en línea'}
                </p>
              </div>
            </div>

            {/* Export dropdown */}
            <div className="relative">
              <button
                onClick={() => setExportOpen(v => !v)}
                disabled={messages.length === 0}
                style={{ color: messages.length ? 'var(--text-muted)' : 'rgba(74,122,112,0.3)', fontFamily:"'DM Mono',monospace", fontSize:11, padding:'4px 8px', borderRadius:6, border:'1px solid rgba(0,229,196,0.12)', backgroundColor:'rgba(255,255,255,0.03)', cursor: messages.length ? 'pointer' : 'not-allowed' }}
              >
                exportar ↓
              </button>
              {exportOpen && (
                <div style={{ position:'absolute', top:'110%', right:0, backgroundColor:'#0d1520', border:'1px solid rgba(0,229,196,0.18)', borderRadius:10, overflow:'hidden', zIndex:100, minWidth:130, boxShadow:'0 8px 24px rgba(0,0,0,0.5)' }}>
                  {[['PDF','pdf'],['Word (.doc)','doc'],['Markdown','md'],['Texto','txt'],['Excel / CSV','csv']].map(([label, fmt]) => (
                    <button key={fmt} onClick={() => { setExportOpen(false); ({pdf:exportPDF,doc:exportDOC,md:exportMD,txt:exportTXT,csv:exportCSV})[fmt](messages) }}
                      style={{ display:'block', width:'100%', padding:'9px 14px', textAlign:'left', fontFamily:"'DM Mono',monospace", fontSize:12, color:'var(--text-primary)', backgroundColor:'transparent', border:'none', cursor:'pointer', borderBottom:'1px solid rgba(0,229,196,0.07)' }}
                      onMouseEnter={e=>e.currentTarget.style.backgroundColor='rgba(0,229,196,0.08)'}
                      onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
                    >{label}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Status dot */}
            <div className="flex items-center gap-3">
              <motion.div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-teal)',
                }}
                animate={{ opacity: isResponding ? [1, 0.3, 1] : 1 }}
                transition={{ duration: 1.2, repeat: isResponding ? Infinity : 0 }}
              />
              <button
                onClick={onClose}
                className="flex items-center justify-center rounded-full transition-all"
                style={{
                  width: 32,
                  height: 32,
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="relative z-10 flex-1 overflow-y-auto"
            style={{ padding: '20px 16px 8px' }}
          >
            {messages.length === 0 && (
              <motion.div
                className="flex h-full flex-col items-center justify-center gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p style={{ fontSize: 28 }}>🦦</p>
                <p style={{
                  color: 'var(--text-muted)',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  textAlign: 'center',
                  lineHeight: 1.7,
                }}>
                  Hola, soy nutrIA.<br />¿En qué puedo ayudarte hoy?
                </p>
              </motion.div>
            )}
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0 }}
              >
                <ChatBubble message={msg} />
              </motion.div>
            ))}
            {isResponding && messages[messages.length - 1]?.content === '' && (
              <TypingIndicator />
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 flex items-end gap-2"
            style={{
              padding: '12px 16px 16px',
              borderTop: '1px solid rgba(0,229,196,0.08)',
              background: 'linear-gradient(0deg, rgba(0,229,196,0.03) 0%, transparent 100%)',
            }}
          >
            <div
              className="flex flex-1 items-end rounded-2xl transition-all"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: focused
                  ? '1px solid rgba(0,229,196,0.35)'
                  : '1px solid rgba(255,255,255,0.07)',
                boxShadow: focused ? '0 0 0 3px rgba(0,229,196,0.06)' : 'none',
                minHeight: 44,
                padding: '10px 14px',
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Escribe un mensaje..."
                rows={1}
                disabled={isResponding}
                style={{
                  width: '100%',
                  resize: 'none',
                  outline: 'none',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  lineHeight: 1.6,
                  overflowY: 'hidden',
                  caretColor: 'var(--accent-teal)',
                }}
              />
            </div>

            <div className="flex flex-shrink-0 items-center gap-1.5 pb-1">
              <VoiceButton onTranscript={(t) => setInput((prev) => (prev ? prev + ' ' : '') + t)} />
              <motion.button
                type="submit"
                disabled={!input.trim() || isResponding}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: input.trim() && !isResponding
                    ? 'linear-gradient(135deg, #00e5c4 0%, #00b89e 100%)'
                    : 'rgba(0,229,196,0.12)',
                  border: 'none',
                  cursor: input.trim() && !isResponding ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
                whileTap={input.trim() && !isResponding ? { scale: 0.92 } : {}}
                whileHover={input.trim() && !isResponding ? { scale: 1.05 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"
                    stroke={input.trim() && !isResponding ? '#080c10' : 'rgba(0,229,196,0.4)'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function OtterMini() {
  return (
    <div style={{
      width: 36,
      height: 36,
      borderRadius: '50%',
      backgroundColor: 'rgba(0,229,196,0.08)',
      border: '1px solid rgba(0,229,196,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width="22" height="22" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="30" r="20" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.8" />
        <circle cx="16" cy="14" r="5" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.5" />
        <circle cx="48" cy="14" r="5" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.5" />
        <circle cx="16" cy="14" r="2.5" fill="rgba(0,229,196,0.15)" />
        <circle cx="48" cy="14" r="2.5" fill="rgba(0,229,196,0.15)" />
        <ellipse cx="32" cy="35" rx="11" ry="9" fill="rgba(0,229,196,0.07)" />
        <circle cx="24" cy="27" r="4" fill="#f0c060" />
        <circle cx="40" cy="27" r="4" fill="#f0c060" />
        <circle cx="24.8" cy="26.5" r="2" fill="#080c10" />
        <circle cx="40.8" cy="26.5" r="2" fill="#080c10" />
        <circle cx="25.6" cy="25.6" r="0.8" fill="white" opacity="0.9" />
        <circle cx="41.6" cy="25.6" r="0.8" fill="white" opacity="0.9" />
        <ellipse cx="32" cy="33" rx="4.5" ry="2.8" fill="#00e5c4" opacity="0.7" />
        <ellipse cx="32" cy="32.5" rx="2.5" ry="1.5" fill="#00e5c4" />
        <circle cx="20" cy="35" r="0.9" fill="rgba(0,229,196,0.5)" />
        <circle cx="44" cy="35" r="0.9" fill="rgba(0,229,196,0.5)" />
      </svg>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex justify-start" style={{ marginBottom: 16 }}>
      <div
        className="flex items-center gap-1.5"
        style={{
          padding: '10px 14px',
          borderRadius: 16,
          borderBottomLeftRadius: 4,
          backgroundColor: 'rgba(13,21,32,0.9)',
          border: '1px solid rgba(0,229,196,0.1)',
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              backgroundColor: 'var(--accent-teal)',
            }}
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
    </div>
  )
}
