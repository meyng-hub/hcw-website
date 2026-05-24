import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#f0fafa",
          100: "#ccefef",
          200: "#99dfdf",
          300: "#5ec5c5",
          400: "#2fa8a8",
          500: "#0d8c8c",
          600: "#0d6e6e", // Primary — HCW teal
          700: "#0a5555",
          800: "#073d3d",
          900: "#042828",
          950: "#021414",
        },
        amber: {
          400: "#fbbf24",
          500: "#f5a623", // Accent — CAR sun
          600: "#d97706",
        },
        cream: {
          50: "#fdf8f0", // Warm background
          100: "#faf0e0",
          200: "#f5e6cc",
        },
        charcoal: {
          900: "#1c1c2e", // Dark text
          800: "#2d2d42",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, rgba(13,110,110,0.85) 0%, rgba(28,28,46,0.7) 100%)",
        "card-gradient":
          "linear-gradient(180deg, transparent 40%, rgba(28,28,46,0.85) 100%)",
      },
      animation: {
        "count-up": "countUp 2s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
