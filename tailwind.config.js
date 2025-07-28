/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f0e8d5',
        secondary: '#212842',
        1: '#f2f2eb',
        2: '#deded7',
        3: '#928a97',
        4: '#f85f73',
        5: '#6471A1',
      },
      spacing: {
        horizontal: '1.5rem',
        vertical: '1rem',
      },
      fontSize: {
        gh: '18px',
        fr: '14px',
        tw: '12px',
      }
    },
  },
  plugins: [],
}