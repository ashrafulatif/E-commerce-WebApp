/* eslint-disable no-undef */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      customBlue: "#1DA1F2",
      customGray: "#F5F5F5",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
};
export const plugins = [
  require("@tailwindcss/forms"),
  require("@tailwindcss/typography"),
  require("@tailwindcss/aspect-ratio"),
];

