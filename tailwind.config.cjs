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
      colors: {
        "cold-red": "#770101",
      },
    },
  },
};
