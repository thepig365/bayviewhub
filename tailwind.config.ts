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
        primary: {
          50: '#e6f5f5',
          100: '#c2e8e8',
          200: '#9adada',
          300: '#72cccc',
          400: '#56d7b4',
          500: '#25bdb0',
          600: '#2c6566',
          700: '#245252',
          800: '#1f3440',
          900: '#162a33',
        },
        accent: {
          50: '#fef9ec',
          100: '#fdf2d0',
          200: '#fce9a8',
          300: '#fade80',
          400: '#f6d05f',
          500: '#edbf43',
          600: '#d4a838',
          700: '#b08c2d',
          800: '#8c7024',
          900: '#6b5519',
        },
        natural: {
          50: '#f8fafa',
          100: '#f1f4f4',
          200: '#e3e9e9',
          300: '#d1dada',
          400: '#a8b5b5',
          500: '#7a8b8b',
          600: '#5a6d6d',
          700: '#475757',
          800: '#344242',
          900: '#1f3440',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

