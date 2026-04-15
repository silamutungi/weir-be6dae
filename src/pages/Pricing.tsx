import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import Footer from '../components/Footer'

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Get started and see WEIR in action.',
    features: ['10 monitored matches per month', '3 platform integrations', 'Basic license templates', 'Email alerts within 24 hrs', 'Community support'],
    cta: 'Start free',
    highlight: false
  },
  {
    name: 'Creator',
    price: 29,
    description: 'For full-time creators and influencers.',
    features: ['Unlimited matches', 'All major platforms', 'One-tap takedowns & monetization', 'Real-time alerts (< 30 min)', 'CPM rate benchmarks', 'Earnings dashboard & payment history', 'Priority email support'],
    cta: 'Start free',
    highlight: true
  },
  {
    name: 'Pro',
    price: 99,
    description: 'For agencies and high-profile talent.',
    features: ['Everything in Creator', 'AI deepfake & voice clone detection', 'Full legal template library', 'API access for integrations', 'Dedicated account manager', 'White-label license agreements', 'SLA: 4-hr takedown response'],
    cta: 'Start free',
    highlight: false
  }
]

const faqs = [
  { q: 'Can I switch plans at any time?', a: 'Yes. Upgrades take effect immediately. Downgrades apply at the end of your billing cycle — no surprise charges.' },
  { q: 'What platforms does WEIR monitor?', a: 'Instagram, TikTok, YouTube, Facebook, Twitter/X, Snapchat, and major programmatic ad networks including Google Display and Meta Audience Network.' },
  { q: 'How does the earnings payout work?', a: 'When you monetize a match, WEIR negotiates the licensing fee and deposits your share directly to your connected bank account within 48 hours of agreement.' },
  { q: 'Is there a free trial for paid plans?', a: 'All paid plans come with a 14-day free trial. No credit card required until the trial ends.' }
]

export default function Pricing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Link to="/" className="text-xl font-bold" style={{ color: 'var(--color-primary)', letterSpacing: 'var(--tracking-display)' }}>WEIR</Link>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Log in</Link>
          <Link to="/signup"><Button size="sm">Start free</Button></Link>
        </div>
      </nav>

      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h1 className="font-bold mb-4" style={{ fontSize: 'var(--text-large-title)', color: 'var(--color-text)', letterSpacing: 'var(--tracking-display)' }}>Pricing that scales with your reach</h1>
            <p style={{ fontSize: 'var(--text-title-3)', color: 'var(--color-text-secondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 'var(--leading-relaxed)' }}>Start protecting your identity for free. Upgrade when you need more coverage and earn more.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 mb-20">
            {plans.map(p => (
              <div key={p.name} className={`rounded-2xl p-7 flex flex-col ${p.highlight ? 'ring-2 ring-[#1E40AF]' : ''}`} style={{ backgroundColor: 'var(--color-bg-surface)', border: p.highlight ? 'none' : '1px solid var(--color-border)' }}>
                {p.highlight && <span className="text-xs font-semibold uppercase mb-4 px-3 py-1 rounded-full w-fit" style={{ backgroundColor: 'var(--color-primary)', color: '#fff', letterSpacing: 'var(--tracking-overline)' }}>Most popular</span>}
                <h2 className="font-bold mb-1" style={{ fontSize: 'var(--text-title-3)', color: 'var(--color-text)' }}>{p.name}</h2>
                <p className="font-bold mb-1" style={{ fontSize: 'var(--text-large-title)', color: 'var(--color-text)' }}>{p.price === 0 ? 'Free' : `$${p.price}`}<span className="text-sm font-normal" style={{ color: 'var(--color-text-muted)' }}>{p.price > 0 ? '/mo' : ''}</span></p>
                <p className="mb-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{p.description}</p>
                <ul className="flex-1 space-y-2.5 mb-8">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      <CheckCircle size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--color-success)' }} aria-hidden />{f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup"><Button className="w-full" variant={p.highlight ? 'default' : 'outline'}>{p.cta}</Button></Link>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="font-bold mb-8 text-center" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Frequently asked questions</h2>
            <div className="space-y-5">
              {faqs.map(faq => (
                <div key={faq.q} className="rounded-xl p-6" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
                  <h3 className="font-semibold mb-2" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>{faq.q}</h3>
                  <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
