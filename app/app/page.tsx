'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Target, MessageSquare, BarChart3, Shield, Users } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg)]/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
              <Zap className="w-4 h-4 text-[var(--color-bg)]" />
            </div>
            <span className="font-semibold text-lg">OutreachAI</span>
          </div>
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
            Cold outreach that
            <br />
            <span className="text-[var(--color-accent)]">actually gets replies</span>
          </h1>
          
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop sending emails that sound like every other sales rep. Generate personalized, human-sounding messages that cut through the noise.
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

      {/* Social Proof Bar */}
      <section className="border-y border-[var(--color-border-subtle)] bg-[var(--color-surface)] py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[var(--color-text-muted)] text-sm mb-6">Trusted by sales teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50">
            {['Company A', 'Company B', 'Company C', 'Company D', 'Company E'].map((company) => (
              <span key={company} className="text-xl font-semibold text-[var(--color-text-secondary)]">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Most cold emails are painfully bad.
            </h2>
            <div className="space-y-4 text-[var(--color-text-secondary)] text-lg leading-relaxed">
              <p>
                Bulky paragraphs. Corporate jargon. "I hope this finds you well."
              </p>
              <p>
                Your prospects delete them in seconds.
              </p>
              <p>
                We built OutreachAI on a simple framework: write like a human, lead with insight, and make it easy to say yes.
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
                title: 'Observation-Bridge-Proof',
                description: 'Every message starts with something specific about them. Not a template. Real research, synthesized.',
              },
              {
                icon: MessageSquare,
                title: 'Mobile-First Format',
                description: 'Under 90 words. Short paragraphs. No scrolling required. Because 81% of emails are read on phones.',
              },
              {
                icon: Zap,
                title: 'No AI Slop',
                description: 'We ban 40+ words and phrases that scream "AI wrote this." No synergy. No leverage. No circling back.',
              },
              {
                icon: Users,
                title: 'Persona-Aware',
                description: 'Fleet manager vs. CFO vs. Safety Director—each gets messaging tuned to their pain points and language.',
              },
              {
                icon: BarChart3,
                title: 'Proof Points Built In',
                description: 'Your case studies and results, ready to drop in. Social proof without sounding like a press release.',
              },
              {
                icon: Shield,
                title: 'Your Data Stays Yours',
                description: 'We don\'t store your prospect info. Inputs go to AI and back. Nothing saved, nothing shared.',
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-text-muted)] transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Three inputs. Three variations.
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)]">
              Tell us who you're reaching, what you know, and what you want. We handle the rest.
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Pick your persona',
                description: 'Are you a Motive AE targeting fleet managers? Personal outreach for a job? Select who you are and who you\'re reaching.',
              },
              {
                step: '02',
                title: 'Add context',
                description: 'What do you know about them? Company size, recent news, mutual connections, pain points you\'ve observed. The more context, the better the output.',
              },
              {
                step: '03',
                title: 'Generate and send',
                description: 'Get three variations—each with a different voice and angle. Copy, paste, personalize if needed, and send.',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-bg)] font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Output Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See the difference
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)]">
              Generic AI vs. OutreachAI
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bad Example */}
            <div className="bg-[var(--color-surface)] border border-red-500/20 rounded-xl overflow-hidden">
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
                <span className="text-sm font-medium text-[var(--color-text-muted)]">OutreachAI</span>
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
                  Personal persona only
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
                <span className="text-4xl font-bold">$49</span>
                <span className="text-[var(--color-text-muted)]">/month</span>
              </div>
              <ul className="space-y-3 mb-6 text-[var(--color-text-secondary)]">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Unlimited generations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Custom company personas
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--color-accent)]">✓</span>
                  Your proof points
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
            Need a team plan or enterprise features? <a href="mailto:hello@outreachai.com" className="text-[var(--color-accent)] hover:underline">Contact us</a>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to write emails people actually read?
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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
                <Zap className="w-4 h-4 text-[var(--color-bg)]" />
              </div>
              <span className="font-semibold">OutreachAI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
              <a href="/privacy" className="hover:text-[var(--color-text)] transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-[var(--color-text)] transition-colors">Terms</a>
              <a href="mailto:hello@outreachai.com" className="hover:text-[var(--color-text)] transition-colors">Contact</a>
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">
              © 2025 OutreachAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
