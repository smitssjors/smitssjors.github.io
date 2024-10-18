/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_layouts/**/*.liquid", "./*.{html,md}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
