const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-primary)',
        surface: 'var(--bg-secondary)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        charcoal: {
          DEFAULT: '#0D0D0D', // Keep for manual usage
          light: '#1E293B',
        },
        amber: {
          DEFAULT: '#FFB800',
          dark: '#E5A600',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('dim', '.dim &');
    }),
  ],
}
