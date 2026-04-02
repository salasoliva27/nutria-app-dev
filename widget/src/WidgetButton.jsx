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
      transition={
        isOpen
          ? {}
          : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
      }
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
    <svg width="32" height="32" viewBox="0 0 60 60" fill="none">
      <ellipse cx="30" cy="36" rx="19" ry="16" fill="#0d1520" stroke="#00e5c4" strokeWidth="2" />
      <ellipse cx="30" cy="24" rx="14" ry="13" fill="#0d1520" stroke="#00e5c4" strokeWidth="2" />
      <ellipse cx="18" cy="14" rx="6" ry="5" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.5" />
      <ellipse cx="42" cy="14" rx="6" ry="5" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.5" />
      <circle cx="25" cy="23" r="3.5" fill="#f0c060" />
      <circle cx="35" cy="23" r="3.5" fill="#f0c060" />
      <circle cx="25.8" cy="22.2" r="1.5" fill="#080c10" />
      <circle cx="35.8" cy="22.2" r="1.5" fill="#080c10" />
      <ellipse cx="30" cy="28" rx="4" ry="3" fill="#00e5c4" opacity="0.5" />
    </svg>
  )
}
