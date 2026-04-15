import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, CheckCircle, Eye, RefreshCw, Plus } from 'lucide-react'

import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Match } from '../types/index'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import Navbar from '../components/Navbar'
import { formatCurrency, formatDate } from '../lib/utils'

const SEED_MATCHES: Match[] = [
  { id: '1', user_id: 'demo', platform: 'Instagram', url: '#', thumbnail_url: null, title: 'Sponsored post using @alexrivera likeness', detected_at: new Date(Date.now() - 3600000).toISOString(), status: 'pending', risk_level: 'high', cpm_rate: 4.2, estimated_earnings: 840, created_at: new Date().toISOString(), deleted_at: null },
  { id: '2', user_id: 'demo', platform: 'TikTok', url: '#', thumbnail_url: null, title: 'Brand ad featuring creator voiceover', detected_at: new Date(Date.now() - 86400000).toISOString(), status: 'monetized', risk_level: 'low', cpm_rate: 6.1, estimated_earnings: 1220, created_at: new Date().toISOString(), deleted_at: null },
  { id: '3', user_id: 'demo', platform: 'YouTube', url: '#', thumbnail_url: null, title: 'AI-generated deepfake detected', detected_at: new Date(Date.now() - 172800000).toISOString(), status: 'takedown', risk_level: 'high', cpm_rate: null, estimated_earnings: null, created_at: new Date().toISOString(), deleted_at: null },
  { id: '4', user_id: 'demo', platform: 'Facebook', url: '#', thumbnail_url: null, title: 'Fan account repost — approved usage', detected_at: new Date(Date.now() - 259200000).toISOString(), status: 'approved', risk_level: 'low', cpm_rate: 2.8, estimated_earnings: 112, created_at: new Date().toISOString(), deleted_at: null },
  { id: '5', user_id: 'demo', platform: 'Instagram', url: '#', thumbnail_url: null, title: 'Untagged product placement', detected_at: new Date(Date.now() - 345600000).toISOString(), status: 'pending', risk_level: 'medium', cpm_rate: 3.5, estimated_earnings: 490, created_at: new Date().toISOString(), deleted_at: null },
  { id: '6', user_id: 'demo', platform: 'TikTok', url: '#', thumbnail_url: null, title: 'Remix using original audio', detected_at: new Date(Date.now() - 432000000).toISOString(), status: 'approved', risk_level: 'low', cpm_rate: 1.9, estimated_earnings: 76, created_at: new Date().toISOString(), deleted_at: null }
]

const riskColors: Record<string, string> = { high: 'var(--color-error)', medium: 'var(--color-warning)', low: 'var(--color-success)' }
const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = { pending: 'secondary', approved: 'default', takedown: 'destructive', monetized: 'outline' }

export default function Dashboard() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const loadMatches = useCallback(async () => {
    setLoading(true)
    setError('')
    if (!isSupabaseConfigured) {
      setTimeout(() => { setMatches(SEED_MATCHES); setLoading(false) }, 600)
      return
    }
    const { data, error: dbError } = await supabase.from('matches').select('*').is('deleted_at', null).order('detected_at', { ascending: false })
    setLoading(false)
    if (dbError) { setError(dbError.message) } else { setMatches(data ?? []) }
  }, [])

  useEffect(() => { loadMatches() }, [loadMatches])

  async function updateMatchStatus(id: string, status: Match['status']) {
    setActionLoading(id)
    if (!isSupabaseConfigured) {
      setMatches(prev => prev.map(m => m.id === id ? { ...m, status } : m))
      setActionLoading(null)
      return
    }
    await supabase.from('matches').update({ status }).eq('id', id)
    setActionLoading(null)
    loadMatches()
  }

  const totalEarnings = matches.filter(m => m.status === 'monetized').reduce((s, m) => s + (m.estimated_earnings ?? 0), 0)
  const pending = matches.filter(m => m.status === 'pending').length
  const highRisk = matches.filter(m => m.risk_level === 'high').length

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        {!isSupabaseConfigured && (
          <div className="mb-6 rounded-lg px-4 py-3 text-sm flex items-center gap-2" style={{ backgroundColor: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', color: 'var(--color-info)' }}>
            <Eye size={15} />Viewing sample data — connect your database to go live.
          </div>
        )}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Detection Feed</h1>
          <Link to="/settings"><Button variant="outline" size="sm"><Plus size={15} className="mr-1.5" />Add License</Button></Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Matches', value: matches.length, icon: Eye, color: 'var(--color-info)' },
            { label: 'Pending Review', value: pending, icon: AlertTriangle, color: 'var(--color-warning)' },
            { label: 'High Risk', value: highRisk, icon: Shield, color: 'var(--color-error)' },
            { label: 'Est. Earnings', value: formatCurrency(totalEarnings), icon: DollarSign, color: 'var(--color-success)' }
          ].map(stat => (
            <div key={stat.label} className="rounded-xl p-5" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
              <stat.icon size={20} style={{ color: stat.color }} aria-hidden className="mb-2" />
              <p className="font-bold" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>{stat.value}</p>
              <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {loading && (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl animate-pulse" style={{ backgroundColor: 'var(--color-bg-surface)' }} />)}
          </div>
        )}
        {!loading && error && (
          <div className="rounded-xl p-8 text-center" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
            <AlertTriangle size={32} className="mx-auto mb-3" style={{ color: 'var(--color-error)' }} />
            <p className="font-medium mb-4" style={{ color: 'var(--color-text)' }}>{error}</p>
            <Button variant="outline" onClick={loadMatches}><RefreshCw size={15} className="mr-2" />Retry</Button>
          </div>
        )}
        {!loading && !error && matches.length === 0 && (
          <div className="rounded-xl p-12 text-center" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
            <CheckCircle size={40} className="mx-auto mb-4" style={{ color: 'var(--color-success)' }} />
            <h2 className="font-semibold mb-2" style={{ fontSize: 'var(--text-title-3)', color: 'var(--color-text)' }}>No matches yet — your identity is clear.</h2>
            <p className="mb-6" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)' }}>WEIR is scanning now. Add your platform handles in Settings to improve detection coverage.</p>
            <Link to="/settings"><Button>Configure monitoring</Button></Link>
          </div>
        )}
        {!loading && !error && matches.length > 0 && (
          <div className="space-y-3">
            {matches.map(m => (
              <div key={m.id} className="rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-xs uppercase" style={{ color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-overline)' }}>{m.platform}</span>
                    <Badge variant={statusVariant[m.status]}>{m.status}</Badge>
                    <span className="text-xs font-medium" style={{ color: riskColors[m.risk_level] }}>{m.risk_level} risk</span>
                  </div>
                  <p className="font-medium truncate" style={{ color: 'var(--color-text)', fontSize: 'var(--text-subhead)' }}>{m.title}</p>
                  <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>{formatDate(m.detected_at)}{m.estimated_earnings ? ` · Est. ${formatCurrency(m.estimated_earnings)}` : ''}</p>
                </div>
                {m.status === 'pending' && (
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="outline" disabled={actionLoading === m.id} onClick={() => updateMatchStatus(m.id, 'approved')}>Approve</Button>
                    <Button size="sm" variant="outline" disabled={actionLoading === m.id} onClick={() => updateMatchStatus(m.id, 'monetized')}>Monetize</Button>
                    <Button size="sm" variant="destructive" disabled={actionLoading === m.id} onClick={() => updateMatchStatus(m.id, 'takedown')}>Takedown</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
