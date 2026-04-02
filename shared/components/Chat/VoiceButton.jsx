import { motion, AnimatePresence } from 'framer-motion'
import { useVoice } from '../../hooks/useVoice.js'
import { useEffect } from 'react'

export function VoiceButton({ onTranscript }) {
  const { isRecording, transcript, startRecording, stopRecording } = useVoice()

  useEffect(() => {
    if (!isRecording && transcript) {
      onTranscript(transcript)
    }
  }, [isRecording, transcript])

  return (
    <div className="relative flex items-center justify-center" style={{ flexShrink: 0 }}>
      {/* Concentric pulse rings */}
      <AnimatePresence>
        {isRecording && [1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              border: '1px solid rgba(0,229,196,0.25)',
              pointerEvents: 'none',
            }}
            initial={{ width: 40, height: 40, opacity: 0.5 }}
            animate={{ width: 40 + i * 22, height: 40 + i * 22, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.35,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={isRecording ? stopRecording : startRecording}
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: isRecording
            ? 'rgba(255,85,85,0.15)'
            : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isRecording ? 'rgba(255,85,85,0.4)' : 'rgba(255,255,255,0.07)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
        }}
        animate={isRecording ? {
          scale: [1, 1.06, 1],
          boxShadow: [
            '0 0 0 rgba(255,85,85,0)',
            '0 0 12px rgba(255,85,85,0.25)',
            '0 0 0 rgba(255,85,85,0)',
          ],
        } : {}}
        transition={isRecording ? { duration: 1.4, repeat: Infinity } : {}}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title={isRecording ? 'Detener grabación' : 'Hablar'}
      >
        {isRecording ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="1" width="10" height="10" rx="2" fill="#ff5555" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="2" width="6" height="12" rx="3" stroke="rgba(232,244,240,0.5)" strokeWidth="1.5" fill="none" />
            <path d="M5 10a7 7 0 0 0 14 0" stroke="rgba(232,244,240,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <line x1="12" y1="17" x2="12" y2="22" stroke="rgba(232,244,240,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </motion.button>
    </div>
  )
}
