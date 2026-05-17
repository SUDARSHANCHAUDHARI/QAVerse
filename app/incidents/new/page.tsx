'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Platform, Severity } from '@/lib/types'

const PLATFORMS: Platform[] = ['Android', 'FireOS', 'SCOS', 'Tizen', 'webOS', 'ChromeOS', 'Browser', 'iOS']
const SEVERITIES: Severity[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

const SEVERITY_LABEL: Record<Severity, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
}

export default function NewIncidentPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([])
  const [severity, setSeverity] = useState<Severity>('MEDIUM')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function togglePlatform(p: Platform) {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!title.trim() || selectedPlatforms.length === 0) {
      setError('Title and at least one platform are required.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          deviceIds: [],
          platform: selectedPlatforms,
          severity,
        }),
      })

      if (!res.ok) {
        const data = await res.json() as { error?: string }
        throw new Error(data.error ?? 'Failed to create incident')
      }

      const incident = await res.json() as { id: string }
      router.push(`/incidents/${incident.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">New Incident</h1>
        <p className="text-slate-400 text-sm">Document a cross-platform issue for AI analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
            Incident Title <span className="text-red-400">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Video freeze after firmware update on Tizen"
            className="w-full bg-[#1a1a26] border border-[#2a2a3a] rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Severity <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2 flex-wrap">
            {SEVERITIES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSeverity(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  severity === s
                    ? s === 'CRITICAL'
                      ? 'bg-red-500/20 border-red-500 text-red-300'
                      : s === 'HIGH'
                      ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                      : s === 'MEDIUM'
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300'
                      : 'bg-green-500/20 border-green-500 text-green-300'
                    : 'bg-transparent border-[#2a2a3a] text-slate-500 hover:border-slate-500'
                }`}
              >
                {SEVERITY_LABEL[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Affected Platforms <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => togglePlatform(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  selectedPlatforms.includes(p)
                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                    : 'bg-transparent border-[#2a2a3a] text-slate-500 hover:border-slate-500'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
        >
          {submitting ? 'Creating...' : 'Create Incident'}
        </button>
      </form>
    </div>
  )
}
