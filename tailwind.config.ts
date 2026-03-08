import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FDF2F0",
          100: "#FDE8E4",
          200: "#FACDC5",
          300: "#F5A99C",
          400: "#EF7B6B",
          500: "#DC2626",
          600: "#C41E1E",
          700: "#A31818",
          800: "#831414",
          900: "#6B1111",
        },
        secondary: {
          50: "#EBF0FA",
          100: "#D6E0F5",
          200: "#ADC1EB",
          300: "#7A9ADE",
          400: "#4A74D1",
          500: "#1E3A8A",
          600: "#1A3278",
          700: "#152A65",
          800: "#112153",
          900: "#0D1A42",
        },
        cream: "#FDF2F0",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
