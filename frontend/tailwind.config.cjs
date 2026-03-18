// tailwind.config.cjs
module.exports = {
  darkMode: 'class', // <-- add this line
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          300: '#93c5fd',
          500: '#4f46e5', // primary main
          700: '#3730a3'
        },
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          300: '#7dd3fc',
          500: '#06b6d4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}
