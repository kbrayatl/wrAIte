# OutreachAI

A complete SaaS application for generating high-converting outreach messages using Claude AI. Includes a public marketing site, login flow, and generator app. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Marketing landing page** at `/` with pricing, features, and social proof
- **Login/signup flow** at `/login` (demo mode for MVP)
- **Generator app** at `/app` with the full message generator
- **Privacy & Terms pages** at `/privacy` and `/terms`
- **Multiple personas**: Switch between Motive SAE and Personal outreach modes
- **Multiple mediums**: Cold email, LinkedIn, follow-ups, presentations, and more
- **Framework-driven**: Uses proven structures like Observation-Bridge-Proof
- **Clean output**: No jargon, no buzzwords, just clear human writing
- **3 variations**: Each generation gives you 3 different approaches

## Pages

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page |
| `/login` | Login/signup (demo redirects to app) |
| `/app` | Message generator tool |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Anthropic API key

Create a `.env.local` file in the root directory:

```
ANTHROPIC_API_KEY=your_api_key_here
```

Get your API key from [console.anthropic.com](https://console.anthropic.com/)

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push this code to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Add your `ANTHROPIC_API_KEY` in the Environment Variables section
4. Deploy

## Adding New Companies/Personas

Edit the files in `/config/companies/`:

1. Create a new file like `acme.ts`:

```typescript
import { CompanyConfig } from '@/lib/types'

export const acmeConfig: CompanyConfig = {
  id: 'acme',
  companyName: 'Acme Corp',
  product: 'Your product description',
  personas: [
    {
      id: 'buyer',
      name: 'Buyer Persona',
      description: 'Who they are',
      painPoints: ['pain 1', 'pain 2'],
      language: ['term 1', 'term 2'],
    },
  ],
  proofPoints: [
    { result: 'Result achieved', industry: 'Industry' },
  ],
  bannedWords: ['words', 'to', 'avoid'],
}
```

2. Add it to `/config/companies/index.ts`:

```typescript
import { acmeConfig } from './acme'

export const companies: Record<string, CompanyConfig> = {
  motive: motiveConfig,
  personal: personalConfig,
  acme: acmeConfig, // Add here
}
```

## Project Structure

```
/app
  /api/generate/route.ts  - API endpoint that calls Claude
  /page.tsx               - Main form UI
  /layout.tsx             - Root layout
  /globals.css            - Global styles
  
/config
  /companies
    /index.ts             - Company registry
    /motive.ts            - Motive config
    /personal.ts          - Personal outreach config
    
/lib
  /types.ts               - TypeScript types
  /buildPrompt.ts         - Prompt construction logic
```

## Customization

### Modify the framework

Edit `/lib/buildPrompt.ts` to change:
- Banned words
- Message structures
- Tone guidance
- Medium constraints

### Add new mediums

1. Add the medium to the `Medium` type in `/lib/types.ts`
2. Add constraints in `getMediumConstraints()` in `/lib/buildPrompt.ts`
3. Add a label in `MEDIUM_LABELS` in `/lib/types.ts`

## Cost

Claude API costs approximately $0.01-0.05 per generation depending on output length. At 1,000 generations/month, expect ~$10-50 in API costs.

## Security Notes

This is a Level 1/2 implementation:
- No user data is stored
- Inputs go directly to Claude and back
- Nothing persists after the session

For enterprise deployments, consider:
- Adding authentication
- Letting customers bring their own API key
- Self-hosted deployment options

## License

MIT
