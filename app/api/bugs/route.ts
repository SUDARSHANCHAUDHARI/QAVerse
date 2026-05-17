import { NextResponse } from 'next/server'
import { bugReports, incidents, nextBugId } from '@/lib/store'
import { chat } from '@/lib/ai'
import type { BugReport, Platform, Severity } from '@/lib/types'

export async function GET(): Promise<NextResponse> {
  const list = Array.from(bugReports.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  return NextResponse.json(list)
}

interface GenerateBugBody {
  incidentId: string
}

interface AIBugReport {
  title: string
  platform: Platform
  severity: Severity
  stepsToReproduce: string[]
  expectedBehavior: string
  actualBehavior: string
  environment: string
}

const SYSTEM_PROMPT = `You are an expert QA engineer. Generate precise, developer-friendly bug reports.
Respond ONLY with valid JSON — no markdown fences, no prose outside JSON.`

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const b = body as Partial<GenerateBugBody>
  if (!b.incidentId) {
    return NextResponse.json({ error: 'incidentId is required' }, { status: 400 })
  }

  const incident = incidents.get(b.incidentId)
  if (!incident) {
    return NextResponse.json({ error: 'Incident not found' }, { status: 404 })
  }

  const userMessage = `
Generate a bug report for this incident.

Title: ${incident.title}
Severity: ${incident.severity}
Platforms: ${incident.platform.join(', ')}
Root cause: ${incident.rootCause || 'Under investigation'}
AI replay: ${incident.aiReplay || 'Not yet generated'}

Return JSON with these exact keys:
{
  "title": "string",
  "platform": "Android|FireOS|SCOS|Tizen|webOS|ChromeOS|Browser|iOS",
  "severity": "LOW|MEDIUM|HIGH|CRITICAL",
  "stepsToReproduce": ["string", ...],
  "expectedBehavior": "string",
  "actualBehavior": "string",
  "environment": "string"
}
`

  let aiData: AIBugReport
  try {
    const raw = await chat(SYSTEM_PROMPT, userMessage)
    aiData = JSON.parse(raw) as AIBugReport
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: `AI generation failed: ${message}` }, { status: 500 })
  }

  const report: BugReport = {
    id: nextBugId(),
    incidentId: b.incidentId,
    title: aiData.title,
    platform: aiData.platform,
    severity: aiData.severity,
    stepsToReproduce: aiData.stepsToReproduce,
    expectedBehavior: aiData.expectedBehavior,
    actualBehavior: aiData.actualBehavior,
    environment: aiData.environment,
    attachments: [],
    createdAt: new Date().toISOString(),
  }

  bugReports.set(report.id, report)
  return NextResponse.json(report, { status: 201 })
}
