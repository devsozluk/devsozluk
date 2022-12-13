/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      colors: {
        background: "#181A1B",
        placeholder: "#9F9F9F",
        primary: "#7158E2",
        secondary: "#ABA398",
        tertiary: "#909090",
      },
    },
  },
  plugins: [],
};
