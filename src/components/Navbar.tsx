import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogOut, Menu, X, Shield } from 'lucide-react'

import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from './ui/button'

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/settings', label: 'Settings', icon: Settings }
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--color-primary)', letterSpacing: 'var(--tracking-display)' }}>
          <Shield size={20} aria-hidden />WEIR
        </Link>
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-base"
              style={{ color: location.pathname === link.to ? 'var(--color-primary)' : 'var(--color-text-secondary)', backgroundColor: location.pathname === link.to ? 'rgba(30,64,175,0.1)' : 'transparent' }}
            >
              <link.icon size={15} aria-hidden />{link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={15} className="mr-1.5" aria-hidden />Log out
          </Button>
        </div>
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg transition-base"
          style={{ color: 'var(--color-text)' }}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-1" style={{ backgroundColor: 'var(--color-bg-surface)', borderTop: '1px solid var(--color-border)' }}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium transition-base"
              style={{ color: location.pathname === link.to ? 'var(--color-primary)' : 'var(--color-text-secondary)', backgroundColor: location.pathname === link.to ? 'rgba(30,64,175,0.1)' : 'transparent' }}
            >
              <link.icon size={16} aria-hidden />{link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium transition-base"
            style={{ color: 'var(--color-error)' }}
          >
            <LogOut size={16} aria-hidden />Log out
          </button>
        </div>
      )}
    </header>
  )
}
