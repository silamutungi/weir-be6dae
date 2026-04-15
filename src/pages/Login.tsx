import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, Loader2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!isSupabaseConfigured) {
      navigate('/dashboard')
      return
    }
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <Link to="/" className="block text-2xl font-bold mb-8 text-center" style={{ color: 'var(--color-primary)', letterSpacing: 'var(--tracking-display)' }}>WEIR</Link>
        <div className="rounded-2xl p-8" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
          <h1 className="font-bold mb-1" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Welcome back</h1>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)' }}>Sign in to your WEIR dashboard</p>
          {!isSupabaseConfigured && (
            <div className="mb-4 rounded-lg px-4 py-3 text-sm flex items-start gap-2" style={{ backgroundColor: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', color: 'var(--color-info)' }}>
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>Demo mode — connect Supabase to enable real auth.</span>
            </div>
          )}
          {error && (
            <div className="mb-4 rounded-lg px-4 py-3 text-sm flex items-start gap-2" style={{ backgroundColor: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.25)', color: 'var(--color-error)' }}>
              <AlertCircle size={16} className="mt-0.5 shrink-0" /><span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <><Loader2 size={16} className="animate-spin mr-2" />Signing in...</> : 'Sign in'}
            </Button>
          </form>
          <p className="mt-5 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            No account? <Link to="/signup" className="font-semibold" style={{ color: 'var(--color-primary)' }}>Start free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
