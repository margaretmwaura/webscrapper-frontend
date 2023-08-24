/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
    // './node_modules/flowbite/**/*.js',
  ],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      '2xl': '1535px',
      // => @media (max-width: 1535px) { ... }

      xl: '1279px',
      // => @media (max-width: 1279px) { ... }

      lg: '1023px',
      // => @media (max-width: 1023px) { ... }

      md: '767px',
      // => @media (max-width: 767px) { ... }

      sm: '639px',
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      colors: {
        orange: '#ED7D4D',
        'mustard-yellow': '#EACA53',
        blue: '#3F8CC6',
        'deep-purple': {
          100: '#69509810',
          DEFAULT: '#695098',
        },
        'lightest-blue': '#F0F8FF90',
        'light-blue': '#F0F8FF70',
        'lighter-blue': '#F0F8FF',
        red: '#ED7264',
        'uranian-blue': '#AFDBF580',
        'snow-white': '#F6F6F6',
        'millenial-pink': '#FFD1DC',
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
        160: '160px',
        170: '170px',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont'],
        body: ['"Open Sans"'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
      boxShadow: {
        DEFAULT: '0px 5px 50px 0px rgba(0, 0, 0, 0.2)',
      },
      height: {
        1: '1px',
      },
      animation: {
        // Bounces 5 times 1s equals 5 seconds
        bounce: 'bounce 1s ease-in-out 5',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    // https://gist.github.com/parafeu/3cf1c52d374a52091a685ce030563411
    // require('./src/plugins/scrollbar.js'),
    // require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/aspect-ratio'),
    require('tw-elements/dist/plugin'),
    // require('flowbite/plugin'),
  ],
};
