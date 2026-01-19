import Link from 'next/link'
import { ArrowLeft, Zap } from 'lucide-react'

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-[var(--color-text-secondary)]">
          <p className="text-lg">
            Last updated: January 2025
          </p>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            Acceptance of Terms
          </h2>
          <p>
            By using wrAIte, you agree to these terms. If you don't agree, please don't use our service.
          </p>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            What wrAIte Does
          </h2>
          <p>
            wrAIte is an AI-powered tool that helps you generate outreach messages. We provide suggestions based on your inputs. You are responsible for reviewing and customizing any content before sending it.
          </p>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            Acceptable Use
          </h2>
          <p>
            You agree to use wrAIte only for lawful purposes. You will not use our service to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Send spam or unsolicited bulk messages</li>
            <li>Harass, abuse, or harm others</li>
            <li>Impersonate others or misrepresent your identity</li>
            <li>Violate any applicable laws or regulations (including CAN-SPAM, GDPR, etc.)</li>
            <li>Generate content that is illegal, harmful, or deceptive</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            Your Responsibility
          </h2>
          <p>
            You are solely responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The content you generate and send</li>
            <li>Complying with all applicable laws and regulations</li>
            <li>Obtaining any necessary consents from recipients</li>
            <li>The accuracy of information you provide to the service</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            No Guarantees
          </h2>
          <p>
            wrAIte is provided "as is." We don't guarantee that our suggestions will be effective, appropriate, or error-free. Always review generated content before use.
          </p>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            Billing and Refunds
          </h2>
          <p>
            Paid plans are billed monthly. You can cancel anytime. We don't offer refunds for partial months, but you'll retain access until the end of your billing period.
          </p>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate your account if you violate these terms. You can delete your account at any time.
          </p>
          
          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8 mb-4">
            Changes to Terms
          </h2>
          <p>
            We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.
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
