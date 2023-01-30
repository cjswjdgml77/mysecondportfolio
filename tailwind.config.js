/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        second: "#EAEFF2",
        dimWhite: "rgba(255, 255, 255, 0.7)",
      },
      transitionTimingFunction: {
        myeaseout: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  screen: {
    xs: "480px",
    ss: "620px",
    sm: "768px",
    md: "1060px",
    lg: "1200px",
    xl: "1700px",
  },
  keyframes: {
    textshow: {
      "0%": { transform: "translateY(100%)" },
      "100%": { transform: "translateY(0%)" },
    },
  },
  animation: {
    "text-show": "textshow 1s linear infinite",
  },
  plugins: [],
};
