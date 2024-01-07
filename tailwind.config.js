/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
    },
    extend: {
      colors: {
        primary: "hsla(199, 89%, 48%, 1)",
        secondary: "hsla(0, 0%, 71%, 1)",
      },
      screens: {
        'xs': '320px',
        'sm': '425px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      keyframes: {
        'pulse': {
          '0%': { 'opacity': 1 },
          '50%': { 'opacity': 0.8 },
          '100%': { 'opacity': 1 }
        },
        'contentShow': {
          'from': {
            opacity: '0',
            transform: 'translate(-50%, -44%) scale(0.92)',
          },
          'to': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          }
        },
        overlayShow: {
          'from': {
            opacity: '0'
          },
          'to': {
            opacity: '1'
          }
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        pulse: 'pulse infinite 2s linear',
        contentShow: 'contentShow 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        overlayShow: 'overlayShow 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}

