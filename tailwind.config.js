/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#ED7D4D',
        'mustard-yellow': '#EACA53',
        blue: '#3F8CC6',
        'deep-purple': '#695098',
        red: '#ED7264',
      },
      maxWidth: {
        320: '320px',
        350: '350px',
        400: '400px',
        500: '500px',
        600: '600px',
        750: '750px',
        864: '864px',
        924: '924px',
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
      },
      spacing: {
        150: '150px',
      },
    },
  },
  plugins: [
    // https://gist.github.com/parafeu/3cf1c52d374a52091a685ce030563411
    // require('./src/plugins/scrollbar.js'),
    // require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};
