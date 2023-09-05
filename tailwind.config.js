/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/html/utils/withMT");


module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],
}

