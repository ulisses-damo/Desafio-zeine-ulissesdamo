/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A90E2',
          50: '#F0F8FF',
          100: '#E8F4FD',
          500: '#4A90E2',
          600: '#5BA0F2',
          700: '#4a8bc2',
        },
        blue: {
          medical: '#5b9bd5',
        },
        background: {
          DEFAULT: '#f8f9ff',
          card: '#ffffff',
        }
      },
      maxWidth: {
        mobile: '425px',
      },
      screens: {
        'mobile-s': '320px',
        'mobile-m': '375px', 
        'mobile-l': '425px',
      },
      borderRadius: {
        '4xl': '25px',
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(135deg, #4A90E2 0%, #5BA0F2 100%)',
      }
    },
  },
  plugins: [],
}