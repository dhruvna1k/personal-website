/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        'tea_rose': {
          DEFAULT: '#ebbab9',
          100: '#411312',
          200: '#822625',
          300: '#c43a37',
          400: '#d87876',
          500: '#ebbab9',
          600: '#efc6c6',
          700: '#f3d5d4',
          800: '#f7e3e2',
          900: '#fbf1f1'
        },
        'timberwolf': {
          DEFAULT: '#c9c5ba',
          100: '#2b2922',
          200: '#575244',
          300: '#827b66',
          400: '#a7a18f',
          500: '#c9c5ba',
          600: '#d4d1c8',
          700: '#dfdcd6',
          800: '#e9e8e4',
          900: '#f4f3f1'
        },
        'cambridge_blue': {
          DEFAULT: '#97b1a6',
          100: '#1c2521',
          200: '#384a43',
          300: '#547064',
          400: '#719485',
          500: '#97b1a6',
          600: '#abc0b7',
          700: '#c0d0c9',
          800: '#d5dfdb',
          900: '#eaefed'
        },
        'air_force_blue': {
          DEFAULT: '#698996',
          100: '#151b1e',
          200: '#2a373c',
          300: '#3f525a',
          400: '#546e78',
          500: '#698996',
          600: '#87a1ab',
          700: '#a5b8c0',
          800: '#c3d0d5',
          900: '#e1e7ea'
        },
        'caribbean_current': {
          DEFAULT: '#407076',
          100: '#0d1718',
          200: '#1a2d30',
          300: '#274448',
          400: '#335a5f',
          500: '#407076',
          600: '#5799a2',
          700: '#80b4ba',
          800: '#aacdd1',
          900: '#d5e6e8'
        }
      },
      animation: {
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [],
}; 