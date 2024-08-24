/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "domino-board": "url('/public/img/domino-board.svg')",
        "404-bg": "url('/public/img/404-bg.svg')",
      },
      backgroundColor: {
        "domino-board": "#DFDBE5",
        "404-bg": "#DFDBE5",
      }
    }
  }
}

