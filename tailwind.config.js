const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#b0bec5', // Замените #243c5a на ваш собственный HEX-код цвета
      },
    },
  },
  plugins: [],
});