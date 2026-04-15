import { useState, useEffect, type FormEvent } from 'react'
import { AlertCircle, CheckCircle, Loader2, Trash2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import Navbar from '../components/Navbar'

type ProfileForm = { display_name: string; username: string; bio: string; instagram: string; tiktok: string; youtube: string }

const defaultForm: ProfileForm = { display_name: '', username: '', bio: '', instagram: '', tiktok: '', youtube: '' }

export default function Settings() {
  const [form, setForm] = useState<ProfileForm>(defaultForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      if (!isSupabaseConfigured) {
        setForm({ display_name: 'Alex Rivera', username: 'alexrivera', bio: 'Content creator & athlete. NIL rights matter.', instagram: '@alexrivera', tiktok: '@alex.creates', youtube: 'AlexRiveraOfficial' })
        setLoading(false)
        return
      }
      const { data: sessionData } = await supabase.auth.getSession()
      const userId = sessionData.session?.user.id
      if (!userId) { setLoading(false); return }
      const { data } = await supabase.from('profiles').select('*').eq('user_id', userId).maybeSingle()
      if (data) {
        const handles = data.platform_handles as Record<string, string> | null
        setForm({ display_name: data.display_name, username: data.username, bio: data.bio ?? '', instagram: handles?.instagram ?? '', tiktok: handles?.tiktok ?? '', youtube: handles?.youtube ?? '' })
      }
      setLoading(false)
    }
    load()
  }, [])

  function field(key: keyof ProfileForm) {
    return { value: form[key], onChange: (e: React.ChangeEvent<HTMLInputElement>) => setForm(prev => ({ ...prev, [key]: e.target.value })) }
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setSaving(true); setError(''); setSuccess(false)
    if (!isSupabaseConfigured) {
      await new Promise(r => setTimeout(r, 600))
      setSaving(false); setSuccess(true)
      return
    }
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user.id
    if (!userId) { setError('Session expired. Please log in again.'); setSaving(false); return }
    const { error: dbError } = await supabase.from('profiles').upsert({
      user_id: userId,
      display_name: form.display_name,
      username: form.username,
      bio: form.bio,
      platform_handles: { instagram: form.instagram, tiktok: form.tiktok, youtube: form.youtube },
      tier: 'free'
    }, { onConflict: 'user_id' })
    setSaving(false)
    if (dbError) { setError(dbError.message) } else { setSuccess(true) }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 pt-24 pb-16">
        <h1 className="font-bold mb-8" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Settings</h1>
        {loading ? (
          <div className="space-y-4">
            {[1,2,3,4].map(i => <div key={i} className="h-12 rounded-xl animate-pulse" style={{ backgroundColor: 'var(--color-bg-surface)' }} />)}
          </div>
        ) : (
          <div className="space-y-8">
            <section className="rounded-2xl p-7" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
              <h2 className="font-semibold mb-5" style={{ fontSize: 'var(--text-title-3)', color: 'var(--color-text)' }}>Profile</h2>
              {error && (
                <div className="mb-4 rounded-lg px-4 py-3 text-sm flex items-start gap-2" style={{ backgroundColor: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.25)', color: 'var(--color-error)' }}>
                  <AlertCircle size={16} className="mt-0.5 shrink-0" /><span>{error}</span>
                </div>
              )}
              {success && (
                <div className="mb-4 rounded-lg px-4 py-3 text-sm flex items-center gap-2" style={{ backgroundColor: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.25)', color: 'var(--color-success)' }}>
                  <CheckCircle size={16} />Profile saved successfully.
                </div>
              )}
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="display_name">Display name</Label>
                    <Input id="display_name" {...field('display_name')} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" {...field('username')} required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" {...field('bio')} placeholder="Short description about you" />
                </div>
                <h3 className="font-semibold pt-2" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>Platform handles</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" {...field('instagram')} placeholder="@handle" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="tiktok">TikTok</Label>
                    <Input id="tiktok" {...field('tiktok')} placeholder="@handle" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input id="youtube" {...field('youtube')} placeholder="Channel name" />
                  </div>
                </div>
                <Button type="submit" disabled={saving}>
                  {saving ? <><Loader2 size={15} className="animate-spin mr-2" />Saving...</> : 'Save changes'}
                </Button>
              </form>
            </section>

            <section className="rounded-2xl p-7" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid rgba(220,38,38,0.3)' }}>
              <h2 className="font-semibold mb-2" style={{ fontSize: 'var(--text-title-3)', color: 'var(--color-error)' }}>Danger zone</h2>
              <p className="mb-5" style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)' }}>Deleting your account permanently removes all data. This cannot be undone.</p>
              <Button variant="destructive" type="button"><Trash2 size={15} className="mr-2" />Delete account</Button>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}
