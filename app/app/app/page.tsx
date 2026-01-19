'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Medium, 
  RelationshipHistory, 
  MEDIUM_LABELS, 
  HISTORY_LABELS,
  AUDIENCE_EXAMPLES,
  GenerateRequest,
} from '@/lib/types'
import { Copy, Check, Loader2, Sparkles, ChevronDown, ArrowLeft, Zap, Shuffle } from 'lucide-react'

export default function AppPage() {
  // Form state
  const [medium, setMedium] = useState<Medium>('cold-email')
  const [audience, setAudience] = useState('')
  const [recipient, setRecipient] = useState('')
  const [recipientCompany, setRecipientCompany] = useState('')
  const [context, setContext] = useState('')
  const [history, setHistory] = useState<RelationshipHistory>('cold')
  const [goal, setGoal] = useState('')
  const [product, setProduct] = useState('')
  
  // UI state
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  // Check if form is valid
  const isValid = audience && medium && goal
  
  // Get random example
  function fillRandomExample() {
    const example = AUDIENCE_EXAMPLES[Math.floor(Math.random() * AUDIENCE_EXAMPLES.length)]
    setAudience(example)
  }
  
  async function handleGenerate() {
    if (!isValid) return
    
    setLoading(true)
    setError('')
    setOutput('')
    
    try {
      const request: GenerateRequest = {
        medium,
        audience,
        recipient: recipient || undefined,
        recipientCompany: recipientCompany || undefined,
        context,
        history,
        goal,
        product: product || undefined,
      }
      
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate')
      }
      
      setOutput(data.output)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  
  function copyToClipboard(text: string, index: number) {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }
  
  // Parse variations from output
  function parseVariations(text: string): string[] {
    const parts = text.split(/---\s*\n\*\*Variation \d+\*\*\n?/)
    return parts.filter(p => p.trim()).map(p => p.replace(/\n---\s*$/, '').trim())
  }
  
  const variations = output ? parseVariations(output) : []

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
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
              <span className="font-semibold text-lg">WriteHuman</span>
            </div>
          </div>
          <span className="text-sm text-[var(--color-text-muted)]">Generator</span>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          {/* Form Panel */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Generate Message</h1>
              <p className="text-[var(--color-text-secondary)]">
                Describe your audience and goal. We'll handle the rest.
              </p>
            </div>
            
            {/* Audience Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                  Who are you writing to?
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <button
                  type="button"
                  onClick={fillRandomExample}
                  className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Shuffle className="w-3 h-3" />
                  Example
                </button>
              </div>
              <textarea
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g., CFO at a Series B fintech, ex-investment banker, very numbers-driven"
                rows={2}
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors resize-none"
              />
              <p className="text-xs text-[var(--color-text-muted)]">
                Include role, background, what they care about, personality if known
              </p>
            </div>
            
            {/* Medium Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                Medium
              </label>
              <div className="relative">
                <select
                  value={medium}
                  onChange={(e) => setMedium(e.target.value as Medium)}
                  className="w-full appearance-none bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 pr-10 text-[var(--color-text)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors"
                >
                  {Object.entries(MEDIUM_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
              </div>
            </div>
            
            {/* Relationship History */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                Relationship
              </label>
              <div className="relative">
                <select
                  value={history}
                  onChange={(e) => setHistory(e.target.value as RelationshipHistory)}
                  className="w-full appearance-none bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 pr-10 text-[var(--color-text)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors"
                >
                  {Object.entries(HISTORY_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
              </div>
            </div>
            
            {/* Goal */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                Goal
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Book a 15-minute discovery call"
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors"
              />
            </div>
            
            {/* Context */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                Context
                <span className="text-[var(--color-text-muted)]"> (what do you know about them?)</span>
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g., They just raised Series B. LinkedIn shows they're hiring 5 engineers. Their CEO was on a podcast talking about scaling challenges."
                rows={3}
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors resize-none"
              />
            </div>
            
            {/* Advanced Toggle */}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              {showAdvanced ? 'Hide' : 'Show'} advanced options
            </button>
            
            {/* Advanced Options */}
            {showAdvanced && (
              <div className="space-y-4 pt-2">
                {/* Recipient */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                    Recipient Name
                    <span className="text-[var(--color-text-muted)]"> (optional)</span>
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="e.g., Sarah Johnson"
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors"
                  />
                </div>
                
                {/* Recipient Company */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                    Their Company
                    <span className="text-[var(--color-text-muted)]"> (optional)</span>
                  </label>
                  <input
                    type="text"
                    value={recipientCompany}
                    onChange={(e) => setRecipientCompany(e.target.value)}
                    placeholder="e.g., Acme Corp"
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors"
                  />
                </div>
                
                {/* Product/Offering */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                    What you're offering
                    <span className="text-[var(--color-text-muted)]"> (optional)</span>
                  </label>
                  <textarea
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="e.g., AI-powered expense management that saves finance teams 10 hours/week"
                    rows={2}
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors resize-none"
                  />
                </div>
              </div>
            )}
            
            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!isValid || loading}
              className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-bg)] font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate 3 Variations
                </>
              )}
            </button>
            
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>
          
          {/* Output Panel */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-[var(--color-text-secondary)]">
              Output
            </h2>
            
            {!output && !loading && (
              <div className="border border-dashed border-[var(--color-border)] rounded-xl p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-[var(--color-text-muted)]" />
                </div>
                <p className="text-[var(--color-text-muted)]">
                  Your generated messages will appear here
                </p>
              </div>
            )}
            
            {loading && (
              <div className="border border-[var(--color-border)] rounded-xl p-12 text-center bg-[var(--color-surface)]">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)] mx-auto mb-4" />
                <p className="text-[var(--color-text-secondary)]">
                  Generating your messages...
                </p>
              </div>
            )}
            
            {variations.length > 0 && (
              <div className="space-y-4">
                {variations.map((variation, index) => (
                  <div
                    key={index}
                    className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border-subtle)]">
                      <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                        Variation {index + 1}
                      </span>
                      <button
                        onClick={() => copyToClipboard(variation, index)}
                        className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="w-4 h-4 text-[var(--color-accent)]" />
                            <span className="text-[var(--color-accent)]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4">
                      <pre className="whitespace-pre-wrap font-sans text-[var(--color-text)] text-sm leading-relaxed">
                        {variation}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
