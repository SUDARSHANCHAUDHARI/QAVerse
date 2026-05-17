export type Platform =
  | 'Android'
  | 'FireOS'
  | 'SCOS'
  | 'Tizen'
  | 'webOS'
  | 'ChromeOS'
  | 'Browser'
  | 'iOS'

export type DeviceStatus = 'ONLINE' | 'OFFLINE' | 'TESTING'

export interface Device {
  id: string
  name: string
  platform: Platform
  firmware: string
  location: string
  status: DeviceStatus
  lastSeen: string // ISO date string
  screenshotBase64?: string
}

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export type IncidentStatus = 'OPEN' | 'INVESTIGATING' | 'RESOLVED'

export interface TimelineEntry {
  time: string // ISO date string
  event: string
}

export interface Incident {
  id: string
  title: string
  deviceIds: string[]
  platform: Platform[]
  severity: Severity
  beforeScreenshots: string[] // base64
  afterScreenshots: string[] // base64
  rootCause: string
  affectedPlatforms: Platform[]
  timeline: TimelineEntry[]
  aiReplay: string
  status: IncidentStatus
  createdAt: string // ISO date string
}

export interface BugReport {
  id: string
  incidentId: string
  title: string
  platform: Platform
  severity: Severity
  stepsToReproduce: string[]
  expectedBehavior: string
  actualBehavior: string
  environment: string
  attachments: string[]
  createdAt: string // ISO date string
}

export interface FirmwareEntry {
  id: string
  deviceId: string
  deviceName: string
  platform: Platform
  version: string
  installedAt: string // ISO date string
  notes?: string
}
