export type Genre = 
  | 'narrative'
  | 'expository'
  | 'persuasive'
  | 'instructional'
  | 'descriptive'
  | 'opinion'
  | 'analytical'
  | 'marketing'
  | 'dialogue'
  | 'social'

export type Relationship = 
  | 'new-contact'
  | 'some-history'
  | 'existing-relationship'

export interface GenerateRequest {
  genre: Genre
  audience: string
  recipient?: string
  recipientCompany?: string
  context: string
  relationship: Relationship
  goal: string
  product?: string
  proofPoints?: string[]
}

export interface RewriteRequest {
  draft: string
  fixes: string[]
  audience?: string
  genre?: Genre  // Optional: rewrite as a specific genre
}

export interface GenerateResponse {
  output: string
  error?: string
}

export const GENRE_LABELS: Record<Genre, string> = {
  'narrative': 'Narrative (case study, story, testimonial)',
  'expository': 'Expository (documentation, explainer, FAQ)',
  'persuasive': 'Persuasive (sales email, proposal, pitch)',
  'instructional': 'Instructional (how-to, tutorial, SOP)',
  'descriptive': 'Descriptive (product copy, UX writing)',
  'opinion': 'Opinion (LinkedIn post, reflection, thought leadership)',
  'analytical': 'Analytical (report, analysis, post-mortem)',
  'marketing': 'Marketing (landing page, ad, campaign)',
  'dialogue': 'Dialogue (script, chatbot, call script)',
  'social': 'Social (post, thread, microcontent)',
}

export const RELATIONSHIP_LABELS: Record<Relationship, string> = {
  'new-contact': 'New contact (never spoken)',
  'some-history': 'Some history (met or exchanged messages)',
  'existing-relationship': 'Existing relationship (work together)',
}

// Example audience descriptions to show users
export const AUDIENCE_EXAMPLES = [
  "CFO at a Series B fintech, ex-investment banker, very numbers-driven",
  "Engineering manager, 5 years at company, cares about team productivity",
  "Small business owner, runs a 20-person HVAC company, not technical",
  "VP Marketing at a D2C brand, came from performance marketing",
  "Procurement manager, risk-averse, needs to justify purchases to CFO",
  "Founder/CEO, technical background, moves fast, hates fluff",
]

export const REWRITE_OPTIONS = [
  { id: 'shorter', label: 'Make it shorter' },
  { id: 'human', label: 'Sound more human' },
  { id: 'cta', label: 'Stronger call to action' },
  { id: 'less-salesy', label: 'Less salesy' },
  { id: 'clearer', label: 'Clearer structure' },
  { id: 'conversational', label: 'More conversational' },
  { id: 'professional', label: 'More professional' },
  { id: 'simplify', label: 'Simplify language' },
  { id: 'break-up', label: 'Break up long sentences' },
]
