/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          750: "#db1818",
        },
      },
    },
  },
  plugins: [],
};
