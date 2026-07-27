/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0C10',
        darkSteel: '#1C1F2E',
        crimson: '#8A1C1C',
        gold: '#D4AF37',
        boneWhite: '#E5E7EB',
        smokeGray: '#9CA3AF',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}