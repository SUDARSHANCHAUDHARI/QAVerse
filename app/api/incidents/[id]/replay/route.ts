import { NextResponse } from 'next/server'
import { incidents } from '@/lib/store'
import { chat } from '@/lib/ai'
import type { Platform, TimelineEntry } from '@/lib/types'

interface RouteParams {
  params: Promise<{ id: string }>
}

interface ReplayResult {
  rootCause: string
  timeline: TimelineEntry[]
  affectedPlatforms: Platform[]
  aiReplay: string
  recommendations: string[]
}

const SYSTEM_PROMPT = `You are an expert QA engineer and software reliability engineer.
You reconstruct software incidents from evidence. Always be specific, technical, and actionable.
Respond ONLY with valid JSON — no markdown fences, no prose outside JSON.`

export async function POST(_request: Request, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params
  const incident = incidents.get(id)
  if (!incident) {
    return NextResponse.json({ error: 'Incident not found' }, { status: 404 })
  }

  const userMessage = `
Reconstruct this software incident and produce a Visual Incident Replay.

Incident title: ${incident.title}
Platforms: ${incident.platform.join(', ')}
Severity: ${incident.severity}
Existing timeline: ${JSON.stringify(incident.timeline)}
Existing root cause: ${incident.rootCause || 'Not yet determined'}

Return a JSON object with these exact keys:
{
  "rootCause": "string — precise technical root cause",
  "timeline": [{"time": "ISO date string", "event": "string"}],
  "affectedPlatforms": ["Platform", ...],
  "aiReplay": "string — narrative reconstruction of what happened, before and after, 3-5 paragraphs",
  "recommendations": ["string", ...]
}
`

  let result: ReplayResult
  try {
    const raw = await chat(SYSTEM_PROMPT, userMessage)
    result = JSON.parse(raw) as ReplayResult
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: `AI analysis failed: ${message}` }, { status: 500 })
  }

  // Persist the replay back to the incident
  const updated = {
    ...incident,
    rootCause: result.rootCause,
    timeline: result.timeline,
    affectedPlatforms: result.affectedPlatforms,
    aiReplay: result.aiReplay,
    status: 'INVESTIGATING' as const,
  }
  incidents.set(id, updated)

  return NextResponse.json({ ...result, incidentId: id })
}
