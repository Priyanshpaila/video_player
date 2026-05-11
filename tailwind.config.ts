import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-serif)", "Georgia", "serif"]
      },
      colors: {
        ink: "#050505",
        paper: "#f4efe5",
        acid: "#d7ff3f",
        ember: "#ff6a3d",
        violet: "#8b5cf6"
      },
      boxShadow: {
        editorial: "0 38px 120px rgba(0,0,0,0.58)",
        cut: "0 18px 70px rgba(215,255,63,0.10)"
      }
    }
  },
  plugins: []
};

export default config;
