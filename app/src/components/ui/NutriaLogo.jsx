import { motion } from 'framer-motion'

export function NutriaLogo({ size = 56 }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <OtterSVG size={size} />
    </motion.div>
  )
}

export function OtterSVG({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Round head */}
      <circle cx="32" cy="30" r="20" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.8" />

      {/* Small rounded ears — tight to head, otter-style */}
      <circle cx="16" cy="14" r="5" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.5" />
      <circle cx="48" cy="14" r="5" fill="#0d1520" stroke="#00e5c4" strokeWidth="1.5" />
      {/* Inner ear */}
      <circle cx="16" cy="14" r="2.5" fill="rgba(0,229,196,0.12)" />
      <circle cx="48" cy="14" r="2.5" fill="rgba(0,229,196,0.12)" />

      {/* Light face patch — chin / muzzle area */}
      <ellipse cx="32" cy="35" rx="11" ry="9" fill="rgba(0,229,196,0.07)" stroke="rgba(0,229,196,0.15)" strokeWidth="1" />

      {/* Eyes — wide-set, round */}
      <circle cx="24" cy="27" r="4" fill="#f0c060" />
      <circle cx="40" cy="27" r="4" fill="#f0c060" />
      {/* Pupils */}
      <circle cx="24.8" cy="26.5" r="2" fill="#080c10" />
      <circle cx="40.8" cy="26.5" r="2" fill="#080c10" />
      {/* Eye shine */}
      <circle cx="25.6" cy="25.6" r="0.8" fill="white" opacity="0.9" />
      <circle cx="41.6" cy="25.6" r="0.8" fill="white" opacity="0.9" />

      {/* Wide flat otter nose */}
      <ellipse cx="32" cy="33" rx="4.5" ry="2.8" fill="#00e5c4" opacity="0.7" />
      <ellipse cx="32" cy="32.5" rx="2.5" ry="1.5" fill="#00e5c4" />

      {/* Whisker dots — 3 per side */}
      <circle cx="20" cy="34" r="0.9" fill="rgba(0,229,196,0.5)" />
      <circle cx="21.5" cy="36" r="0.9" fill="rgba(0,229,196,0.5)" />
      <circle cx="20" cy="38" r="0.9" fill="rgba(0,229,196,0.5)" />
      <circle cx="44" cy="34" r="0.9" fill="rgba(0,229,196,0.5)" />
      <circle cx="42.5" cy="36" r="0.9" fill="rgba(0,229,196,0.5)" />
      <circle cx="44" cy="38" r="0.9" fill="rgba(0,229,196,0.5)" />

      {/* Small mouth curve */}
      <path d="M28 37.5 Q32 40 36 37.5" stroke="rgba(0,229,196,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  )
}
