import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      transparent: 'transparent',
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      white: 'var(--white)',
      black: 'var(--black)',
      green: 'var(--green)',
      skyblue: 'var(--skyblue)',
    },
    screens: {
      ...defaultTheme.screens,
      xl: '1240px',
    },
    }

  },
  plugins: [],
};
