import { useState, useEffect } from 'react'
import { AuthScreen } from './components/Auth/AuthScreen.jsx'
import { PageCarousel } from './components/ui/PageCarousel.jsx'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initSupabase() {
      try {
        const { supabase } = await import('@shared/lib/supabase.js')
        const { data } = await supabase.auth.getSession()
        setSession(data.session)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
          setSession(s)
        })
        setLoading(false)
        return () => subscription.unsubscribe()
      } catch {
        setLoading(false)
      }
    }
    initSupabase()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center" style={{ backgroundColor: 'var(--bg-deep)' }}>
        <div className="h-8 w-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--accent-teal)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (!session) {
    return <AuthScreen onAuth={setSession} />
  }

  return <PageCarousel userId={session.user.id} />
}
