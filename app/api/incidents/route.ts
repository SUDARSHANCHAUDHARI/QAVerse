import { NextResponse } from 'next/server'
import { incidents, nextIncidentId } from '@/lib/store'
import type { Incident, Platform, Severity } from '@/lib/types'

export async function GET(): Promise<NextResponse> {
  const list = Array.from(incidents.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  return NextResponse.json(list)
}

interface CreateIncidentBody {
  title: string
  deviceIds: string[]
  platform: Platform[]
  severity: Severity
  beforeScreenshots?: string[]
  afterScreenshots?: string[]
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const b = body as Partial<CreateIncidentBody>
  if (!b.title || !b.deviceIds || !b.platform || !b.severity) {
    return NextResponse.json({ error: 'Missing required fields: title, deviceIds, platform, severity' }, { status: 400 })
  }

  const incident: Incident = {
    id: nextIncidentId(),
    title: b.title,
    deviceIds: b.deviceIds,
    platform: b.platform,
    severity: b.severity,
    beforeScreenshots: b.beforeScreenshots ?? [],
    afterScreenshots: b.afterScreenshots ?? [],
    rootCause: '',
    affectedPlatforms: b.platform,
    timeline: [{ time: new Date().toISOString(), event: 'Incident created' }],
    aiReplay: '',
    status: 'OPEN',
    createdAt: new Date().toISOString(),
  }

  incidents.set(incident.id, incident)
  return NextResponse.json(incident, { status: 201 })
}
