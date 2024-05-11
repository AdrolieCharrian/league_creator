/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "sidebar-light":"#D7A67B",
        "sidebar-light2":"#C08754",
        "sidebar-dark":"#6A4D71",
        "sidebar-dark2":"#36273A",
        "background-light":"#D9D9D9",
        "background-dark":"#1B1B1B"
      },
    },
  },
  plugins: [],
};
