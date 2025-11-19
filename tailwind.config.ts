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
        // Status Colors (Semantic, High Saturation)
        alert: {
          DEFAULT: "#DC2626",
          hover: "#B91C1C",
          active: "#991B1B",
          light: "#FEE2E2",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FEF3C7",
        },
        success: {
          DEFAULT: "#059669",
          light: "#D1FAE5",
        },
        info: {
          DEFAULT: "#3B82F6",
          hover: "#2563EB",
          light: "#DBEAFE",
        },
        // Neutrals
        neutral: {
          DEFAULT: "#0F172A",
          bg: "#F8FAFC",
          surface: "#FFFFFF",
          subtle: "#F1F5F9",
        },
        // Borders
        border: {
          strong: "#E2E8F0",
          weak: "#CBD5E1",
          subtle: "#F1F5F9",
        },
        // Text
        text: {
          primary: "#0F172A",
          secondary: "#475569",
          muted: "#94A3B8",
          inverse: "#F8FAFC",
        },
        // Legacy support
        secondary: "#3B82F6",
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(15, 23, 42, 0.05)',
        'md': '0 4px 6px rgba(15, 23, 42, 0.07), 0 2px 4px rgba(15, 23, 42, 0.05)',
        'lg': '0 10px 15px rgba(15, 23, 42, 0.1), 0 4px 6px rgba(15, 23, 42, 0.05)',
        'xl': '0 20px 25px rgba(15, 23, 42, 0.15), 0 10px 10px rgba(15, 23, 42, 0.05)',
        'button-hover': '0 4px 12px rgba(220, 38, 38, 0.15)',
        'button-active': '0 2px 6px rgba(220, 38, 38, 0.2)',
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
export default config;

