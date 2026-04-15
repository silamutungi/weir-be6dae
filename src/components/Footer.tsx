import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="py-10 px-6" style={{ backgroundColor: 'var(--color-bg-surface)', borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-bold" style={{ color: 'var(--color-primary)' }}>WEIR</span>
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          <Link to="/pricing" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Pricing</Link>
          <Link to="/login" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Log in</Link>
          <Link to="/signup" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Sign up</Link>
        </nav>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {new Intl.DateTimeFormat(undefined, { year: 'numeric' }).format(new Date())} WEIR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
