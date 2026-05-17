import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

type Provider = 'claude' | 'openai'

function getProvider(): Provider {
  const val = process.env.AI_PROVIDER ?? 'claude'
  return val === 'openai' ? 'openai' : 'claude'
}

export async function chat(systemPrompt: string, userMessage: string): Promise<string> {
  const provider = getProvider()

  if (provider === 'openai') {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 2048,
    })
    return response.choices[0]?.message?.content ?? ''
  }

  // Default: claude
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  })
  const block = message.content[0]
  if (block?.type === 'text') {
    return block.text
  }
  return ''
}
