/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      backgroundImage: {
        shikinocliff: "url(https://i.ibb.co/RjTHYv6/shikinocliff.gif)",
        menuglitch: "url(./src/assets/menuglitch.png)",
      },
    },
  },
};
