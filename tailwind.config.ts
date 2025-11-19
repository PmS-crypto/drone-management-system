import type { Config } from "tailwindcss";
import { tokens } from "./src/design-system/tokens";

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
        // Background surfaces
        bg: {
          base: tokens.colors.bg.base,
          background: tokens.colors.bg.background,
          surface: tokens.colors.bg.surface,
          raised: tokens.colors.bg.raised,
          sunken: tokens.colors.bg.sunken,
        },
        // Border
        border: {
          DEFAULT: tokens.colors.border.default,
          hover: tokens.colors.border.hover,
          active: tokens.colors.border.active,
          accent: tokens.colors.border.accent,
        },
        // Text colors
        text: {
          primary: tokens.colors.text.primary,
          secondary: tokens.colors.text.secondary,
          tertiary: tokens.colors.text.tertiary,
          disabled: tokens.colors.text.disabled,
        },
        // Accent (Linear indigo-purple)
        accent: {
          primary: tokens.colors.accent.primary,
          hover: tokens.colors.accent.hover,
          soft: tokens.colors.accent.soft,
          border: tokens.colors.accent.border,
        },
        // Semantic colors
        alert: tokens.colors.semantic.alert,
        success: tokens.colors.semantic.success,
        warning: tokens.colors.semantic.warning,
        info: tokens.colors.semantic.info,
        // Legacy mappings
        surface: {
          base: tokens.colors.bg.base,
          surface: tokens.colors.bg.surface,
        },
        danger: {
          DEFAULT: tokens.colors.semantic.alert,
        },
      },
      fontFamily: {
        sans: [...tokens.typography.fontFamily.sans],
        mono: [...tokens.typography.fontFamily.mono],
      },
      fontSize: {
        display: [...tokens.typography.fontSize.display] as [string, { lineHeight: string; fontWeight: string; letterSpacing: string }],
        h1: [...tokens.typography.fontSize.h1] as [string, { lineHeight: string; fontWeight: string; letterSpacing: string }],
        h2: [...tokens.typography.fontSize.h2] as [string, { lineHeight: string; fontWeight: string; letterSpacing: string }],
        pageTitle: [...tokens.typography.fontSize.pageTitle] as [string, { lineHeight: string; fontWeight: string; letterSpacing: string }],
        sectionHeader: [...tokens.typography.fontSize.sectionHeader] as [string, { lineHeight: string; fontWeight: string; letterSpacing: string }],
        cardTitle: [...tokens.typography.fontSize.cardTitle] as [string, { lineHeight: string; fontWeight: string; letterSpacing: string }],
        body: [...tokens.typography.fontSize.body] as [string, { lineHeight: string; fontWeight: string; letterSpacing: string }],
        bodySmall: [...tokens.typography.fontSize.bodySmall] as [string, { lineHeight: string; fontWeight: string; letterSpacing: string }],
        label: [...tokens.typography.fontSize.label] as [string, { lineHeight: string; fontWeight: string; letterSpacing: string }],
        meta: [...tokens.typography.fontSize.meta] as [string, { lineHeight: string; fontWeight: string; letterSpacing: string }],
        value: [...tokens.typography.fontSize.value] as [string, { lineHeight: string; fontWeight: string; letterSpacing: string }],
      },
      spacing: {
        ...tokens.spacing,
        gutter: tokens.spacing.gutter,
        section: tokens.spacing.section,
        cardPadding: tokens.spacing.cardPadding,
        rowGap: tokens.spacing.rowGap,
      },
      borderRadius: {
        ...tokens.radius,
        DEFAULT: tokens.radius.md,
      },
      boxShadow: {
        ...tokens.shadow,
        DEFAULT: tokens.shadow.md,
      },
      backdropBlur: {
        glass: '20px',
      },
      transitionTimingFunction: {
        DEFAULT: tokens.transition.easeOut,
        easeOut: tokens.transition.easeOut,
        easeInOut: tokens.transition.easeInOut,
      },
      transitionDuration: {
        DEFAULT: '200ms',
        fast: '180ms',
        slow: '220ms',
      },
    },
  },
  plugins: [],
};
export default config;
