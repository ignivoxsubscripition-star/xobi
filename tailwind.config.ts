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
        primary: '#16a34a', // Teal green
        secondary: '#0284c7', // Blue
        dark: '#0f172a',
        base: '#f8fafc',
        accent: '#22c55e',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #22c55e, #0ea5e9)',
        'brand-gradient-hover': 'linear-gradient(to right, #16a34a, #0284c7)',
      },
    },
  },
  plugins: [],
}
export default config
