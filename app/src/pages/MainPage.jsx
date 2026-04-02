import { useState } from 'react'
import { motion } from 'framer-motion'
import { NutriaLogo } from '../components/ui/NutriaLogo.jsx'
import { ChatPanel } from '@shared/components/Chat/ChatPanel.jsx'
import { ChatFull } from '@shared/components/Chat/ChatFull.jsx'
import { useChat } from '@shared/hooks/useChat.js'

export function MainPage({ userId }) {
  const [chatOpen, setChatOpen] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const { messages, isResponding, sendMessage } = useChat({ persist: true, userId })

  return (
    <div
      className="relative flex h-full flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,196,0.06) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        <NutriaLogo size={88} />

        <div className="flex flex-col items-center gap-2">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            nutrIA
          </h1>
          <p style={{ color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
            nutrición clínica · inteligencia artificial
          </p>
        </div>

        <motion.button
          onClick={() => setChatOpen(true)}
          className="relative overflow-hidden rounded-full px-8 py-4"
          style={{
            border: '1.5px solid var(--accent-teal)',
            color: 'var(--accent-teal)',
            fontFamily: "'DM Mono', monospace",
            fontSize: 15,
            backgroundColor: 'transparent',
          }}
          animate={{
            boxShadow: [
              '0 0 16px rgba(0,229,196,0.2)',
              '0 0 32px rgba(0,229,196,0.45)',
              '0 0 16px rgba(0,229,196,0.2)',
            ],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Habla con nutrIA
        </motion.button>
      </div>

      {isMobile ? (
        <ChatFull isOpen={chatOpen} onClose={() => setChatOpen(false)} messages={messages} isResponding={isResponding} onSend={sendMessage} />
      ) : (
        <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} messages={messages} isResponding={isResponding} onSend={sendMessage} />
      )}
    </div>
  )
}
