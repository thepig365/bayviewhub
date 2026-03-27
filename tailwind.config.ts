import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* B palette - central tokens */
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted)',
        },
        subtle: 'var(--subtle)',
        border: 'var(--border)',
        surface: 'var(--surface)',
        /* Legacy mappings (primary/accent/natural for existing components) */
        background: 'var(--bg)',
        foreground: 'var(--fg)',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
        },
        card: {
          DEFAULT: 'var(--surface)',
          foreground: 'var(--fg)',
        },
        primary: {
          DEFAULT: 'var(--fg)',
          foreground: 'var(--bg)',
          50: 'var(--accent-soft)',
          100: '#f0f9fa',
          200: 'var(--accent-soft)',
          300: 'var(--accent)',
          400: 'var(--accent)',
          500: 'var(--accent)',
          600: 'var(--accent)',
          700: 'var(--accent-hover)',
          800: 'var(--accent-hover)',
          900: 'var(--fg)',
        },
        'accent-text': '#1a1408',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          50: 'var(--accent-soft)',
          100: 'var(--accent-soft)',
          200: 'var(--accent-soft)',
          300: 'var(--accent)',
          400: 'var(--accent)',
          500: 'var(--accent)',
          600: 'var(--accent-hover)',
          700: 'var(--accent-hover)',
          800: 'var(--accent-hover)',
          900: 'var(--fg)',
        },
        natural: {
          50: 'var(--bg)',
          100: '#f5f5f3',
          200: 'var(--border)',
          300: 'var(--subtle)',
          400: 'var(--muted)',
          500: 'var(--muted)',
          600: 'var(--muted)',
          700: '#374151',
          800: '#201a0e',
          900: 'var(--fg)',
        },
        shell: {
          footer: 'var(--shell-footer)',
          'footer-deep': 'var(--shell-footer-deep)',
          'footer-border': 'var(--shell-footer-border)',
          'footer-muted': 'var(--shell-footer-muted)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
