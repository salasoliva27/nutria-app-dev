import { motion } from 'framer-motion'

export function NutriaLogo({ size = 56 }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        {/* Body */}
        <ellipse cx="30" cy="36" rx="19" ry="16" fill="#0d1520" stroke="#00e5c4" strokeWidth="2" />
        {/* Head */}
        <ellipse cx="30" cy="24" rx="14" ry="13" fill="#0d1520" stroke="#00e5c4" strokeWidth="2" />
        {/* Ears */}
        <ellipse cx="18" cy="14" rx="6" ry="5" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.5" />
        <ellipse cx="42" cy="14" rx="6" ry="5" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.5" />
        {/* Eyes */}
        <circle cx="25" cy="23" r="3.5" fill="#f0c060" />
        <circle cx="35" cy="23" r="3.5" fill="#f0c060" />
        <circle cx="25.8" cy="22.2" r="1.5" fill="#080c10" />
        <circle cx="35.8" cy="22.2" r="1.5" fill="#080c10" />
        {/* Eye shine */}
        <circle cx="26.4" cy="21.6" r="0.6" fill="white" opacity="0.8" />
        <circle cx="36.4" cy="21.6" r="0.6" fill="white" opacity="0.8" />
        {/* Nose */}
        <ellipse cx="30" cy="28" rx="4" ry="3" fill="#00e5c4" opacity="0.5" />
        <ellipse cx="30" cy="27.5" rx="2" ry="1.5" fill="#00e5c4" opacity="0.8" />
        {/* Tail hint */}
        <path d="M47 42 Q54 38 52 32 Q50 28 46 30" stroke="#00e5c4" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}
