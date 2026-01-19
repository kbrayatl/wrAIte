export type Medium = 
  | 'cold-email'
  | 'follow-up-email'
  | 'email-reply'
  | 'linkedin-connection'
  | 'linkedin-dm'
  | 'presentation-slides'
  | 'voicemail'
  | 'executive-summary'
  | 'proposal'
  | 'casual-message'

export type RelationshipHistory = 
  | 'cold'
  | 'warm'
  | 'active-opportunity'
  | 'customer'
  | 'expansion'

export interface GenerateRequest {
  medium: Medium
  audience: string          // Free-form description of who you're writing to
  recipient?: string        // Optional name
  recipientCompany?: string // Optional company
  context: string           // What you know about them
  history: RelationshipHistory
  goal: string
  // Optional: what you're selling/offering (if applicable)
  product?: string
  proofPoints?: string[]
}

export interface GenerateResponse {
  output: string
  error?: string
}

export const MEDIUM_LABELS: Record<Medium, string> = {
  'cold-email': 'Cold Email',
  'follow-up-email': 'Follow-up Email',
  'email-reply': 'Email Reply',
  'linkedin-connection': 'LinkedIn Connection Request',
  'linkedin-dm': 'LinkedIn DM',
  'presentation-slides': 'Presentation Slides',
  'voicemail': 'Voicemail Script',
  'executive-summary': 'Executive Summary',
  'proposal': 'Proposal / Business Case',
  'casual-message': 'Casual Message',
}

export const HISTORY_LABELS: Record<RelationshipHistory, string> = {
  'cold': 'Cold (no prior contact)',
  'warm': 'Warm (some engagement)',
  'active-opportunity': 'Active Opportunity (in sales cycle)',
  'customer': 'Current Customer',
  'expansion': 'Expansion Opportunity',
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
