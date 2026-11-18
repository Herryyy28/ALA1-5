/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#263B80',
          secondary: '#5269C9',
          accent: '#8065D9',
          bg: '#F7F8FC',
          surface: '#FFFFFF',
          text: '#172033',
          muted: '#778198',
          border: '#E8EAF2',
          success: '#16865B',
          warning: '#D99A2B',
          danger: '#D94D59',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Public Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(23, 32, 51, 0.05), 0 1px 4px -1px rgba(23, 32, 51, 0.03)',
        'card-hover': '0 8px 24px -4px rgba(38, 59, 128, 0.08), 0 4px 12px -2px rgba(38, 59, 128, 0.04)',
        'premium': '0 12px 32px -4px rgba(38, 59, 128, 0.12), 0 4px 16px -2px rgba(38, 59, 128, 0.06)',
      }
    },
  },
  plugins: [],
}
