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
    'narrative': `
GENRE: NARRATIVE (case studies, stories, testimonials)

STRUCTURE:
1. Setup: Who, what situation, what challenge
2. Tension: What was at stake, what made it hard
3. Resolution: What changed, what they did
4. Result: Specific outcome, quantified if possible

CONSTRAINTS:
- Show, don't tell—use concrete details
- One protagonist (person or company)
- Specific numbers beat vague claims
- Keep it under 300 words for most formats
- End with the transformation, not the product`,

    'expository': `
GENRE: EXPOSITORY (documentation, explainers, FAQs)

STRUCTURE:
1. What it is (one sentence definition)
2. Why it matters (context, problem it solves)
3. How it works (steps or components)
4. Example (concrete illustration)

CONSTRAINTS:
- Lead with the answer, not the backstory
- One concept per section
- Use examples liberally
- Scannable: headers, short paragraphs
- Assume smart reader, no jargon knowledge`,

    'persuasive': `
GENRE: PERSUASIVE (sales emails, proposals, pitches)

STRUCTURE (Observation-Bridge-Proof):
1. Observation: Something specific about them
2. Bridge: Insight that reframes their situation
3. Proof: Someone similar + result
4. Ask: Soft CTA

CONSTRAINTS:
- Under 90 words for cold emails
- Lead with them, not you
- One clear ask
- No pleasantries ("I hope this finds you well")
- Teach them something new`,

    'instructional': `
GENRE: INSTRUCTIONAL (how-to, tutorials, SOPs)

STRUCTURE:
1. What you'll accomplish (outcome first)
2. What you need (prerequisites)
3. Steps (numbered, one action each)
4. Verification (how to know it worked)

CONSTRAINTS:
- Start each step with a verb
- One action per step
- Include the "why" briefly when non-obvious
- Anticipate failure points
- Keep steps under 2 sentences`,

    'descriptive': `
GENRE: DESCRIPTIVE (product copy, UX writing)

STRUCTURE:
1. What it is (concrete, not abstract)
2. What it does for them (benefit, not feature)
3. What makes it different (specifics)

CONSTRAINTS:
- Concrete nouns over abstract ones
- Benefits before features
- Specific beats clever
- If it sounds like marketing, rewrite it
- Read it out loud—does it sound human?`,

    'opinion': `
GENRE: OPINION (LinkedIn posts, reflections, thought leadership)

STRUCTURE:
1. Hook: Surprising claim or observation
2. Context: Why this matters now
3. Argument: Your take with evidence
4. Takeaway: What to do with this

CONSTRAINTS:
- One idea per post
- Take a real position (not "it depends")
- Personal experience beats abstract theory
- Short paragraphs (1-2 sentences for LinkedIn)
- End with engagement prompt or clear takeaway`,

    'analytical': `
GENRE: ANALYTICAL (reports, analysis, post-mortems)

STRUCTURE:
1. Bottom line up front (BLUF)
2. Key findings (3-5 max)
3. Evidence/data for each
4. Implications
5. Recommendations

CONSTRAINTS:
- Lead with the conclusion
- Numbers need context (vs. what?)
- Separate findings from interpretation
- Be explicit about uncertainty
- Clear recommendations, not just observations`,

    'marketing': `
GENRE: MARKETING (landing pages, ads, campaigns)

STRUCTURE:
1. Headline: Promise or problem
2. Subhead: How you deliver
3. Proof: Social proof or specifics
4. CTA: One clear action

CONSTRAINTS:
- One message per piece
- Benefit-first headlines
- Specific beats generic ("50% faster" not "blazing fast")
- Remove every word that doesn't earn its place
- CTA should be obvious and singular`,

    'dialogue': `
GENRE: DIALOGUE (scripts, chatbots, call scripts)

STRUCTURE:
1. Opening: Establish context/relationship
2. Discovery: Questions to understand
3. Substance: The actual exchange
4. Close: Clear next step

CONSTRAINTS:
- Write how people actually talk
- Short exchanges (2-3 sentences max per turn)
- Build in pauses and acknowledgments
- Include branch points for different responses
- Read it out loud—does it flow?`,

    'social': `
GENRE: SOCIAL (posts, threads, microcontent)

STRUCTURE:
1. Hook: First line must stop the scroll
2. Value: The actual content
3. Engagement: Question or prompt

CONSTRAINTS:
- Front-load the hook (it's all they see in feed)
- One idea per post
- Short paragraphs (1-2 lines)
- Generous whitespace
- No hashtag spam (0-3 max, at end)
- 150-280 words ideal for LinkedIn`,
  }
  
  return constraints[genre] || ''
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

${getGenreConstraints(input.genre)}

${getToneGuidance(input.relationship)}
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

[Content]

---
**Variation 2**

[Content]

---
**Variation 3**

[Content]

---
`.trim()

  return prompt
}

// Rewrite prompt builder
export interface BuildRewritePromptInput {
  draft: string
  fixes: string[]
  audience?: string
  genre?: Genre
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
      case 'conversational': return '- Make it more conversational. Like talking to a friend or colleague.'
      case 'professional': return '- Make it more professional. Appropriate for formal business contexts.'
      case 'simplify': return '- Simplify the language. Use shorter, more common words.'
      case 'break-up': return '- Break up long sentences into shorter ones. No sentence over 20 words.'
      default: return ''
    }
  }).filter(Boolean).join('\n')

  // If genre is specified, add genre-specific guidance
  const genreSection = input.genre ? `
REWRITE AS: ${input.genre}
${getGenreConstraints(input.genre)}
` : ''

  const prompt = `
You are a skilled editor. Rewrite the following draft to make it better.

ORIGINAL DRAFT:
${input.draft}

${input.audience ? `AUDIENCE: ${input.audience}` : ''}
${genreSection}
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
