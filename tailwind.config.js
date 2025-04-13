/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true, // centers the container (adds mx-auto)
      
      screens: {
        xl: "1440px", // max width for xl breakpoint
      },
    },
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        gray: "#b2b2b2",
        yellow: "#efff11",
        black: "#070707",
        Black: "#000000",
        White: "#ffffff",
      },
    },
  },
  plugins: [],
}
