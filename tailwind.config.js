module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        128: '32rem',
        144: '36rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
