/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
      },
      colors: {
        gold: {
          400: '#fad643',
          500: '#d4af37', // Classic Gold
          600: '#b4941f',
        },
        cinematic: {
          black: '#050505',
          dark: '#0a0a0a',
          gray: '#1a1a1a',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
