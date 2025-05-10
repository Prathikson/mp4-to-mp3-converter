/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables toggling between dark and light
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#000000',
        light: '#f5f5f7',
        accent: '#0071e3', // Apple blue
        grayText: '#6e6e73', // Apple subtle gray
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"San Francisco"', 'sans-serif'],
      },
      transitionProperty: {
        theme: 'background-color, color, border-color, fill, stroke',
      },
    },
  },
  plugins: [],
};
