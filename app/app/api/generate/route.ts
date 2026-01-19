import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildPrompt } from '@/lib/buildPrompt'
import { GenerateRequest } from '@/lib/types'

const anthropic = new Anthropic()

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json()
    
    // Validate required fields
    if (!body.audience || !body.medium || !body.goal) {
      return NextResponse.json(
        { error: 'Missing required fields: audience, medium, and goal are required' },
        { status: 400 }
      )
    }
    
    // Build the prompt
    const prompt = buildPrompt({
      medium: body.medium,
      audience: body.audience,
      recipient: body.recipient,
      recipientCompany: body.recipientCompany,
      context: body.context || '',
      history: body.history,
      goal: body.goal,
      product: body.product,
      proofPoints: body.proofPoints,
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
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate message' },
      { status: 500 }
    )
  }
}
