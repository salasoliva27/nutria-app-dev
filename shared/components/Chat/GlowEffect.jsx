import { motion } from 'framer-motion'

export function GlowEffect() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 rounded-2xl"
      initial={{ opacity: 0.8, scale: 1 }}
      animate={{ opacity: 0, scale: 1.4 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        background: 'radial-gradient(circle, rgba(0,229,196,0.35) 0%, transparent 70%)',
        zIndex: 0,
      }}
    />
  )
}
