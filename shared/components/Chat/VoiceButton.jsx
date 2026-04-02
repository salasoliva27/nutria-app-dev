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
    <div className="relative flex items-center justify-center">
      {/* Concentric pulse rings when recording */}
      <AnimatePresence>
        {isRecording && [1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{ borderColor: 'rgba(0,229,196,0.3)' }}
            initial={{ width: 36, height: 36, opacity: 0.6 }}
            animate={{ width: 36 + i * 18, height: 36 + i * 18, opacity: 0 }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>

      <motion.button
        onClick={isRecording ? stopRecording : startRecording}
        className="relative z-10 flex items-center justify-center rounded-full border transition-colors"
        style={{
          width: 36,
          height: 36,
          backgroundColor: isRecording ? 'rgba(0,229,196,0.2)' : 'transparent',
          borderColor: isRecording ? 'var(--accent-teal)' : 'rgba(0,229,196,0.3)',
        }}
        animate={isRecording ? { scale: [1, 1.08, 1] } : {}}
        transition={isRecording ? { duration: 1.4, repeat: Infinity } : {}}
        whileHover={{ scale: 1.08 }}
        title={isRecording ? 'Detener grabación' : 'Hablar'}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d={isRecording
              ? 'M6 6h12v12H6z'
              : 'M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm-8 9h2a8 8 0 0 0 16 0h2a10 10 0 0 1-9 9.95V22h-2v-2.05A10 10 0 0 1 4 10z'
            }
            fill={isRecording ? '#ff5555' : 'var(--accent-teal)'}
          />
        </svg>
      </motion.button>
    </div>
  )
}
