const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_layouts/**/*.liquid",
    "./_posts/**/*.{html,md}",
    "./*.{html,md}",
  ],
  safelist: [{ pattern: /hljs.+/ }],
  theme: {
    extend: {
      fontFamily: {
        "sans": ['"InterVariable"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
