import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!isSupabaseConfigured) {
      navigate('/dashboard')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } }
    })
    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      setSuccess(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <Link to="/" className="block text-2xl font-bold mb-8 text-center" style={{ color: 'var(--color-primary)', letterSpacing: 'var(--tracking-display)' }}>WEIR</Link>
        <div className="rounded-2xl p-8" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
          {success ? (
            <div className="text-center">
              <CheckCircle size={40} className="mx-auto mb-4" style={{ color: 'var(--color-success)' }} />
              <h2 className="font-bold mb-2" style={{ fontSize: 'var(--text-title-3)', color: 'var(--color-text)' }}>Check your email</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)' }}>We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
              <Link to="/login"><Button className="mt-6 w-full" variant="outline">Back to login</Button></Link>
            </div>
          ) : (
            <>
              <h1 className="font-bold mb-1" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Create your account</h1>
              <p className="mb-6" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)' }}>Start protecting your identity for free</p>
              {error && (
                <div className="mb-4 rounded-lg px-4 py-3 text-sm flex items-start gap-2" style={{ backgroundColor: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.25)', color: 'var(--color-error)' }}>
                  <AlertCircle size={16} className="mt-0.5 shrink-0" /><span>{error}</span>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" type="text" placeholder="Alex Rivera" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="8+ characters" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password" />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <><Loader2 size={16} className="animate-spin mr-2" />Creating account...</> : 'Create account'}
                </Button>
              </form>
              <p className="mt-5 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Already have an account? <Link to="/login" className="font-semibold" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
