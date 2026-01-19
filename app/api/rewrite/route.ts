import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildRewritePrompt } from '@/lib/buildPrompt'
import { RewriteRequest } from '@/lib/types'

const anthropic = new Anthropic()

export async function POST(request: NextRequest) {
  try {
    const body: RewriteRequest = await request.json()
    
    // Validate required fields
    if (!body.draft || !body.fixes || body.fixes.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: draft and at least one fix option are required' },
        { status: 400 }
      )
    }
    
    // Build the prompt
    const prompt = buildRewritePrompt({
      draft: body.draft,
      fixes: body.fixes,
      audience: body.audience,
      genre: body.genre,
    })
    
    // Call Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })
    
    // Extract text from response
    const textContent = response.content.find(block => block.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      return NextResponse.json(
        { error: 'No text response from Claude' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      output: textContent.text,
    })
    
  } catch (error) {
    console.error('Rewrite error:', error)
    return NextResponse.json(
      { error: 'Failed to rewrite message' },
      { status: 500 }
    )
  }
}
