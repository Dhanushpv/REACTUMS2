/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        'login_background3': "url('/images/login_background3.jpg')",

      }
    },
  },
  plugins: [],
}

