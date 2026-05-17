import { firmwareLog } from '@/lib/store'

export default function FirmwarePage() {
  const entries = Array.from(firmwareLog.values()).sort(
    (a, b) => new Date(b.installedAt).getTime() - new Date(a.installedAt).getTime()
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Firmware Log</h1>
        <p className="text-slate-400 text-sm">{entries.length} firmware entries tracked</p>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-24 text-slate-500">
          <p className="text-lg mb-2">No firmware entries yet</p>
          <p className="text-sm">POST to /api/firmware to add entries.</p>
        </div>
      ) : (
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a3a]">
                <th className="text-left text-xs text-slate-500 uppercase tracking-wider px-6 py-3">Device</th>
                <th className="text-left text-xs text-slate-500 uppercase tracking-wider px-6 py-3">Platform</th>
                <th className="text-left text-xs text-slate-500 uppercase tracking-wider px-6 py-3">Version</th>
                <th className="text-left text-xs text-slate-500 uppercase tracking-wider px-6 py-3">Installed</th>
                <th className="text-left text-xs text-slate-500 uppercase tracking-wider px-6 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr
                  key={entry.id}
                  className={`border-b border-[#2a2a3a] hover:bg-white/5 transition-colors ${i === entries.length - 1 ? 'border-b-0' : ''}`}
                >
                  <td className="px-6 py-4">
                    <p className="text-slate-200 font-medium">{entry.deviceName}</p>
                    <p className="text-xs text-slate-600">{entry.deviceId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-400 bg-[#1a1a26] border border-[#2a2a3a] rounded px-2 py-0.5">
                      {entry.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">
                      {entry.version}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                    {new Date(entry.installedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs max-w-xs">
                    {entry.notes ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
