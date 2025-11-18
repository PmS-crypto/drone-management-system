import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        alert: "#DC2626",
        warning: "#F59E0B",
        success: "#22C55E",
        neutral: "#0F172A",
        secondary: "#3B82F6",
        text: "#F1F5F9",
      },
    },
  },
  plugins: [],
};
export default config;

