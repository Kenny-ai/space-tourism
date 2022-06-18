/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'bellefair': ['Bellefair', 'serif'],
      'barlow': ['Barlow Condensed', 'sans-serif'],
    },
    extend: {
      backgroundColor: {
        'nav-bg': '#0b0d17'
      }
    },
  },
  plugins: [],
}
