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
      keyframes: {
        "modal-expand": {
          "0%": { transform: "scale(.5)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "modal-close": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(.5)", opacity: "0" }
        }
      },
      animation: {
        "modal-expand": "modal-expand .3s ease forwards",
        "modal-close": "modal-close .3s ease forwards"
      }
    },
  },
  plugins: [],
};
