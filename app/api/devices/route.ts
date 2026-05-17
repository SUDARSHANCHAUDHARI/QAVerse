import { NextResponse } from 'next/server'
import { devices, nextDeviceId } from '@/lib/store'
import type { Device, Platform, DeviceStatus } from '@/lib/types'

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(Array.from(devices.values()))
}

interface CreateDeviceBody {
  name: string
  platform: Platform
  firmware: string
  location: string
  status?: DeviceStatus
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const b = body as Partial<CreateDeviceBody>
  if (!b.name || !b.platform || !b.firmware || !b.location) {
    return NextResponse.json({ error: 'Missing required fields: name, platform, firmware, location' }, { status: 400 })
  }

  const device: Device = {
    id: nextDeviceId(),
    name: b.name,
    platform: b.platform,
    firmware: b.firmware,
    location: b.location,
    status: b.status ?? 'ONLINE',
    lastSeen: new Date().toISOString(),
  }

  devices.set(device.id, device)
  return NextResponse.json(device, { status: 201 })
}
