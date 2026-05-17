import Link from 'next/link'
import { incidents } from '@/lib/store'
import type { Severity, IncidentStatus } from '@/lib/types'

const SEVERITY_CLASS: Record<Severity, string> = {
  LOW: 'text-green-400 bg-green-400/10 border-green-400/20',
  MEDIUM: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  HIGH: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  CRITICAL: 'text-red-400 bg-red-400/10 border-red-400/20',
}

const STATUS_CLASS: Record<IncidentStatus, string> = {
  OPEN: 'text-blue-400 bg-blue-400/10',
  INVESTIGATING: 'text-purple-400 bg-purple-400/10',
  RESOLVED: 'text-green-400 bg-green-400/10',
}

export default function IncidentsPage() {
  const allIncidents = Array.from(incidents.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Incidents</h1>
          <p className="text-slate-400 text-sm">{allIncidents.length} total</p>
        </div>
        <Link
          href="/incidents/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + New Incident
        </Link>
      </div>

      {allIncidents.length === 0 ? (
        <div className="text-center py-24 text-slate-500">
          <p className="text-lg mb-2">No incidents yet</p>
          <Link href="/incidents/new" className="text-indigo-400 hover:text-indigo-300 text-sm">Create your first incident</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {allIncidents.map((inc) => (
            <Link
              key={inc.id}
              href={`/incidents/${inc.id}`}
              className="block bg-[#12121a] border border-[#2a2a3a] rounded-xl p-5 hover:border-indigo-500/40 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <span className={`text-xs font-bold px-2 py-1 rounded-full border mt-0.5 flex-shrink-0 ${SEVERITY_CLASS[inc.severity]}`}>
                  {inc.severity}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {inc.title}
                    </h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_CLASS[inc.status]}`}>
                      {inc.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    {inc.platform.map((p) => (
                      <span key={p} className="text-xs text-slate-500 bg-[#1a1a26] border border-[#2a2a3a] rounded px-1.5 py-0.5">
                        {p}
                      </span>
                    ))}
                    <span className="text-xs text-slate-600">
                      {new Date(inc.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {inc.rootCause && (
                    <p className="text-xs text-slate-500 mt-2 line-clamp-1">{inc.rootCause}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
