import { notFound } from 'next/navigation'
import { incidents, bugReports } from '@/lib/store'
import type { Severity, IncidentStatus } from '@/lib/types'
import IncidentActions from './IncidentActions'

interface PageProps {
  params: Promise<{ id: string }>
}

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

export default async function IncidentDetailPage({ params }: PageProps) {
  const { id } = await params
  const incident = incidents.get(id)

  if (!incident) {
    notFound()
  }

  const relatedBugs = Array.from(bugReports.values()).filter((b) => b.incidentId === id)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${SEVERITY_CLASS[incident.severity]}`}>
            {incident.severity}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full ${STATUS_CLASS[incident.status]}`}>
            {incident.status}
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {incident.platform.map((p) => (
              <span key={p} className="text-xs text-slate-500 bg-[#1a1a26] border border-[#2a2a3a] rounded px-2 py-0.5">
                {p}
              </span>
            ))}
          </div>
        </div>
        <h1 className="text-xl font-bold text-white leading-tight mb-1">{incident.title}</h1>
        <p className="text-xs text-slate-500">Created {new Date(incident.createdAt).toLocaleString()}</p>
      </div>

      {/* AI Actions */}
      <IncidentActions incidentId={incident.id} hasReplay={!!incident.aiReplay} />

      {/* Screenshots */}
      {(incident.beforeScreenshots.length > 0 || incident.afterScreenshots.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {incident.beforeScreenshots.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Before</h2>
              <div className="space-y-2">
                {incident.beforeScreenshots.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={`data:image/png;base64,${src}`}
                    alt={`Before screenshot ${i + 1}`}
                    className="w-full rounded-lg border border-[#2a2a3a]"
                  />
                ))}
              </div>
            </div>
          )}
          {incident.afterScreenshots.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">After</h2>
              <div className="space-y-2">
                {incident.afterScreenshots.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={`data:image/png;base64,${src}`}
                    alt={`After screenshot ${i + 1}`}
                    className="w-full rounded-lg border border-[#2a2a3a]"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Root Cause */}
        {incident.rootCause && (
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Root Cause</h2>
            <p className="text-sm text-slate-200 leading-relaxed">{incident.rootCause}</p>
          </div>
        )}

        {/* Affected Platforms */}
        {incident.affectedPlatforms.length > 0 && (
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Affected Platforms</h2>
            <div className="flex flex-wrap gap-2">
              {incident.affectedPlatforms.map((p) => (
                <span key={p} className="text-sm text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-3 py-1.5">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Replay */}
      {incident.aiReplay && (
        <div className="bg-[#12121a] border border-indigo-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
            <h2 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider">Visual Incident Replay</h2>
          </div>
          <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{incident.aiReplay}</div>
        </div>
      )}

      {/* Timeline */}
      {incident.timeline.length > 0 && (
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-6 mb-8">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Timeline</h2>
          <div className="space-y-3">
            {incident.timeline.map((entry, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-1 flex-shrink-0" />
                  {i < incident.timeline.length - 1 && (
                    <div className="w-px flex-1 bg-[#2a2a3a] mt-1" />
                  )}
                </div>
                <div className="pb-3">
                  <p className="text-xs text-slate-500 mb-0.5">{new Date(entry.time).toLocaleString()}</p>
                  <p className="text-sm text-slate-200">{entry.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Bug Reports */}
      {relatedBugs.length > 0 && (
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Bug Reports</h2>
          <div className="space-y-4">
            {relatedBugs.map((bug) => (
              <div key={bug.id} className="border border-[#2a2a3a] rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">{bug.severity}</span>
                  <h3 className="text-sm font-semibold text-white">{bug.title}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-slate-500 mb-1">Steps to Reproduce</p>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-300">
                      {bug.stepsToReproduce.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-slate-500 mb-0.5">Expected</p>
                      <p className="text-slate-300">{bug.expectedBehavior}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-0.5">Actual</p>
                      <p className="text-slate-300">{bug.actualBehavior}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
