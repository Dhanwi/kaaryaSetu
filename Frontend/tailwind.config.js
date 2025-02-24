import defaultTheme from "tailwindcss/defaultTheme";

import colors from "tailwindcss/colors";

import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",

  // Or if using `src` directory:
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
];
export const darkMode = "class";
export const theme = {
  // rest of the code
  extend: {
    colors: {
      // Adding the individual gradient colors with short names
      primary1: "#6DD5FA", // First gradient start color
      primary2: "#2980B9", // First gradient end color
      secondary1: "#FF6F61", // Secondary gradient start color
      secondary2: "#FFC371", // Secondary gradient end color
      gradientStart: "#04363D", // New gradient start color
      gradientMiddle: "#078383", // New gradient middle color
      gradientEnd: "#94D9D9", // New gradient end color
      goldDark: "#78350F", // yellow-900 hex
      goldLight: "#FFFFFF",
    },
    backgroundImage: {
      // Naming gradients with meaningful short names
      gradientPrimary: "linear-gradient(90deg, #6DD5FA, #2980B9)",
      gradientSecondary: "linear-gradient(90deg, #FF6F61, #FFC371)",
      gradientTertiary: "linear-gradient(-236deg, rgba(4,54,61,1) 20%, rgba(7,131,131,1) 55%, rgba(148,217,217,1) 60%)",
      goldGradient: "linear-gradient(-236deg, #78350F 40%, #FACC15 65%, #FFFFFF 70%)",
    },
    animation: {
      scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
    },
    keyframes: {
      scroll: {
        to: {
          transform: "translate(calc(-50% - 0.5rem))",
        },
      },
    },
  },
};
export const plugins = [addVariablesForColors];

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
