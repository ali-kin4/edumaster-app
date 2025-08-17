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
        primary: {
          DEFAULT: '#6366f1',
          hover: '#eef2ff',
        },
        background: 'var(--background)',
        card: 'var(--card)',
        border: 'var(--border)',
        input: 'var(--input)',
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        }
      },
      animation: {
        'gradient-x': 'gradient-x 5s ease infinite',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'slide-in': 'slide-in 0.5s ease-out forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          }
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'fade-in-up': {
          from: { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          to: { 
            opacity: '1', 
            transform: 'translateY(0)' 
          }
        },
        'slide-in': {
          from: { 
            opacity: '0', 
            transform: 'translateX(20px)' 
          },
          to: { 
            opacity: '1', 
            transform: 'translateX(0)' 
          }
        }
      },
      perspective: {
        '1000': '1000px',
      }
    },
  },
  plugins: [],
}