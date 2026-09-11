/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { display: ['Outfit','system-ui','sans-serif'], mono: ['Space Grotesk','monospace'] },
      colors: {
        skyClamp: '#0ea5e9',
        ribbon: '#ffffff',
        cityBlur: '#7dd3fc'
      }
    }
  },
  plugins: []
}
