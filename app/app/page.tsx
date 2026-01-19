'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Genre, 
  Relationship, 
  GENRE_LABELS, 
  RELATIONSHIP_LABELS,
  AUDIENCE_EXAMPLES,
  REWRITE_OPTIONS,
  GenerateRequest,
  RewriteRequest,
} from '@/lib/types'
import { Copy, Check, Loader2, Sparkles, ChevronDown, ArrowLeft, Shuffle, PenLine } from 'lucide-react'

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

type Mode = 'generate' | 'rewrite'

export default function AppPage() {
  // Mode state
  const [mode, setMode] = useState<Mode>('generate')
  
  // Generate form state
  const [genre, setGenre] = useState<Genre>('persuasive')
  const [audience, setAudience] = useState('')
  const [recipient, setRecipient] = useState('')
  const [recipientCompany, setRecipientCompany] = useState('')
  const [context, setContext] = useState('')
  const [relationship, setRelationship] = useState<Relationship>('new-contact')
  const [goal, setGoal] = useState('')
  const [product, setProduct] = useState('')
  
  // Rewrite form state
  const [draft, setDraft] = useState('')
  const [fixes, setFixes] = useState<string[]>(['shorter', 'human'])
  const [rewriteAudience, setRewriteAudience] = useState('')
  const [rewriteGenre, setRewriteGenre] = useState<Genre | ''>('')
  
  // UI state
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  // Check if forms are valid
  const isGenerateValid = audience && genre && goal
  const isRewriteValid = draft && fixes.length > 0
  
  // Get random example
  function fillRandomExample() {
    const example = AUDIENCE_EXAMPLES[Math.floor(Math.random() * AUDIENCE_EXAMPLES.length)]
    setAudience(example)
  }
  
  // Toggle fix option
  function toggleFix(fixId: string) {
    setFixes(prev => 
      prev.includes(fixId) 
        ? prev.filter(f => f !== fixId)
        : [...prev, fixId]
    )
  }
  
  async function handleGenerate() {
    if (!isGenerateValid) return
    
    setLoading(true)
    setError('')
    setOutput('')
    
    try {
      const request: GenerateRequest = {
        genre,
        audience,
        recipient: recipient || undefined,
        recipientCompany: recipientCompany || undefined,
        context,
        relationship,
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
  
  async function handleRewrite() {
    if (!isRewriteValid) return
    
    setLoading(true)
    setError('')
    setOutput('')
    
    try {
      const request: RewriteRequest = {
        draft,
        fixes,
        audience: rewriteAudience || undefined,
        genre: rewriteGenre || undefined,
      }
      
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to rewrite')
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
    const parts = text.split(/---\s*\n\*\*(Variation|Version) \d+\*\*\n?/)
    return parts.filter(p => p.trim() && p !== 'Variation' && p !== 'Version').map(p => p.replace(/\n---\s*$/, '').trim())
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
            <Logo className="text-xl" />
          </div>
          
          {/* Mode Tabs */}
          <div className="flex items-center gap-1 bg-[var(--color-bg)] rounded-lg p-1">
            <button
              onClick={() => setMode('generate')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'generate' 
                  ? 'bg-[var(--color-surface)] text-[var(--color-text)]' 
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Generate
            </button>
            <button
              onClick={() => setMode('rewrite')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'rewrite' 
                  ? 'bg-[var(--color-surface)] text-[var(--color-text)]' 
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <PenLine className="w-4 h-4" />
              Rewrite
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          {/* Form Panel */}
          <div className="space-y-6">
            {mode === 'generate' ? (
              // Generate Mode
              <>
                <div>
                  <h1 className="text-2xl font-semibold mb-2">Generate New</h1>
                  <p className="text-[var(--color-text-secondary)]">
                    Describe your audience and goal. We'll handle the rest.
                  </p>
                </div>
                
                {/* Genre Select */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                    What are you writing?
                  </label>
                  <div className="relative">
                    <select
                      value={genre}
                      onChange={(e) => setGenre(e.target.value as Genre)}
                      className="w-full appearance-none bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 pr-10 text-[var(--color-text)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors"
                    >
                      {Object.entries(GENRE_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
                  </div>
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
                    Role, background, what they care about
                  </p>
                </div>
                
                {/* Relationship */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                    How do you know them?
                  </label>
                  <div className="relative">
                    <select
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value as Relationship)}
                      className="w-full appearance-none bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 pr-10 text-[var(--color-text)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors"
                    >
                      {Object.entries(RELATIONSHIP_LABELS).map(([value, label]) => (
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
                    placeholder="e.g., Book a 15-minute call"
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
                    placeholder="e.g., They just raised Series B. Hiring engineers. CEO mentioned scaling challenges on a podcast."
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
                  disabled={!isGenerateValid || loading}
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
              </>
            ) : (
              // Rewrite Mode
              <>
                <div>
                  <h1 className="text-2xl font-semibold mb-2">Rewrite Draft</h1>
                  <p className="text-[var(--color-text-secondary)]">
                    Paste your draft. We'll make it better.
                  </p>
                </div>
                
                {/* Draft Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                    Your draft
                    <span className="text-red-400 ml-1">*</span>
                  </label>
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Paste the text you want to improve..."
                    rows={6}
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors resize-none"
                  />
                </div>
                
                {/* Fix Options */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                    What should we fix?
                    <span className="text-red-400 ml-1">*</span>
                  </label>
                  <div className="space-y-2">
                    {REWRITE_OPTIONS.map(option => (
                      <label 
                        key={option.id}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={fixes.includes(option.id)}
                          onChange={() => toggleFix(option.id)}
                          className="w-4 h-4 rounded border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent)] focus:ring-[var(--color-accent)] focus:ring-offset-0"
                        />
                        <span className="text-[var(--color-text)]">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Audience (optional) */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                    Who's reading this?
                    <span className="text-[var(--color-text-muted)]"> (optional)</span>
                  </label>
                  <input
                    type="text"
                    value={rewriteAudience}
                    onChange={(e) => setRewriteAudience(e.target.value)}
                    placeholder="e.g., Engineering manager, technical, busy"
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors"
                  />
                </div>
                
                {/* Genre (optional) */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                    Rewrite as:
                    <span className="text-[var(--color-text-muted)]"> (optional)</span>
                  </label>
                  <div className="relative">
                    <select
                      value={rewriteGenre}
                      onChange={(e) => setRewriteGenre(e.target.value as Genre | '')}
                      className="w-full appearance-none bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 pr-10 text-[var(--color-text)] focus:border-[var(--color-accent)] focus:ring-0 transition-colors"
                    >
                      <option value="">Keep original format</option>
                      {Object.entries(GENRE_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
                  </div>
                </div>
                
                {/* Rewrite Button */}
                <button
                  onClick={handleRewrite}
                  disabled={!isRewriteValid || loading}
                  className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-bg)] font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Rewriting...
                    </>
                  ) : (
                    <>
                      <PenLine className="w-5 h-5" />
                      Rewrite
                    </>
                  )}
                </button>
              </>
            )}
            
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
                  {mode === 'generate' ? (
                    <Sparkles className="w-6 h-6 text-[var(--color-text-muted)]" />
                  ) : (
                    <PenLine className="w-6 h-6 text-[var(--color-text-muted)]" />
                  )}
                </div>
                <p className="text-[var(--color-text-muted)]">
                  {mode === 'generate' 
                    ? 'Your generated messages will appear here'
                    : 'Your rewritten versions will appear here'
                  }
                </p>
              </div>
            )}
            
            {loading && (
              <div className="border border-[var(--color-border)] rounded-xl p-12 text-center bg-[var(--color-surface)]">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)] mx-auto mb-4" />
                <p className="text-[var(--color-text-secondary)]">
                  {mode === 'generate' ? 'Generating...' : 'Rewriting...'}
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
                        {mode === 'generate' ? `Variation ${index + 1}` : `Version ${index + 1}`}
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
