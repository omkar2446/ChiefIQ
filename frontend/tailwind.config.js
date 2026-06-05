/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Azure Blue palette
        azure: {
          50:  '#EBF5FF',
          100: '#D1E9FF',
          200: '#A4D4FF',
          300: '#6BB8FF',
          400: '#2899F5',
          500: '#0078D4',
          600: '#005FA3',
          700: '#004880',
          800: '#003361',
          900: '#001F3F',
        },
        // Deep space background palette
        space: {
          950: '#020817',
          900: '#0A0F1E',
          800: '#0D1526',
          700: '#111D35',
          600: '#162040',
          500: '#1B2A4A',
        },
        // Neon accent colors
        neon: {
          blue:    '#00BFFF',
          cyan:    '#00E5FF',
          purple:  '#BF5FFF',
          violet:  '#7C3AED',
          emerald: '#00E676',
          amber:   '#FFB300',
          rose:    '#FF4D6D',
        },
        // Surface colors
        surface: {
          DEFAULT: '#0D1526',
          card:    '#111D35',
          hover:   '#162040',
          border:  'rgba(255,255,255,0.06)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        // Core gradient backgrounds
        'hero-gradient':   'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(0,120,212,0.25) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(124,58,237,0.15) 0%, transparent 60%), linear-gradient(180deg, #020817 0%, #0A0F1E 100%)',
        'sidebar-gradient':'linear-gradient(180deg, #0A0F1E 0%, #0D1526 100%)',
        'card-gradient':   'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        'azure-glow':      'radial-gradient(circle at center, rgba(0,120,212,0.2) 0%, transparent 70%)',
        'neon-border':     'linear-gradient(135deg, rgba(0,191,255,0.4), rgba(124,58,237,0.4))',
      },
      boxShadow: {
        'glow-blue':    '0 0 20px rgba(0,120,212,0.4), 0 0 60px rgba(0,120,212,0.1)',
        'glow-cyan':    '0 0 20px rgba(0,191,255,0.4)',
        'glow-purple':  '0 0 20px rgba(124,58,237,0.4)',
        'glow-emerald': '0 0 20px rgba(0,230,118,0.4)',
        'glow-rose':    '0 0 20px rgba(255,77,109,0.4)',
        'card':         '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'card-hover':   '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)',
      },
      animation: {
        'pulse-slow':   'pulse 3s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
        'glow-pulse':   'glowPulse 2s ease-in-out infinite alternate',
        'slide-in':     'slideIn 0.3s ease-out',
        'fade-up':      'fadeUp 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowPulse: {
          '0%':   { boxShadow: '0 0 10px rgba(0,120,212,0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0,120,212,0.7), 0 0 60px rgba(0,120,212,0.2)' },
        },
        slideIn: {
          '0%':   { opacity: 0, transform: 'translateX(-10px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
