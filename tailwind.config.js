/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#0a0e1a',
        bgSecondary: '#0f1629',
        bgCard: '#121a2e',
        bgGlass: 'rgba(18, 26, 46, 0.7)',
        borderBase: 'rgba(255, 255, 255, 0.08)',
        borderAccent: 'rgba(212, 175, 55, 0.35)',
        gold: '#d4af37',
        goldLight: '#f0d060',
        goldDark: '#a8882a',
        goldGlow: 'rgba(212, 175, 55, 0.15)',
        textPrimary: '#f0f4ff',
        textSecondary: '#8a9ab5',
        textMuted: '#5a6880',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.4)',
        gold: '0 4px 24px rgba(212, 175, 55, 0.25)',
        hover: '0 8px 40px rgba(212, 175, 55, 0.2)',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'fade-in-delayed': 'fadeIn 0.5s ease 0.15s both',
        'fade-in-left': 'fadeInLeft 0.5s ease forwards',
        'spin-slow': 'spin 0.7s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}
