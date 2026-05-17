import type { Device, Incident, BugReport, FirmwareEntry, Platform, Severity } from './types'

// In-memory store — module-level Maps persist across requests in dev
export const devices = new Map<string, Device>()
export const incidents = new Map<string, Incident>()
export const bugReports = new Map<string, BugReport>()
export const firmwareLog = new Map<string, FirmwareEntry>()

// Seed with realistic demo data
function seedDevices(): void {
  const seedData: Device[] = [
    {
      id: 'dev-1',
      name: 'Samsung Galaxy S24',
      platform: 'Android',
      firmware: '14.0.0',
      location: 'Lab A - Rack 1',
      status: 'ONLINE',
      lastSeen: new Date().toISOString(),
    },
    {
      id: 'dev-2',
      name: 'Amazon Fire HD 10',
      platform: 'FireOS',
      firmware: '8.3.2.1',
      location: 'Lab A - Rack 2',
      status: 'TESTING',
      lastSeen: new Date().toISOString(),
    },
    {
      id: 'dev-3',
      name: 'Samsung Tizen TV 2024',
      platform: 'Tizen',
      firmware: '7.0',
      location: 'Lab B - Display Wall',
      status: 'ONLINE',
      lastSeen: new Date().toISOString(),
    },
    {
      id: 'dev-4',
      name: 'LG webOS TV C3',
      platform: 'webOS',
      firmware: '23.20.04',
      location: 'Lab B - Display Wall',
      status: 'OFFLINE',
      lastSeen: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'dev-5',
      name: 'SCOS Signage Player',
      platform: 'SCOS',
      firmware: '2.4.1',
      location: 'Lab C - Signage Rack',
      status: 'ONLINE',
      lastSeen: new Date().toISOString(),
    },
    {
      id: 'dev-6',
      name: 'Chromebox Enterprise',
      platform: 'ChromeOS',
      firmware: '120.0.6099.234',
      location: 'Lab A - Rack 3',
      status: 'ONLINE',
      lastSeen: new Date().toISOString(),
    },
    {
      id: 'dev-7',
      name: 'iPad Pro M2',
      platform: 'iOS',
      firmware: '17.4.1',
      location: 'Lab A - Mobile Station',
      status: 'TESTING',
      lastSeen: new Date().toISOString(),
    },
    {
      id: 'dev-8',
      name: 'Chrome Browser (Desktop)',
      platform: 'Browser',
      firmware: '124.0.6367.82',
      location: 'Remote / Virtual',
      status: 'ONLINE',
      lastSeen: new Date().toISOString(),
    },
  ]

  for (const d of seedData) {
    devices.set(d.id, d)
  }
}

function seedIncidents(): void {
  const now = new Date()
  const incident: Incident = {
    id: 'inc-1',
    title: 'Video playback freeze on webOS & Tizen after firmware update',
    deviceIds: ['dev-3', 'dev-4'],
    platform: ['Tizen', 'webOS'],
    severity: 'CRITICAL',
    beforeScreenshots: [],
    afterScreenshots: [],
    rootCause: 'GPU compositor pipeline regression introduced in firmware 7.0 / 23.20.04 — H.264 decoder handoff to display engine fails under memory pressure.',
    affectedPlatforms: ['Tizen', 'webOS'],
    timeline: [
      { time: new Date(now.getTime() - 7200000).toISOString(), event: 'Firmware update deployed to lab devices' },
      { time: new Date(now.getTime() - 5400000).toISOString(), event: 'First playback freeze reported on Tizen' },
      { time: new Date(now.getTime() - 3600000).toISOString(), event: 'webOS device confirmed same symptom' },
      { time: new Date(now.getTime() - 1800000).toISOString(), event: 'AI replay analysis initiated' },
      { time: now.toISOString(), event: 'Incident opened — engineering notified' },
    ],
    aiReplay:
      'AI analysis indicates the freeze occurs 8-12 seconds into playback when the hardware decoder attempts to pre-buffer the next segment. The new firmware changed buffer alignment requirements that the current player SDK does not satisfy. Recommend: roll back firmware or patch the player SDK buffer allocation to 4096-byte alignment.',
    status: 'INVESTIGATING',
    createdAt: new Date(now.getTime() - 7200000).toISOString(),
  }
  incidents.set(incident.id, incident)
}

