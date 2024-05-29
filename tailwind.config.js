/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Agregamos esta línea para habilitar el modo oscuro usando clases
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
        "sidebar-light": "#D7A67B",
        "sidebar-light2": "#C08754",
        "sidebar-dark": "#6A4D71",
        "sidebar-dark2": "#36273A",
        "background-light": "#D9D9D9",
        "background-dark": "#1B1B1B",
        "light-white": "#FFFFFF40",
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
