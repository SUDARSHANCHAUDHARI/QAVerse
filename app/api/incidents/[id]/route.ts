import { NextResponse } from 'next/server'
import { incidents } from '@/lib/store'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params
  const incident = incidents.get(id)
  if (!incident) {
    return NextResponse.json({ error: 'Incident not found' }, { status: 404 })
  }
  return NextResponse.json(incident)
}
