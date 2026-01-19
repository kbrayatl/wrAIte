import { Genre, Relationship } from './types'

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

function getGenreConstraints(genre: Genre): string {
  const constraints: Record<Genre, string> = {
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
- Examples: "your I-85 routes", "quick thought", "one question"
- NEVER: "How to supercharge your pipeline in 90 days" (screams pitch)`,
    
    'follow-up-email': `
CONSTRAINTS:
- Under 75 words total
- Reference the previous touch briefly
- Add one new insight or piece of value
- 1-3 sentences per paragraph
- Don't guilt them for not replying`,
    
    'linkedin-message': `
CONSTRAINTS:
- Under 100 words
- Very conversational tone
- No selling on first touch
- One simple ask or none at all
- Feels like a message from a peer, not a pitch`,
    
    'linkedin-post': `
CONSTRAINTS:
- Hook in the first line (this shows in feed preview)
- Short paragraphs (1-2 sentences max)
- Generous line breaks for scannability
- End with engagement prompt or clear takeaway
- No hashtag spam (0-3 max, at end if any)
- 150-300 words ideal`,
    
    'sales-proposal': `
CONSTRAINTS:
- Lead with their problem stated in their words
- Reflect language from your conversations
- Quantified outcomes where possible
- Clear pricing/timeline section
- No jargon—they'll share this internally`,
    
    'executive-summary': `
CONSTRAINTS:
- 3-5 short paragraphs
- Lead with the bottom line / recommendation
- Support with 2-3 key points
- End with clear next step
- No fluff—executives skim`,
    
    'explanation': `
CONSTRAINTS:
- Start with what it is in one sentence
- Then why it matters
- Then how it works (steps or breakdown)
- Use examples to illustrate
- Short paragraphs, clear structure`,
    
    'meeting-recap': `
CONSTRAINTS:
- Lead with key decisions/outcomes
- Then action items with owners
- Then any open questions
- Keep it scannable—bullets are fine here
- Send within 24 hours context`,
    
    'internal-update': `
CONSTRAINTS:
- Lead with the headline/status
- Then context if needed
- Then what's next
- Keep it brief—respect their time
- Clear if any action is needed from them`,
  }
  
  return constraints[genre] || ''
}

function getStructure(genre: Genre, relationship: Relationship): string {
  // Cold outreach uses Observation-Bridge-Proof
  if (relationship === 'new-contact' && ['cold-email', 'linkedin-message'].includes(genre)) {
    return `
STRUCTURE TO USE (Observation-Bridge-Proof):
1. [Specific observation about their business—proves you did research]
2. [Bridge: Share an insight that teaches them something new or reframes their situation]
3. [Social proof: Someone similar + result, without dwelling on pain]
4. [Soft ask: "Open to hearing how?" or "Worth a look?"]

KEY PRINCIPLE: Teach them something—a new way to think about their challenge, a data point they didn't know, or an insight from a similar situation.`
  }
  
  // Follow-ups use Insight-Implication-Invitation
  if (genre === 'follow-up-email') {
    return `
STRUCTURE TO USE (Insight-Implication-Invitation):
1. [One new insight relevant to them—not just "checking in"]
2. [What it means for their situation]
3. [Simple invitation to continue conversation]`
  }
  
  // LinkedIn posts use Hook-Story-Insight
  if (genre === 'linkedin-post') {
    return `
STRUCTURE TO USE (Hook-Story-Insight):
1. [Hook: Surprising claim, question, or story fragment in first line]
2. [Context: Set up the situation briefly]
3. [Story/Example: What happened, what you learned]
4. [Insight: The takeaway or lesson]
5. [Engagement: Question or prompt for comments]`
  }
  
  // Proposals use Problem-Proof-Path
  if (['sales-proposal', 'executive-summary'].includes(genre)) {
    return `
STRUCTURE TO USE (Problem-Proof-Path):
1. [Their problem stated in their words]
2. [Evidence it's solvable—specific example or data]
3. [What the path forward looks like]
4. [Clear next step]`
  }
  
  // Explanations use What-Why-How
  if (genre === 'explanation') {
    return `
STRUCTURE TO USE (What-Why-How):
1. [What: Define it in one clear sentence]
2. [Why: Why it matters or why now]
3. [How: Break down the steps or components]
4. [Example: Concrete illustration]`
  }
  
  return ''
}

