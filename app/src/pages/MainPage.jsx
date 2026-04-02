import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NutriaLogo } from '../components/ui/NutriaLogo.jsx'
import { ChatPanel } from '@shared/components/Chat/ChatPanel.jsx'
import { ChatFull } from '@shared/components/Chat/ChatFull.jsx'
import { useChat } from '@shared/hooks/useChat.js'
import { useProfile } from '@shared/hooks/useProfile.js'
import { extractProfileFromMessages } from '@shared/lib/profileExtractor.js'

export function MainPage({ userId }) {
  const [chatOpen, setChatOpen] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const { profile, saveProfile } = useProfile(userId)
  const { messages, isResponding, sendMessage, returning } = useChat({
    persist: !!userId,
    userId,
    patientProfile: profile,
  })

  // Track the last message count at which we ran extraction
  const lastExtractedAt = useRef(0)

  useEffect(() => {
    if (!userId || !saveProfile) return
    // Don't extract if intake is already complete
    if (profile?.intake_complete) return
    // Only extract at milestones: 8, 16, 24... messages
    if (messages.length < 8) return
    if (messages.length % 8 !== 0) return
    if (messages.length === lastExtractedAt.current) return

    lastExtractedAt.current = messages.length

    extractProfileFromMessages(messages).then((extracted) => {
      if (extracted) saveProfile(extracted)
    })
  }, [messages.length])

  return (
    <div
      className="relative flex h-full flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,196,0.06) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10">
        <NutriaLogo size={88} />

        <div className="flex flex-col items-center gap-2">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            nutrIA
          </h1>
          <p style={{ color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
            {returning
              ? `bienvenido de vuelta${profile?.name ? ', ' + profile.name : ''} 🦦`
              : 'nutrición clínica · inteligencia artificial'}
          </p>
        </div>

        {/* Button fades out once chat opens */}
        <AnimatePresence>
          {!chatOpen && (
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
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            >
              Habla con nutrIA
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {isMobile ? (
        <ChatFull isOpen={chatOpen} onClose={() => setChatOpen(false)} messages={messages} isResponding={isResponding} onSend={sendMessage} returning={returning} />
      ) : (
        <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} messages={messages} isResponding={isResponding} onSend={sendMessage} returning={returning} />
      )}
    </div>
  )
}
