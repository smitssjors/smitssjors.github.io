/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_layouts/**/*.html", "./*.{html,md}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
