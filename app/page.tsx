'use client'

import Link from 'next/link'
import { ArrowRight, Target, MessageSquare, Zap, Users, BarChart3, Shield } from 'lucide-react'

// Logo component with AI highlighted
function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`font-semibold ${className}`}>
      <span className="text-[var(--color-text)]">wr</span>
      <span className="text-[#3B82F6]">A</span>
      <span className="text-[#F97316]">I</span>
      <span className="text-[var(--color-text)]">te</span>
    </span>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg)]/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo className="text-xl" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Features</a>
            <a href="#how-it-works" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">How It Works</a>
            <a href="#pricing" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/app" 
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-bg)] font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Try Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
            <span className="text-sm text-[var(--color-text-secondary)]">Now in public beta</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Write messages that
            <br />
            <span className="text-[var(--color-accent)]">sound like you wrote them</span>
          </h1>
          
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            AI that follows the rules great writers use. Short sentences. Plain language. No corporate jargon. Just clear, human messages that get replies.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/app" 
              className="w-full sm:w-auto bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-bg)] font-semibold py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
            >
              Try It Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#how-it-works" 
              className="w-full sm:w-auto border border-[var(--color-border)] hover:border-[var(--color-text-muted)] text-[var(--color-text)] font-medium py-4 px-8 rounded-xl transition-colors text-lg"
            >
              See How It Works
            </a>
          </div>
          
          <p className="mt-6 text-sm text-[var(--color-text-muted)]">
            No credit card required · 10 free generations
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Most cold emails get deleted in seconds.
            </h2>
            <div className="space-y-4 text-[var(--color-text-secondary)] text-lg leading-relaxed">
              <p>
                Bulky paragraphs. Words like "synergy" and "leverage." Opening with "I hope this finds you well."
              </p>
              <p>
                Recipients can spot a template instantly.
              </p>
              <p>
                <Logo /> follows a different set of rules: plain English, short sentences, and something useful in every message.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Not another AI writer
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              We built the framework first. Then we trained the AI to follow it.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: 'Start with something real',
                description: 'Every message opens with a specific observation about them—not a template. Then a bridge to your insight. Then proof it works.',
              },
              {
                icon: MessageSquare,
                title: 'Under 90 words',
                description: '81% of emails are read on phones. Short paragraphs. No scrolling. Nothing gets buried.',
              },
              {
                icon: Zap,
                title: '40+ banned words and phrases',
                description: "No 'synergy.' No 'leverage.' No 'I hope this finds you well.' If it sounds like AI wrote it, we don't allow it.",
              },
              {
                icon: Users,
                title: 'Different people, different messages',
                description: 'A CFO cares about cost. An engineer cares about how it works. Describe your audience and the message adapts.',
              },
              {
                icon: BarChart3,
                title: 'Social proof without the cringe',
                description: 'Your results and case studies, woven in naturally. Not a press release. Not bragging. Just evidence.',
              },
              {
                icon: Shield,
                title: 'Nothing saved, nothing shared',
                description: "Your inputs go to the AI and back. We don't store prospect info. No training on your data.",
              },
            ].map((feature) => (
              <div 
                key={feature.title}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-text-muted)] transition-colors"
              >
                <feature.icon className="w-10 h-10 text-[var(--color-accent)] mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-[var(--color-surface)] border-y border-[var(--color-border-subtle)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Describe your audience. Add context. Generate.
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Three inputs. Three variations. That's it.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Describe who you\'re writing to',
                description: 'A CFO at a fintech. An engineering manager who hates meetings. A small business owner with 20 employees. Tell us who they are and what they care about.',
              },
              {
                step: '02',
                title: 'Add what you know',
                description: 'Recent funding? Hiring spree? Something from their LinkedIn? The more context, the sharper the message.',
              },
              {
                step: '03',
                title: 'Get three variations',
                description: 'Each one takes a different angle. Same core message, different voice. Copy, tweak if needed, and send.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See the difference
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)]">
              Generic AI vs. <Logo />
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bad Example */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border-subtle)] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-sm font-medium text-[var(--color-text-muted)]">Generic AI</span>
              </div>
              <div className="p-6 text-[var(--color-text-secondary)] text-sm leading-relaxed">
                <p className="mb-4">Subject: Quick question about your fleet operations</p>
                <p className="mb-4">Hi there,</p>
                <p className="mb-4">I hope this email finds you well! I wanted to reach out because I believe our cutting-edge fleet management solution could be a game-changer for your organization.</p>
                <p className="mb-4">We leverage AI-powered technology to streamline your operations and drive ROI. Our robust platform helps companies like yours achieve best-in-class results.</p>
                <p>Would you be open to a quick call to discuss how we can partner together?</p>
              </div>
            </div>
            
            {/* Good Example */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-accent)]/30 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border-subtle)] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--color-accent)]"></span>
                <span className="text-sm font-medium text-[var(--color-text-muted)]"><Logo /></span>
              </div>
              <div className="p-6 text-[var(--color-text)] text-sm leading-relaxed">
                <p className="mb-4">Subject: your I-85 routes</p>
                <p className="mb-4">Noticed you run deliveries through Atlanta's northeast corridor.</p>
                <p className="mb-4">A logistics manager at a similar operation cut 14% off fuel costs last quarter. Didn't add a single truck.</p>
                <p className="mb-4">He just started seeing things in his fleet data he'd been missing.</p>
                <p>Open to a quick look at how?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-[var(--color-surface)] border-y border-[var(--color-border-subtle)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple pricing
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)]">
              Start free. Upgrade when you're ready.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free Tier */}
            <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-[var(--color-text-muted)]">/month</span>
              </div>
              <ul className="space-y-3 mb-6 text-[var(--color-text-secondary)]">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  10 generations/month
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  All mediums
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Basic audience descriptions
                </li>
              </ul>
              <Link 
                href="/app" 
                className="block w-full border border-[var(--color-border)] hover:border-[var(--color-text-muted)] text-[var(--color-text)] font-medium py-3 px-6 rounded-lg transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
            
            {/* Pro Tier */}
            <div className="bg-[var(--color-bg)] border-2 border-[var(--color-accent)] rounded-xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-accent)] text-[var(--color-bg)] text-xs font-semibold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <h3 className="text-lg font-semibold mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-[var(--color-text-muted)]">/month</span>
              </div>
              <ul className="space-y-3 mb-6 text-[var(--color-text-secondary)]">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Unlimited generations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Saved audience profiles
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Custom proof points
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Priority support
                </li>
              </ul>
              <Link 
                href="/app" 
                className="block w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-bg)] font-medium py-3 px-6 rounded-lg transition-colors text-center"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
          
          <p className="text-center mt-8 text-[var(--color-text-muted)]">
            Need a team plan? <a href="mailto:hello@wraite.com" className="text-[var(--color-accent)] hover:underline">Contact us</a>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to write messages people actually read?
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-8">
            Start generating better outreach in 30 seconds.
          </p>
          <Link 
            href="/app" 
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-bg)] font-semibold py-4 px-8 rounded-xl transition-colors text-lg"
          >
            Try It Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo className="text-lg" />
            <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
              <a href="/privacy" className="hover:text-[var(--color-text)] transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-[var(--color-text)] transition-colors">Terms</a>
              <a href="mailto:hello@wraite.com" className="hover:text-[var(--color-text)] transition-colors">Contact</a>
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">
              © 2025 wrAIte. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
