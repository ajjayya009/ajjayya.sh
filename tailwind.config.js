/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",
    "./assets/**/*.{html,js,css}",
    "./**/*.{html,js,css}"
  ],
  theme: {
    boxShadow: {
      shadow1: '0px 2px 4px 0px rgba(0,0,0,0.06)',
      shadow2: '0px 0px 4px 2px #f55422'
    },
    extend: {
      colors: {
        storm: '#0f172a',
        royal: '#4338ca',
        lavender: '#c4b5fd'
      },
      animation: {
        fade: 'fadeIn .5s ease-in-out',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      fontFamily: {
        sans: ['Inter','sans-serif'],
      },
    },
  },
  plugins: [],
}

