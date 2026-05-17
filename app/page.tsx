import Link from 'next/link'
import { devices, incidents, bugReports } from '@/lib/store'

function StatCard({ label, value, sub, color }: { label: string; value: number | string; sub?: string; color: string }) {
  return (
    <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-6">
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-slate-600 mt-1">{sub}</p>}
    </div>
  )
}

export default function HomePage() {
  const allDevices = Array.from(devices.values())
  const allIncidents = Array.from(incidents.values())
  const allBugs = Array.from(bugReports.values())

  const onlineDevices = allDevices.filter((d) => d.status === 'ONLINE' || d.status === 'TESTING').length
  const openIncidents = allIncidents.filter((i) => i.status === 'OPEN' || i.status === 'INVESTIGATING').length
  const criticalBugs = allBugs.filter((b) => b.severity === 'CRITICAL' || b.severity === 'HIGH').length
  const totalDevices = allDevices.length

  const recentIncidents = [...allIncidents]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const severityColor: Record<string, string> = {
    LOW: 'text-green-400 bg-green-400/10',
    MEDIUM: 'text-yellow-400 bg-yellow-400/10',
    HIGH: 'text-orange-400 bg-orange-400/10',
    CRITICAL: 'text-red-400 bg-red-400/10',
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Lab Overview</h1>
        <p className="text-slate-400 text-sm">Real-time status of your cross-platform QA lab</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Devices Online" value={`${onlineDevices}/${totalDevices}`} color="text-indigo-400" sub="across all platforms" />
        <StatCard label="Open Incidents" value={openIncidents} color={openIncidents > 0 ? 'text-orange-400' : 'text-green-400'} sub="active investigations" />
        <StatCard label="Critical Bugs" value={criticalBugs} color={criticalBugs > 0 ? 'text-red-400' : 'text-green-400'} sub="HIGH + CRITICAL" />
        <StatCard label="Bug Reports" value={allBugs.length} color="text-slate-300" sub="AI-generated total" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Incidents */}
        <div className="lg:col-span-2 bg-[#12121a] border border-[#2a2a3a] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Recent Incidents</h2>
            <Link href="/incidents/new" className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md transition-colors">
              + New Incident
            </Link>
          </div>
          {recentIncidents.length === 0 ? (
            <p className="text-slate-500 text-sm">No incidents yet.</p>
          ) : (
            <div className="space-y-3">
              {recentIncidents.map((inc) => (
                <Link
                  key={inc.id}
                  href={`/incidents/${inc.id}`}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 ${severityColor[inc.severity] ?? 'text-slate-400'}`}>
                    {inc.severity}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200 group-hover:text-white truncate">{inc.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {inc.platform.join(', ')} &middot; {inc.status}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-6">
          <h2 className="font-semibold text-white mb-4">Quick Access</h2>
          <div className="space-y-2">
            {[
              { href: '/devices', label: 'Device Inventory', desc: 'Manage lab devices' },
              { href: '/incidents', label: 'Incident List', desc: 'All active incidents' },
              { href: '/bugs', label: 'Bug Reports', desc: 'AI-generated reports' },
              { href: '/firmware', label: 'Firmware Log', desc: 'Version tracking' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-[#2a2a3a]"
              >
                <span className="text-sm text-slate-200 font-medium">{link.label}</span>
                <span className="text-xs text-slate-500">{link.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
