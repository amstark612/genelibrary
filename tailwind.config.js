/** @type {import('tailwindcss').Config} */
export default {
  content: [    
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#fafafa',
      'cream': '#fdf0d5',
      'camel': '#dda15e',
      'dark-blue': '#003049',
      'blue': '#D4E3EC',
      'light-blue': '#C6DAE6',
      'red': '#c1121f',
      'dark-red': '#780000',

      'black': '#151A22',
      'stone': '#465048',
      'olive': '#535C3F',
      'camel': '#B7855D',
    },
    extend: {},
  },
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [],
}

