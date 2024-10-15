/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neongreen': '#1FFF88',
        'neonblue': '#1FD6FF',
      },
    },
  },
  plugins: [],
}