const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_layouts/**/*.liquid", "./*.{html,md}"],
  theme: {
    extend: {
      fontFamily: {
        "sans": ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
