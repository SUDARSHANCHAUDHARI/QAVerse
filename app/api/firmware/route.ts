import { NextResponse } from 'next/server'
import { firmwareLog, nextFirmwareId } from '@/lib/store'
import type { FirmwareEntry, Platform } from '@/lib/types'

export async function GET(): Promise<NextResponse> {
  const list = Array.from(firmwareLog.values()).sort(
    (a, b) => new Date(b.installedAt).getTime() - new Date(a.installedAt).getTime()
  )
  return NextResponse.json(list)
}

interface CreateFirmwareBody {
  deviceId: string
  deviceName: string
  platform: Platform
  version: string
  notes?: string
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const b = body as Partial<CreateFirmwareBody>
  if (!b.deviceId || !b.deviceName || !b.platform || !b.version) {
    return NextResponse.json(
      { error: 'Missing required fields: deviceId, deviceName, platform, version' },
      { status: 400 }
    )
  }

  const entry: FirmwareEntry = {
    id: nextFirmwareId(),
    deviceId: b.deviceId,
    deviceName: b.deviceName,
    platform: b.platform,
    version: b.version,
    installedAt: new Date().toISOString(),
    ...(b.notes !== undefined ? { notes: b.notes } : {}),
  }

  firmwareLog.set(entry.id, entry)
  return NextResponse.json(entry, { status: 201 })
}
