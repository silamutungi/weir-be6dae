import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

import { Button } from '../components/ui/button'
import Footer from '../components/Footer'

const features = [
  { icon: Eye, title: 'Real-Time Detection', description: 'AI scans social platforms and ad networks 24/7, flagging unauthorized uses of your face, voice, or name within minutes.' },
  { icon: Zap, title: 'One-Tap Actions', description: 'Approve, monetize, or issue a legal takedown request from a single screen. No lawyers, no delays.' },
  { icon: FileText, title: 'License Templates', description: 'Set the rules before infringement happens. Apply transparent licensing to control where and how your identity is used.' },
  { icon: DollarSign, title: 'Earnings Dashboard', description: 'Track CPM rates, payment history, and projected income from every monetized match across all platforms.' },
  { icon: Shield, title: 'Deepfake Protection', description: 'Detect AI-generated content using your likeness or voice. Get alerted and act before the damage spreads.' },
  { icon: TrendingUp, title: 'Creator Benchmarks', description: 'See how your protection rate and earnings compare to similar creators. Know where you rank and where to grow.' }
]

const plans = [
  { name: 'Free', price: 0, features: ['10 monitored matches/mo', '3 platform integrations', 'Basic license templates', 'Email alerts'], cta: 'Start free', highlight: false },
  { name: 'Creator', price: 29, features: ['Unlimited matches', 'All platforms', 'One-tap takedowns', 'Earnings tracking', 'CPM benchmarks', 'Priority alerts'], cta: 'Start free', highlight: true },
  { name: 'Pro', price: 99, features: ['Everything in Creator', 'Deepfake detection', 'Legal template library', 'API access', 'Dedicated support', 'White-label licenses'], cta: 'Start free', highlight: false }
]

const faqs = [
  { q: 'How does WEIR detect my identity in content?', a: 'Our AI uses visual recognition, voice fingerprinting, and name/handle matching to scan social posts, ads, and sponsored content across Instagram, TikTok, YouTube, Facebook, and major ad networks.' },
  { q: 'What happens when I request a takedown?', a: 'WEIR generates a legally-compliant DMCA or NIL violation notice and delivers it directly to the platform. Most takedowns resolve within 48–72 hours.' },
  { q: 'Do I need a lawyer to use WEIR?', a: 'No. Our legal templates are drafted by NIL and IP attorneys. For complex cases, we connect you with our vetted legal partners.' }
]

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ backgroundColor: 'rgba(12,22,40,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span className="text-xl font-bold tracking-tight" style={{ color: '#F1F5F9', letterSpacing: 'var(--tracking-display)' }}>WEIR</span>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/pricing" className="text-sm font-medium transition-base" style={{ color: 'rgba(241,245,249,0.8)' }}>Pricing</Link>
          <Link to="/login" className="text-sm font-medium transition-base" style={{ color: 'rgba(241,245,249,0.8)' }}>Log in</Link>
          <Link to="/signup">
            <Button size="sm">Start free</Button>
          </Link>
        </div>
        <div className="flex md:hidden items-center gap-3">
          <Link to="/login" className="text-sm font-medium" style={{ color: 'rgba(241,245,249,0.8)' }}>Log in</Link>
          <Link to="/signup"><Button size="sm">Start free</Button></Link>
        </div>
      </nav>

      <section
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1758611971865-8ffc4f253e42?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIwY29uZmlkZW50JTIweW91bmclMjBjcmVhdG9yJTIwc2l0cyUyMGF0JTIwYSUyMHNsZWVrJTIwZGVzayUyQyUyMHNtYXJ0cGhvbmUlMjBpfGVufDB8MHx8fDE3NzYyMzEwNTV8MA&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.45) 75%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#60a5fa', letterSpacing: 'var(--tracking-overline)' }}>NIL Protection Platform</p>
          <h1 className="font-bold mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 'var(--leading-tight)', color: '#F1F5F9', maxWidth: '720px', letterSpacing: 'var(--tracking-display)' }}>
            Stop losing money every time someone uses your identity without permission.
          </h1>
          <p className="mb-8 max-w-lg" style={{ fontSize: 'var(--text-title-3)', color: 'rgba(241,245,249,0.82)', lineHeight: 'var(--leading-relaxed)' }}>
            WEIR detects unauthorized uses of your name, face, and likeness in real time — then helps you take action or get paid in a single tap.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/signup"><Button size="lg">Start free — no credit card</Button></Link>
            <Link to="/pricing"><Button size="lg" variant="outline" style={{ borderColor: 'rgba(241,245,249,0.4)', color: '#F1F5F9' }}>See pricing</Button></Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-5">
            {['Real-time AI detection', 'Legal takedown templates', 'Earnings in 48 hrs'].map(t => (
              <span key={t} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(241,245,249,0.72)' }}>
                <CheckCircle size={16} style={{ color: '#4ade80' }} />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase mb-3" style={{ color: 'var(--color-primary)', letterSpacing: 'var(--tracking-overline)' }}>Platform features</p>
          <h2 className="font-bold mb-4" style={{ fontSize: 'var(--text-title-1)', lineHeight: 'var(--leading-tight)', color: 'var(--color-text)', letterSpacing: 'var(--tracking-title)' }}>Every tool creators need to protect and profit.</h2>
          <p className="mb-14 max-w-xl" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-relaxed)' }}>From detection to deal — WEIR handles the entire identity rights workflow so you can focus on creating.</p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(f => (
              <div key={f.title} className="card-hover rounded-xl p-6" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
                <f.icon size={28} style={{ color: 'var(--color-primary)' }} className="mb-4" aria-hidden />
                <h3 className="font-semibold mb-2" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>{f.title}</h3>
                <p style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }} id="pricing">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase mb-3" style={{ color: 'var(--color-primary)', letterSpacing: 'var(--tracking-overline)' }}>Pricing</p>
          <h2 className="font-bold mb-14" style={{ fontSize: 'var(--text-title-1)', lineHeight: 'var(--leading-tight)', color: 'var(--color-text)' }}>Protect your identity at every stage.</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map(p => (
              <div key={p.name} className={`rounded-xl p-7 flex flex-col ${p.highlight ? 'ring-2' : ''}`} style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', ...(p.highlight ? { ringColor: 'var(--color-primary)' } : {}) }}>
                {p.highlight && <span className="text-xs font-semibold uppercase mb-3 px-2 py-1 rounded-full w-fit" style={{ backgroundColor: 'var(--color-primary)', color: '#fff', letterSpacing: 'var(--tracking-overline)' }}>Most popular</span>}
                <h3 className="font-bold mb-1" style={{ fontSize: 'var(--text-title-3)', color: 'var(--color-text)' }}>{p.name}</h3>
                <p className="font-bold mb-6" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>{p.price === 0 ? 'Free' : `$${p.price}/mo`}</p>
                <ul className="flex-1 space-y-2 mb-8">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      <CheckCircle size={15} style={{ color: 'var(--color-success)' }} aria-hidden />{f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup"><Button className="w-full" variant={p.highlight ? 'default' : 'outline'}>{p.cta}</Button></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bold mb-10" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)', letterSpacing: 'var(--tracking-title)' }}>Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map(faq => (
              <div key={faq.q} className="rounded-xl p-6" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
                <h3 className="font-semibold mb-2" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>{faq.q}</h3>
                <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
