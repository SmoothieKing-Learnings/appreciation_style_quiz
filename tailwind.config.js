/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      colors: {
        'quiz-bg': '#FFF9EF',
        'quiz-primary': '#930018',
        'quiz-text': '#40000F',
        // Per-style chart colors live in src/data/stylesData.js (STYLE_COLORS).
      }
    },
  },
  plugins: [],
}
