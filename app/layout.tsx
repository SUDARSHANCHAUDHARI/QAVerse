import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'QAVerse — AI Cross-Platform Testing Lab',
  description: 'AI-powered visual QA and incident management for Android, iOS, Smart TV, and more',
}

interface NavLinkProps {
  href: string
  label: string
}

function NavLink({ href, label }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-slate-400 hover:text-white transition-colors text-sm font-medium px-3 py-2 rounded-md hover:bg-white/5"
    >
      {label}
    </Link>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0f] text-slate-100 antialiased">
        <nav className="sticky top-0 z-50 border-b border-[#2a2a3a] bg-[#0a0a0f]/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 flex items-center h-14 gap-2">
            <Link href="/" className="flex items-center gap-2 mr-6">
              <span className="text-indigo-400 text-xl font-bold tracking-tight">QAVerse</span>
              <span className="hidden sm:inline text-xs text-slate-500 border border-slate-700 rounded px-1.5 py-0.5">
                AI Lab
              </span>
            </Link>
            <NavLink href="/devices" label="Devices" />
            <NavLink href="/incidents" label="Incidents" />
            <NavLink href="/bugs" label="Bugs" />
            <NavLink href="/firmware" label="Firmware" />
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-[#2a2a3a] mt-16">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-xs text-slate-600">
            QAVerse — AI-powered cross-platform QA lab manager
          </div>
        </footer>
      </body>
    </html>
  )
}
