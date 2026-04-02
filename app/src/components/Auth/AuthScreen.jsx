import { useState } from 'react'
import { motion } from 'framer-motion'
import { NutriaLogo } from '../ui/NutriaLogo.jsx'

const COPY = {
  es: {
    tagline: 'tu agente de nutrición clínica',
    google: 'Continuar con Google',
    or: 'o',
    emailPlaceholder: 'correo@email.com',
    passwordPlaceholder: 'contraseña',
    signIn: 'Iniciar sesión',
    signUp: 'Crear cuenta',
    loading: '...',
    toSignUp: '¿Sin cuenta? Regístrate',
    toSignIn: '¿Ya tienes cuenta? Inicia sesión',
  },
  en: {
    tagline: 'your clinical nutrition AI agent',
    google: 'Continue with Google',
    or: 'or',
    emailPlaceholder: 'email@example.com',
    passwordPlaceholder: 'password',
    signIn: 'Sign in',
    signUp: 'Create account',
    loading: '...',
    toSignUp: "No account? Sign up",
    toSignIn: 'Already have an account? Sign in',
  },
}

export function AuthScreen({ onAuth }) {
  const [lang, setLang] = useState('es')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const t = COPY[lang]

  async function handleGoogleLogin() {
    const { supabase } = await import('@shared/lib/supabase.js')
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  async function handleEmailAuth(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { supabase } = await import('@shared/lib/supabase.js')
      const fn = isSignUp ? supabase.auth.signUp : supabase.auth.signInWithPassword
      const { data, error: err } = await fn.call(supabase.auth, { email, password })
      if (err) throw err
      if (data.session) onAuth(data.session)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="relative flex h-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      <NoiseBackground />

      {/* Lang toggle */}
      <div className="absolute top-5 right-5 z-20 flex rounded-lg overflow-hidden" style={{ border: '1px solid rgba(0,229,196,0.2)' }}>
        {['es', 'en'].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="px-3 py-1 text-xs transition-colors"
            style={{
              fontFamily: "'DM Mono', monospace",
              backgroundColor: lang === l ? 'rgba(0,229,196,0.15)' : 'transparent',
              color: lang === l ? 'var(--accent-teal)' : 'var(--text-muted)',
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <motion.div
        className="relative z-10 flex w-full max-w-sm flex-col items-center gap-8 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-4">
          <NutriaLogo size={72} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            nutrIA
          </h1>
          <p style={{ color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
            {t.tagline}
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl py-3 transition-opacity hover:opacity-80"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--text-primary)',
            fontFamily: "'DM Mono', monospace",
            fontSize: 14,
          }}
        >
          <GoogleIcon />
          {t.google}
        </button>

        <div className="flex w-full items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: "'DM Mono', monospace" }}>{t.or}</span>
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
        </div>

        <form onSubmit={handleEmailAuth} className="flex w-full flex-col gap-3">
          <input
            type="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(0,229,196,0.2)',
              color: 'var(--text-primary)',
              fontFamily: "'DM Mono', monospace",
            }}
            required
          />
          <input
            type="password"
            placeholder={t.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(0,229,196,0.2)',
              color: 'var(--text-primary)',
              fontFamily: "'DM Mono', monospace",
            }}
            required
          />

          {error && (
            <p style={{ color: '#ff6b6b', fontSize: 12, fontFamily: "'DM Mono', monospace" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-3 text-sm font-medium transition-opacity disabled:opacity-50"
            style={{
              backgroundColor: 'var(--accent-teal)',
              color: '#080c10',
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {loading ? t.loading : isSignUp ? t.signUp : t.signIn}
          </button>
        </form>

        <button
          onClick={() => setIsSignUp((v) => !v)}
          style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: "'DM Mono', monospace" }}
          className="hover:opacity-80"
        >
          {isSignUp ? t.toSignIn : t.toSignUp}
        </button>
      </motion.div>
    </div>
  )
}

function NoiseBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 300 + i * 80,
            height: 300 + i * 80,
            backgroundColor: 'var(--accent-teal)',
            left: `${10 + i * 12}%`,
            top: `${5 + i * 8}%`,
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
        />
      ))}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}
