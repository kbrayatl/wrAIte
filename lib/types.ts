export type Genre = 
  | 'cold-email'
  | 'follow-up-email'
  | 'linkedin-message'
  | 'linkedin-post'
  | 'sales-proposal'
  | 'executive-summary'
  | 'explanation'
  | 'meeting-recap'
  | 'internal-update'

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
}

export interface GenerateResponse {
  output: string
  error?: string
}

export const GENRE_LABELS: Record<Genre, string> = {
  'cold-email': 'Cold Email',
  'follow-up-email': 'Follow-up Email',
  'linkedin-message': 'LinkedIn Message',
  'linkedin-post': 'LinkedIn Post',
  'sales-proposal': 'Sales Proposal',
  'executive-summary': 'Executive Summary',
  'explanation': 'Explanation / How-To',
  'meeting-recap': 'Meeting Recap',
  'internal-update': 'Internal Update',
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
]
