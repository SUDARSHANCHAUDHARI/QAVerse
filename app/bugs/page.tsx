import Link from 'next/link'
import { bugReports, incidents } from '@/lib/store'
import type { Severity } from '@/lib/types'

const SEVERITY_CLASS: Record<Severity, string> = {
  LOW: 'text-green-400 bg-green-400/10 border-green-400/20',
  MEDIUM: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  HIGH: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  CRITICAL: 'text-red-400 bg-red-400/10 border-red-400/20',
}

export default function BugsPage() {
  const allBugs = Array.from(bugReports.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Bug Reports</h1>
        <p className="text-slate-400 text-sm">{allBugs.length} AI-generated reports</p>
      </div>

      {allBugs.length === 0 ? (
        <div className="text-center py-24 text-slate-500">
          <p className="text-lg mb-2">No bug reports yet</p>
          <p className="text-sm">Go to an incident and click &quot;Generate Bug Report&quot; to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {allBugs.map((bug) => {
            const incident = incidents.get(bug.incidentId)
            return (
              <div key={bug.id} className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${SEVERITY_CLASS[bug.severity]}`}>
                    {bug.severity}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold text-white mb-1">{bug.title}</h2>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-slate-500 bg-[#1a1a26] border border-[#2a2a3a] rounded px-1.5 py-0.5">
                        {bug.platform}
                      </span>
                      {incident && (
                        <Link
                          href={`/incidents/${incident.id}`}
                          className="text-xs text-indigo-400 hover:text-indigo-300"
                        >
                          {incident.title}
                        </Link>
                      )}
                      <span className="text-xs text-slate-600">
                        {new Date(bug.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div>
                    <p className="text-slate-500 uppercase tracking-wider mb-2">Steps to Reproduce</p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-300">
                      {bug.stepsToReproduce.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-slate-500 uppercase tracking-wider mb-1">Expected</p>
                      <p className="text-slate-300">{bug.expectedBehavior}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 uppercase tracking-wider mb-1">Actual</p>
                      <p className="text-slate-300">{bug.actualBehavior}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 uppercase tracking-wider mb-1">Environment</p>
                      <p className="text-slate-300">{bug.environment}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
