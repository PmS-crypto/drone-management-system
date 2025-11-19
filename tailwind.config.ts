import type { Config } from "tailwindcss";
import { typography, spacing, radii } from "./src/design-system/tokens";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background surfaces (CSS variables for theme switching)
        bg: {
          base: 'var(--bg-base)',
          surface1: 'var(--bg-surface1)',
          surface2: 'var(--bg-surface2)',
          surface3: 'var(--bg-surface3)',
          overlay: 'var(--bg-overlay)',
          scrim: 'var(--bg-scrim)',
          alert: 'var(--bg-alert)',
          success: 'var(--bg-success)',
          warning: 'var(--bg-warning)',
          info: 'var(--bg-info)',
        },
        // Text colors
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },
        // Border
        border: {
          subtle: 'var(--border-subtle)',
          muted: 'var(--border-muted)',
          strong: 'var(--border-strong)',
          accent: 'var(--border-accent)',
        },
        // Accent
        accent: {
          primary: 'var(--accent-primary)',
          hover: 'var(--accent-hover)',
          active: 'var(--accent-active)',
          light: 'var(--accent-light)',
        },
        // Semantic colors
        color: {
          alert: 'var(--color-alert)',
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          info: 'var(--color-info)',
        },
      },
      fontFamily: {
        sans: ['var(--font-family)'],
        mono: ['var(--font-family)'],
        tabular: ['var(--font-family)'],
      },
      fontSize: {
        display: [typography.display.size, { lineHeight: typography.display.lineHeight.toString(), fontWeight: typography.display.weight.toString(), letterSpacing: typography.display.letterSpacing }],
        h1: [typography.h1.size, { lineHeight: typography.h1.lineHeight.toString(), fontWeight: typography.h1.weight.toString(), letterSpacing: typography.h1.letterSpacing }],
        h2: [typography.h2.size, { lineHeight: typography.h2.lineHeight.toString(), fontWeight: typography.h2.weight.toString() }],
        body: [typography.body.size, { lineHeight: typography.body.lineHeight.toString(), fontWeight: typography.body.weight.toString() }],
        label: [typography.label.size, { lineHeight: typography.label.lineHeight.toString(), fontWeight: typography.label.weight.toString() }],
        meta: [typography.meta.size, { lineHeight: typography.meta.lineHeight.toString(), fontWeight: typography.meta.weight.toString() }],
      },
      spacing: {
        ...spacing,
        'page-padding': 'var(--page-padding)',
        'section-gap': 'var(--section-gap)',
        'card-padding': 'var(--card-padding)',
        'element-gap': 'var(--element-gap)',
        'row-height': 'var(--row-height)',
      },
      borderRadius: {
        card: radii.card,
        button: radii.button,
        input: radii.input,
        full: radii.full,
        DEFAULT: radii.card,
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        inner: 'var(--shadow-inner)',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        DEFAULT: '150ms',
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },
    },
  },
  plugins: [],
};
export default config;
