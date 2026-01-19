import Link from 'next/link'
import { ArrowLeft, Zap } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link 
            href="/" 
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
              <Zap className="w-4 h-4 text-[var(--color-bg)]" />
            </div>
            <span className="font-semibold text-lg">wrAIte</span>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-[var(--color-text-secondary)]">
          <p className="text-lg">
            Last updated: January 2025
          </p>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            What we collect
          </h2>
          <p>
            wrAIte collects only the information necessary to provide our service:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email address (for account creation)</li>
            <li>Usage data (which features you use, how often)</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            What we don't collect
          </h2>
          <p>
            We do not store:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The content of your generated messages</li>
            <li>Recipient names, emails, or company information you enter</li>
            <li>Any context or research you provide about prospects</li>
          </ul>
          <p>
            When you generate a message, your inputs are sent directly to our AI provider (Anthropic), the response is returned to you, and nothing is saved on our servers.
          </p>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            Third-party services
          </h2>
          <p>
            We use the following third-party services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Anthropic (Claude API)</strong> — Powers our AI generation. Their privacy policy applies to API usage.</li>
            <li><strong>Vercel</strong> — Hosts our application.</li>
            <li><strong>Stripe</strong> — Processes payments (if applicable).</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            Data retention
          </h2>
          <p>
            Account data is retained until you delete your account. Generated content is not retained at all.
          </p>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            Your rights
          </h2>
          <p>
            You can request deletion of your account and all associated data at any time by contacting us at hello@outreachai.com.
          </p>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            Contact
          </h2>
          <p>
            Questions? Email us at <a href="mailto:hello@outreachai.com" className="text-[var(--color-accent)] hover:underline">hello@outreachai.com</a>
          </p>
        </div>
      </main>
    </div>
  )
}
