import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#000000",
      white: {
        100: "#ffffff",
        200: "#f7f8fd",
        300: "#f2f4ff",
      },
      red: "#D73737",
      "light-red": "#E98788",
      gray: "#647196",
      purple: "#ad1fea",
      "light-purple": "#C659F6",
      blue: {
        100: "#62bcfa",
        200: "#4661e6",
        300: "#3a4374",
        400: "#373f68",
      },
      "light-blue": "#7C91F7",
      "light-dark-blue": "#646EA4",
      orange: "#f49f85",
    },
    extend: {
      backgroundImage: {
        "mobile-header":
          "url('/assets/suggestions/mobile/background-header.png')",
        "tablet-header":
          "url('/assets/suggestions/tablet/background-header.png')",
        "desktop-header":
          "url('/assets/suggestions/desktop/background-header.png')",
      },
      keyframes: {
        moveLeft: {
          "0%": { right: "-500px" },
          "100%": { right: "0" },
        },
      },
      animation: {
        enter: "moveLeft .3s linear",
      },
    },
  },
  plugins: [],
} satisfies Config;
