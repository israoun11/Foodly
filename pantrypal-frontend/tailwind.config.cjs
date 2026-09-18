/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBF9F3",
        ink: "#181611",
        orange: {
          DEFAULT: "#FF5A1F",
          dark: "#D8440F",
          light: "#FF8A57",
        },
        leaf: {
          DEFAULT: "#3F7D46",
          light: "#6FA36B",
        },
        yolk: "#F6C453",
        cream: "#F1E6D3",
        sand: "#EDE7DA",
      },
      fontFamily: {
        display: ["Instrument Serif", "serif"],
        body: ["Work Sans", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "0.95" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1" }],
      },
      boxShadow: {
        edge: "6px 6px 0 0 rgba(24, 22, 17, 1)",
        soft: "0 20px 60px -20px rgba(24, 22, 17, 0.25)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "fade-up": "fade-up 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
