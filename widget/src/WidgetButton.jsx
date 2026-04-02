import { motion } from 'framer-motion'

export function WidgetButton({ isOpen, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: '50%',
        backgroundColor: '#0d1520',
        border: '1.5px solid rgba(0,229,196,0.4)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999998,
        outline: 'none',
      }}
      animate={{
        y: isOpen ? 0 : [0, -4, 0],
        boxShadow: isOpen
          ? '0 0 0 rgba(0,229,196,0)'
          : [
              '0 0 12px rgba(0,229,196,0.25)',
              '0 0 28px rgba(0,229,196,0.5)',
              '0 0 12px rgba(0,229,196,0.25)',
            ],
      }}
      transition={isOpen ? {} : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.1, boxShadow: '0 0 32px rgba(0,229,196,0.6)' }}
      whileTap={{ scale: 0.95 }}
      title="Hablar con nutrIA"
    >
      {isOpen ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="#00e5c4" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <OtterIcon />
      )}
    </motion.button>
  )
}

function OtterIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 64 64" fill="none">
      {/* Round head */}
      <circle cx="32" cy="30" r="20" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.8" />
      {/* Small rounded ears */}
      <circle cx="16" cy="14" r="5" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.5" />
      <circle cx="48" cy="14" r="5" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.5" />
      <circle cx="16" cy="14" r="2.5" fill="rgba(0,229,196,0.12)" />
      <circle cx="48" cy="14" r="2.5" fill="rgba(0,229,196,0.12)" />
      {/* Light face patch */}
      <ellipse cx="32" cy="35" rx="11" ry="9" fill="rgba(0,229,196,0.07)" stroke="rgba(0,229,196,0.15)" strokeWidth="1" />
      {/* Eyes */}
      <circle cx="24" cy="27" r="4" fill="#f0c060" />
      <circle cx="40" cy="27" r="4" fill="#f0c060" />
      <circle cx="24.8" cy="26.5" r="2" fill="#080c10" />
      <circle cx="40.8" cy="26.5" r="2" fill="#080c10" />
      <circle cx="25.6" cy="25.6" r="0.8" fill="white" opacity="0.9" />
      <circle cx="41.6" cy="25.6" r="0.8" fill="white" opacity="0.9" />
      {/* Wide flat nose */}
      <ellipse cx="32" cy="33" rx="4.5" ry="2.8" fill="#00e5c4" opacity="0.7" />
      <ellipse cx="32" cy="32.5" rx="2.5" ry="1.5" fill="#00e5c4" />
      {/* Whisker dots */}
      <circle cx="20" cy="34" r="0.9" fill="rgba(0,229,196,0.5)" />
      <circle cx="21.5" cy="36" r="0.9" fill="rgba(0,229,196,0.5)" />
      <circle cx="44" cy="34" r="0.9" fill="rgba(0,229,196,0.5)" />
      <circle cx="42.5" cy="36" r="0.9" fill="rgba(0,229,196,0.5)" />
    </svg>
  )
}
