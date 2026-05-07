/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
    './sections/**/*.{html,js,jsx}',
    './styles/**/*.{js,jsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'primary-black': '#1A232E',
        'secondary-white': '#c7c7c7',
        // Remap purple → brand blue #0077b9 (aplica a todas las clases purple-* del sitio)
        purple: {
          50:  '#e6f3fb',
          100: '#cce6f7',
          200: '#99cdef',
          300: '#66b4e7',
          400: '#339bdf',
          500: '#0077b9',
          600: '#005f94',
          700: '#004770',
          800: '#002f4b',
          900: '#001727',
          950: '#000c14',
        },
        // Color secundario — rojo logo LATAM
        'brand-red': {
          300: '#ff8080',
          400: '#ff5757',
          500: '#ff3434',
          600: '#cc0000',
        },
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
    },
  },
  plugins: [],
}
