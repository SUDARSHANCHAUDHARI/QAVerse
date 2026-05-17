'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  incidentId: string
  hasReplay: boolean
}

export default function IncidentActions({ incidentId, hasReplay }: Props) {
  const router = useRouter()
  const [replayLoading, setReplayLoading] = useState(false)
  const [bugLoading, setBugLoading] = useState(false)
  const [replayError, setReplayError] = useState<string | null>(null)
  const [bugError, setBugError] = useState<string | null>(null)
  const [bugSuccess, setBugSuccess] = useState(false)

  async function runReplay() {
    setReplayLoading(true)
    setReplayError(null)
    try {
      const res = await fetch(`/api/incidents/${incidentId}/replay`, { method: 'POST' })
      if (!res.ok) {
        const data = await res.json() as { error?: string }
        throw new Error(data.error ?? 'Replay failed')
      }
      router.refresh()
    } catch (err) {
      setReplayError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setReplayLoading(false)
    }
  }

  async function generateBugReport() {
    setBugLoading(true)
    setBugError(null)
    setBugSuccess(false)
    try {
      const res = await fetch('/api/bugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incidentId }),
      })
      if (!res.ok) {
        const data = await res.json() as { error?: string }
        throw new Error(data.error ?? 'Bug report generation failed')
      }
      setBugSuccess(true)
      router.refresh()
    } catch (err) {
      setBugError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setBugLoading(false)
    }
  }

  return (
    <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-4 mb-8">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={runReplay}
          disabled={replayLoading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {replayLoading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating Replay...
            </>
          ) : (
            <>
              <span>{hasReplay ? 'Refresh' : 'Run'} AI Replay</span>
            </>
          )}
        </button>

        <button
          onClick={generateBugReport}
          disabled={bugLoading}
          className="flex items-center gap-2 bg-[#1a1a26] hover:bg-[#2a2a3a] disabled:opacity-50 border border-[#2a2a3a] text-slate-300 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {bugLoading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-slate-500 border-t-slate-300 rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Bug Report'
          )}
        </button>

        {bugSuccess && (
          <span className="text-xs text-green-400 bg-green-400/10 px-3 py-1.5 rounded-lg">
            Bug report created
          </span>
        )}
      </div>

      {replayError && (
        <p className="mt-3 text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded px-3 py-2">
          Replay error: {replayError}
        </p>
      )}
      {bugError && (
        <p className="mt-3 text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded px-3 py-2">
          Bug report error: {bugError}
        </p>
      )}
    </div>
  )
}
