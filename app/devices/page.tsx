import { devices } from '@/lib/store'
import type { Platform, Device } from '@/lib/types'

const PLATFORM_ORDER: Platform[] = ['Android', 'FireOS', 'iOS', 'Tizen', 'webOS', 'ChromeOS', 'SCOS', 'Browser']

const PLATFORM_ICON: Record<Platform, string> = {
  Android: '🤖',
  FireOS: '🔥',
  iOS: '',
  Tizen: '📺',
  webOS: '🖥️',
  ChromeOS: '🌐',
  SCOS: '📡',
  Browser: '🌍',
}

const STATUS_COLOR: Record<Device['status'], string> = {
  ONLINE: 'bg-green-500',
  OFFLINE: 'bg-red-500',
  TESTING: 'bg-yellow-500',
}

const STATUS_LABEL: Record<Device['status'], string> = {
  ONLINE: 'Online',
  OFFLINE: 'Offline',
  TESTING: 'Testing',
}

function DeviceCard({ device }: { device: Device }) {
  return (
    <div className="bg-[#1a1a26] border border-[#2a2a3a] rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm font-medium text-white leading-tight">{device.name}</span>
        <span className="flex items-center gap-1.5 ml-2 flex-shrink-0">
          <span className={`w-2 h-2 rounded-full ${STATUS_COLOR[device.status]}`} />
          <span className="text-xs text-slate-400">{STATUS_LABEL[device.status]}</span>
        </span>
      </div>
      <div className="space-y-1 text-xs text-slate-500">
        <p>Firmware: <span className="text-slate-300">{device.firmware}</span></p>
        <p>Location: <span className="text-slate-300">{device.location}</span></p>
        <p>Last seen: <span className="text-slate-300">{new Date(device.lastSeen).toLocaleString()}</span></p>
      </div>
      {device.screenshotBase64 && (
        <div className="mt-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${device.screenshotBase64}`}
            alt="Device screenshot"
            className="w-full rounded border border-[#2a2a3a] object-contain max-h-32"
          />
        </div>
      )}
    </div>
  )
}

export default function DevicesPage() {
  const allDevices = Array.from(devices.values())

  const byPlatform = PLATFORM_ORDER.reduce<Record<Platform, Device[]>>((acc, p) => {
    acc[p] = allDevices.filter((d) => d.platform === p)
    return acc
  }, {} as Record<Platform, Device[]>)

  const activePlatforms = PLATFORM_ORDER.filter((p) => byPlatform[p].length > 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Device Inventory</h1>
          <p className="text-slate-400 text-sm">{allDevices.length} devices across {activePlatforms.length} platforms</p>
        </div>
      </div>

      <div className="space-y-10">
        {activePlatforms.map((platform) => (
          <section key={platform}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">{PLATFORM_ICON[platform]}</span>
              <h2 className="text-lg font-semibold text-white">{platform}</h2>
              <span className="text-xs text-slate-500 bg-[#1a1a26] border border-[#2a2a3a] rounded-full px-2 py-0.5">
                {byPlatform[platform].length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {byPlatform[platform].map((device) => (
                <DeviceCard key={device.id} device={device} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {allDevices.length === 0 && (
        <div className="text-center py-24 text-slate-500">
          <p className="text-lg mb-2">No devices found</p>
          <p className="text-sm">Add devices via the API to get started.</p>
        </div>
      )}
    </div>
  )
}
