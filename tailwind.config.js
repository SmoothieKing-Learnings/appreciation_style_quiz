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
        // Easily Editable structural colors for the 4 Communication Style types
        'style-teacher': '#F4A261',
        'style-role': '#E76F51',
        'style-coach': '#2A9D8F',
        'style-supporter': '#E9C46A',
      }
    },
  },
  plugins: [],
}