function seedBugReports(): void {
  const bug: BugReport = {
    id: 'bug-1',
    incidentId: 'inc-1',
    title: '[CRITICAL] Video freezes after 10s on Tizen 7.0 and webOS 23.20.04',
    platform: 'Tizen',
    severity: 'CRITICAL',
    stepsToReproduce: [
      'Update device firmware to Tizen 7.0 or webOS 23.20.04',
      'Open any video content in the QA player app',
      'Play for 8-12 seconds',
      'Observe: video freezes, audio continues briefly then drops',
    ],
    expectedBehavior: 'Video plays continuously without interruption.',
    actualBehavior: 'Video freezes at 8-12 seconds. App becomes unresponsive. Requires manual restart.',
    environment: 'Tizen 7.0 / webOS 23.20.04 — QA Player SDK 3.2.1 — Lab B Display Wall',
    attachments: [],
    createdAt: new Date().toISOString(),
  }
  bugReports.set(bug.id, bug)
}

function seedFirmware(): void {
  const entries: FirmwareEntry[] = [
    {
      id: 'fw-1',
      deviceId: 'dev-3',
      deviceName: 'Samsung Tizen TV 2024',
      platform: 'Tizen',
      version: '7.0',
      installedAt: new Date(Date.now() - 7200000).toISOString(),
      notes: 'Major firmware update — introduced GPU compositor changes',
    },
    {
      id: 'fw-2',
      deviceId: 'dev-4',
      deviceName: 'LG webOS TV C3',
      platform: 'webOS',
      version: '23.20.04',
      installedAt: new Date(Date.now() - 7200000).toISOString(),
      notes: 'Coincides with Tizen update batch',
    },
    {
      id: 'fw-3',
      deviceId: 'dev-1',
      deviceName: 'Samsung Galaxy S24',
      platform: 'Android',
      version: '14.0.0',
      installedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
  ]
  for (const e of entries) {
    firmwareLog.set(e.id, e)
  }
}

// Run seed once on module load
let seeded = false
if (!seeded) {
  seedDevices()
  seedIncidents()
  seedBugReports()
  seedFirmware()
  seeded = true
}

// ID generators
let deviceCounter = 100
let incidentCounter = 100
let bugCounter = 100
let firmwareCounter = 100

export function nextDeviceId(): string {
  return `dev-${++deviceCounter}`
}
export function nextIncidentId(): string {
  return `inc-${++incidentCounter}`
}
export function nextBugId(): string {
  return `bug-${++bugCounter}`
}
export function nextFirmwareId(): string {
  return `fw-${++firmwareCounter}`
}

export function getPlatformStats(): Record<Platform, { total: number; online: number }> {
  const platforms: Platform[] = ['Android', 'FireOS', 'SCOS', 'Tizen', 'webOS', 'ChromeOS', 'Browser', 'iOS']
  const result = {} as Record<Platform, { total: number; online: number }>
  for (const p of platforms) {
    const devs = Array.from(devices.values()).filter((d) => d.platform === p)
    result[p] = {
      total: devs.length,
      online: devs.filter((d) => d.status === 'ONLINE' || d.status === 'TESTING').length,
    }
  }
  return result
}

export function getIncidentsBySeverity(): Record<Severity, number> {
  const counts: Record<Severity, number> = { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 }
  const allIncidents: Incident[] = Array.from(incidents.values())
  for (const inc of allIncidents) {
    counts[inc.severity]++
  }
  return counts
}
