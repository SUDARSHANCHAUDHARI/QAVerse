import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#12121a',
        'surface-2': '#1a1a26',
        border: '#2a2a3a',
        accent: '#6366f1',
        'accent-hover': '#4f52d6',
      },
    },
  },
  plugins: [],
}

export default config
