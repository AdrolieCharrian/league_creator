module.exports = {
  darkMode: 'class', // Habilitar el modo oscuro usando clases
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
        'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      },
      colors: {
        'sidebar-light': '#D7A67B',
        'sidebar-light2': '#C08754',
        'sidebar-dark': '#6A4D71',
        'sidebar-dark2': '#36273A',
        'background-light': '#D9D9D9',
        'background-dark': '#1B1B1B',
        'light-white': '#FFFFFF40',
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
