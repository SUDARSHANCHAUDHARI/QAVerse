import { NextResponse } from 'next/server'
import { devices } from '@/lib/store'
import type { DeviceStatus } from '@/lib/types'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params
  const device = devices.get(id)
  if (!device) {
    return NextResponse.json({ error: 'Device not found' }, { status: 404 })
  }
  return NextResponse.json(device)
}

interface PatchBody {
  status?: DeviceStatus
  screenshotBase64?: string
  firmware?: string
  location?: string
}

export async function PATCH(request: Request, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params
  const device = devices.get(id)
  if (!device) {
    return NextResponse.json({ error: 'Device not found' }, { status: 404 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const b = body as Partial<PatchBody>
  const updated = {
    ...device,
    ...(b.status !== undefined ? { status: b.status } : {}),
    ...(b.screenshotBase64 !== undefined ? { screenshotBase64: b.screenshotBase64 } : {}),
    ...(b.firmware !== undefined ? { firmware: b.firmware } : {}),
    ...(b.location !== undefined ? { location: b.location } : {}),
    lastSeen: new Date().toISOString(),
  }

  devices.set(id, updated)
  return NextResponse.json(updated)
}
