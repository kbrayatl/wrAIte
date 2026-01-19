'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // For MVP, just redirect to app
    window.location.href = '/app'
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
            <Zap className="w-5 h-5 text-[var(--color-bg)]" />
          </div>
          <span className="font-semibold text-xl">OutreachAI</span>
        </div>
        
        {/* Form */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6">
          <h1 className="text-2xl font-semibold mb-2">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-6">
            {isSignUp 
              ? 'Start generating better outreach today.' 
              : 'Log in to continue to your dashboard.'}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-bg)] font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {isSignUp ? 'Create Account' : 'Log In'}
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-[var(--color-border-subtle)] text-center">
            <p className="text-[var(--color-text-secondary)]">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[var(--color-accent)] hover:underline"
              >
                {isSignUp ? 'Log in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
        
        {/* Note for demo */}
        <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          Demo mode: Click login to access the app directly.
        </p>
      </div>
    </div>
  )
}