function getToneGuidance(relationship: Relationship): string {
  const tones: Record<Relationship, string> = {
    'new-contact': `
TONE:
- Curious peer who noticed something
- Offering perspective, not pitching
- Calm confidence, not eager or salesy
- Respectful of their time`,
    
    'some-history': `
TONE:
- Familiar but not presumptuous
- Reference your shared context naturally
- Helpful, not pushy
- Build on what you've already discussed`,
    
    'existing-relationship': `
TONE:
- Direct and efficient
- You know each other—skip the warm-up
- Collaborative, like talking to a teammate
- Can be more casual`,
  }
  
  return tones[relationship] || ''
}

export interface BuildPromptInput {
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
RELATIONSHIP: ${input.relationship}
GOAL: ${input.goal}

GENRE: ${input.genre}
${getGenreConstraints(input.genre)}

${getToneGuidance(input.relationship)}

${getStructure(input.genre, input.relationship)}
${proofSection}

WRITING RULES (apply to everything):

Language:
- Plain English a 6th grader could understand (54% of adults read below this level)
- Short words over long ones: use not utilize, help not facilitate, start not commence, buy not purchase, end not terminate
- Keep subject and verb close together—don't separate them with long clauses
- Keep modifiers next to what they modify
- Use contractions naturally (don't, you'll, we're, it's, can't)

Sentences & Rhythm:
- Aim for 8-15 words per sentence on average
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

// Rewrite prompt builder
export interface BuildRewritePromptInput {
  draft: string
  fixes: string[]
  audience?: string
}

export function buildRewritePrompt(input: BuildRewritePromptInput): string {
  const bannedWords = DEFAULT_BANNED_WORDS
  
  const fixInstructions = input.fixes.map(fix => {
    switch(fix) {
      case 'shorter': return '- Make it significantly shorter. Cut ruthlessly.'
      case 'human': return '- Make it sound more human and natural. Less corporate.'
      case 'cta': return '- Add or strengthen the call to action. Make it clear what you want them to do.'
      case 'less-salesy': return '- Remove salesy language. More helpful, less pitchy.'
      case 'clearer': return '- Improve the structure. Make it easier to follow.'
      default: return ''
    }
  }).filter(Boolean).join('\n')

  const prompt = `
You are a skilled editor. Rewrite the following draft to make it better.

ORIGINAL DRAFT:
${input.draft}

${input.audience ? `AUDIENCE: ${input.audience}` : ''}

WHAT TO FIX:
${fixInstructions}

WRITING RULES (apply to the rewrite):

Language:
- Plain English a 6th grader could understand
- Short words over long ones: use not utilize, help not facilitate, start not commence
- Keep subject and verb close together
- Use contractions naturally (don't, you'll, we're, it's)

Sentences & Rhythm:
- Aim for 8-15 words per sentence on average
- Mix short punchy sentences with medium ones
- Short paragraphs (1-4 sentences max)

Voice & Tone:
- Active voice only: "We found X" not "X was found"
- No adverbs—show don't tell
- Calm confidence—helpful, not salesy

Transitions:
- Use natural connectors: So, But, And, Plus, That said
- Avoid: moreover, furthermore, additionally, thus, hence

NEVER USE THESE WORDS/PHRASES:
${bannedWords.join(', ')}

OUTPUT:
Provide 2 rewritten versions. Each takes a slightly different approach.

---
**Version 1**

[Rewritten text]

---
**Version 2**

[Rewritten text]

---
`.trim()

  return prompt
}
