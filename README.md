# wrAIte

AI-powered business writing that sounds like you wrote it. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **10 Genre Framework**: Narrative, Expository, Persuasive, Instructional, Descriptive, Opinion, Analytical, Marketing, Dialogue, Social
- **Generate Mode**: Create new content from scratch with audience targeting
- **Rewrite Mode**: Paste your draft, we make it better
- **Framework-Driven**: Uses proven structures and writing rules
- **No AI Slop**: 40+ banned words and phrases that scream "AI wrote this"
- **3 Variations**: Each generation gives you different approaches

## Pages

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page |
| `/login` | Login/signup (demo redirects to app) |
| `/app` | Generator & rewriter tool |
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

## The 10 Genres

| Genre | Use For |
|-------|---------|
| **Narrative** | Case studies, stories, testimonials |
| **Expository** | Documentation, explainers, FAQs |
| **Persuasive** | Sales emails, proposals, pitches |
| **Instructional** | How-to guides, tutorials, SOPs |
| **Descriptive** | Product copy, UX writing |
| **Opinion** | LinkedIn posts, thought leadership |
| **Analytical** | Reports, analysis, post-mortems |
| **Marketing** | Landing pages, ads, campaigns |
| **Dialogue** | Scripts, chatbots, call scripts |
| **Social** | Posts, threads, microcontent |

## Project Structure

```
/app
  /api/generate/route.ts  - Generate API endpoint
  /api/rewrite/route.ts   - Rewrite API endpoint
  /app/page.tsx           - Generator UI
  /page.tsx               - Landing page
  /layout.tsx             - Root layout
  /globals.css            - Global styles
    
/lib
  /types.ts               - TypeScript types
  /buildPrompt.ts         - Prompt construction logic
```

## Customization

### Modify the framework

Edit `/lib/buildPrompt.ts` to change:
- Banned words
- Genre structures and constraints
- Tone guidance
- Writing rules

### Add new genres

1. Add the genre to the `Genre` type in `/lib/types.ts`
2. Add constraints in `getGenreConstraints()` in `/lib/buildPrompt.ts`
3. Add a label in `GENRE_LABELS` in `/lib/types.ts`

## Writing Rules (Built In)

- Plain English (6th grade reading level)
- Short words: use not utilize, help not facilitate
- 8-15 words per sentence average
- Active voice only
- No adverbs
- Natural transitions (So, But, And)
- 40+ banned corporate buzzwords

## Cost

Claude API costs approximately $0.01-0.05 per generation depending on output length.

## Security

- No user data is stored
- Inputs go directly to Claude and back
- Nothing persists after the session

## License

MIT
