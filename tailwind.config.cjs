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
        primary: "#7158E2",
        secondary: "#ABA398",
      },
    },
  },
  plugins: [],
};
