// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
        colors: {
          azul: '#251A79', 
          celeste: '#B0B8F9',
          naranja: '#FF854C',
          naranjasuave: '#F9F3F3',
          gris: '#8B7F7F',
      },
    },
  },
  plugins: [],
}
