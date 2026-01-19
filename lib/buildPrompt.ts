import { Medium, RelationshipHistory } from './types'

const DEFAULT_BANNED_WORDS = [
  'additionally',
  'therefore',
  'however',
  'in conclusion',
  'furthermore',
  'moreover',
  'crucial',
  'cutting-edge',
  'leverage',
  'synergy',
  'streamline',
  'revolutionize',
  'game-changer',
  'unlock',
  'empower',
  'delighted',
  'excited to share',
  'I hope this finds you well',
  'just following up',
  'circling back',
  'best-in-class',
  'robust',
  'scalable',
  'end-to-end',
  'align',
  'drive results',
  'partnership',
  'reach out',
  'thrilled',
  'passionate about',
  'deep dive',
  'move the needle',
  'low-hanging fruit',
  'wheelhouse',
  'bandwidth',
  'circle back',
  'take this offline',
  'happy to help',
  'per my last email',
  'as per our conversation',
  'touching base',
]

function getMediumConstraints(medium: Medium): string {
  const constraints: Record<Medium, string> = {
    'cold-email': `
CONSTRAINTS:
- Under 90 words total (81% of emails are read on mobile—don't make them scroll)
- 1-3 sentences per paragraph max
- Generous whitespace between paragraphs
- No pleasantries (no "I hope this finds you well")
- Soft CTA (e.g., "Open to hearing how?" or "Worth a look?")

SUBJECT LINE RULES:
- Boring = curiosity. Salesy = delete.
- Keep it short (1-4 words ideal)
- Reference something specific about them
- Should sound like it could be from a colleague
- Examples: "your I-85 routes", "driver hours", "quick thought on [specific thing]"
- NEVER: "How to supercharge your pipeline in 90 days" (screams pitch)`,
    
    'follow-up-email': `
CONSTRAINTS:
- Under 75 words total
- Reference the previous touch briefly
- Add one new insight or piece of value
- 1-3 sentences per paragraph`,
    
    'email-reply': `
CONSTRAINTS:
- Match the length of their email (± 20%)
- Answer their question in the first sentence
- Then advance the conversation
- End with a clear next step`,
    
    'linkedin-connection': `
CONSTRAINTS:
- Under 300 characters total
- No pitch whatsoever
- Just be human
- Give a reason for connecting`,
    
    'linkedin-dm': `
CONSTRAINTS:
- Under 50 words
- Very conversational
- No selling on first touch
- One simple ask or none at all`,
    
    'presentation-slides': `
CONSTRAINTS:
- 6-8 words max per headline
- One idea per slide
- Fragments only—no full sentences in bullets
- Headlines should tell the story if read in sequence`,
    
    'voicemail': `
CONSTRAINTS:
- Under 30 seconds when spoken
- One hook
- One question
- Leave your number twice`,
    
    'executive-summary': `
CONSTRAINTS:
- 3-5 short paragraphs
- Lead with their problem
- End with clear next step
- No fluff`,
    
    'proposal': `
CONSTRAINTS:
- Reflect their words back to them
- Quantified outcomes
- Clear pricing/timeline
- No jargon`,
    
    'casual-message': `
CONSTRAINTS:
- No strict rules
- Just sound like a human
- Match the tone of the relationship`,
  }
  
  return constraints[medium] || ''
}

function getStructure(medium: Medium, history: RelationshipHistory): string {
  // Cold outreach uses Observation-Bridge-Proof
  if (history === 'cold' && ['cold-email', 'linkedin-dm', 'linkedin-connection'].includes(medium)) {
    return `
STRUCTURE TO USE (Observation-Bridge-Proof):
1. [Specific observation about their business—proves you did research]
2. [Bridge: Share an insight that teaches them something new or reframes their situation]
3. [Social proof: Someone at Company + result, without dwelling on pain/cost]
4. [Soft ask: "Open to hearing how?" or "Worth a look?"]

KEY PRINCIPLE: Humans are naturally eager to learn & solve problems. Teach them something—a new way to think about their challenge, a data point they didn't know, or an insight from a similar company.`
  }
  
  // Follow-ups use Insight-Implication-Invitation
  if (medium === 'follow-up-email' || medium === 'voicemail') {
    return `
STRUCTURE TO USE (Insight-Implication-Invitation):
1. [One insight relevant to them]
2. [What it means for their situation]
3. [Simple invitation to continue conversation]`
  }
  
  // Replies use Answer-Advance
  if (medium === 'email-reply') {
    return `
STRUCTURE TO USE (Answer-Advance):
1. [Answer their question in the first sentence]
2. [Brief context if needed]
3. [One new piece of value or insight]
4. [Clear next step or question]`
  }
  
  // Presentations and proposals use Problem-Proof-Path
  if (['presentation-slides', 'proposal', 'executive-summary'].includes(medium)) {
    return `
STRUCTURE TO USE (Problem-Proof-Path):
1. [Their problem stated in their words]
2. [Evidence it's solvable—specific example or data]
3. [What the path forward looks like]`
  }
  
  return ''
}

