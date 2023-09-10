/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {},
    minHeight: {
      'screen': '100vh',
      '15': '60px',
    }
  },
  plugins: [],
}