function getToneGuidance(history: RelationshipHistory): string {
  const tones: Record<RelationshipHistory, string> = {
    'cold': `
TONE:
- Curious peer who noticed something
- Offering perspective, not pitching
- Calm confidence, not eager or salesy`,
    
    'warm': `
TONE:
- Familiar—reference past interaction
- Build on what they've already seen
- Helpful, not pushy`,
    
    'active-opportunity': `
TONE:
- Direct partner
- Focused on their timeline and decision
- Consultative, not desperate`,
    
    'customer': `
TONE:
- Trusted advisor
- Their success is your success
- Proactive, not reactive`,
    
    'expansion': `
TONE:
- Appreciative of the relationship
- Acknowledge what's working before suggesting more
- Helpful, not greedy`,
  }
  
  return tones[history] || ''
}

export interface BuildPromptInput {
  medium: Medium
  audience: string
  recipient?: string
  recipientCompany?: string
  context: string
  history: RelationshipHistory
  goal: string
  product?: string
  proofPoints?: string[]
}

export function buildPrompt(input: BuildPromptInput): string {
  const bannedWords = DEFAULT_BANNED_WORDS
  
  // Build the audience section
  const audienceSection = `
WHO YOU'RE WRITING TO:
${input.recipient ? `- Name: ${input.recipient}` : ''}
${input.recipientCompany ? `- Company: ${input.recipientCompany}` : ''}
- Audience: ${input.audience}

WHAT YOU KNOW ABOUT THEM:
${input.context || '(No specific context provided)'}
`

  // Build product section if provided
  const productSection = input.product ? `
WHAT YOU'RE OFFERING:
${input.product}
` : ''

  // Build proof points section if provided
  const proofSection = input.proofPoints && input.proofPoints.length > 0 ? `
PROOF POINTS YOU CAN REFERENCE (use sparingly, pick the most relevant):
${input.proofPoints.map(p => `- ${p}`).join('\n')}
` : ''

  const prompt = `
You are a skilled business writer. Write in a natural, human voice—not like AI.
${audienceSection}
${productSection}
RELATIONSHIP: ${input.history}
GOAL: ${input.goal}

MEDIUM: ${input.medium}
${getMediumConstraints(input.medium)}

${getToneGuidance(input.history)}

${getStructure(input.medium, input.history)}
${proofSection}

WRITING RULES (apply to everything):

Language:
- Plain English a 6th grader could understand (54% of adults read below this level)
- Short words over long ones: use not utilize, help not facilitate, start not commence, buy not purchase, end not terminate
- Keep subject and verb close together—don't separate them with long clauses
- Keep modifiers next to what they modify (dependency grammar)
- Use contractions naturally (don't, you'll, we're, it's, can't)

Sentences & Rhythm:
- Aim for 8-15 words per sentence on average (Flesch 80+)
- Mix short punchy sentences with medium ones
- Never 3+ long sentences (20+ words) in a row—break them up
- Short paragraphs for digital reading (1-4 sentences max)

Voice & Tone:
- Active voice only: "We found X" not "X was found"
- No adverbs (or very sparingly)—show don't tell
- Calm confidence—helpful, not salesy or eager
- Sound like an experienced practitioner explaining to a peer, not a textbook

Transitions:
- Use natural connectors: So, But, And, Plus, That said, Here's the thing
- Avoid academic transitions: moreover, furthermore, additionally, thus, hence, therefore, in conclusion

NEVER USE THESE WORDS/PHRASES:
${bannedWords.join(', ')}

OUTPUT:
Generate 3 variations. Each should feel like a different person wrote it—same core message, different voice and approach.

Format each variation clearly:

---
**Variation 1**
[Subject line if applicable]

[Body]

---
**Variation 2**
[Subject line if applicable]

[Body]

---
**Variation 3**
[Subject line if applicable]

[Body]

---
`.trim()

  return prompt
}
