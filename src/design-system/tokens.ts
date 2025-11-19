/**
 * UNIFIED DESIGN TOKENS
 * 
 * Single source of truth for light and dark themes.
 * Each theme exposes identical token structure.
 * Components reference tokens, not themes directly.
 */

export const theme = {
  light: {
    // ============ COLOR PALETTE ============
    colors: {
      // Semantic colors (same in both themes)
      alert: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
      info: '#06B6D4',
    },

    // ============ SURFACES ============
    surfaces: {
      base: '#FAFAFA',        // Page background
      surface1: '#FFFFFF',    // Cards, panels (highest)
      surface2: '#F7F7F7',    // Secondary cards
      surface3: '#F1F1F3',    // Tertiary, hover states
      
      // Overlays
      overlay: 'rgba(0, 0, 0, 0.5)',
      scrim: 'rgba(0, 0, 0, 0.08)',
      
      // Semantic surface colors
      alert: 'rgba(239, 68, 68, 0.06)',    // Alert background
      success: 'rgba(16, 185, 129, 0.06)',
      warning: 'rgba(245, 158, 11, 0.06)',
      info: 'rgba(6, 182, 212, 0.06)',
    },

    // ============ TEXT ============
    text: {
      primary: '#1A1A1A',              // Primary text (highest contrast)
      secondary: 'rgba(0, 0, 0, 0.55)', // Secondary, reduced prominence
      muted: 'rgba(0, 0, 0, 0.38)',    // Tertiary, placeholders
      inverse: '#FFFFFF',               // Text on dark backgrounds
    },

    // ============ BORDERS ============
    borders: {
      subtle: 'rgba(0, 0, 0, 0.08)',   // Dividers, light borders
      muted: 'rgba(0, 0, 0, 0.12)',    // Standard borders
      strong: 'rgba(0, 0, 0, 0.2)',    // Prominent borders
      accent: '#6366F1',                // Interactive borders
    },

    // ============ SHADOWS ============
    shadows: {
      xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
      sm: '0 2px 8px rgba(0, 0, 0, 0.06)',
      md: '0 8px 24px rgba(0, 0, 0, 0.06)',
      lg: '0 20px 48px rgba(0, 0, 0, 0.08)',
      inner: 'inset 0 1px 1px rgba(255, 255, 255, 0.04)',
    },

    // ============ ACCENT ============
    accent: {
      primary: '#6366F1',
      hover: '#4F46E5',
      active: '#4338CA',
      light: 'rgba(99, 102, 241, 0.08)',
    },
  },

  dark: {
    // ============ COLOR PALETTE ============
    colors: {
      alert: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
      info: '#06B6D4',
    },

    // ============ SURFACES ============
    surfaces: {
      base: '#0D0D0F',        // Page background (dark)
      surface1: '#141416',    // Cards (highest, brightest dark)
      surface2: '#19191C',    // Secondary cards
      surface3: '#1F1F24',    // Tertiary, hover states
      
      overlay: 'rgba(0, 0, 0, 0.7)',
      scrim: 'rgba(0, 0, 0, 0.4)',
      
      alert: 'rgba(239, 68, 68, 0.12)',
      success: 'rgba(16, 185, 129, 0.12)',
      warning: 'rgba(245, 158, 11, 0.12)',
      info: 'rgba(6, 182, 212, 0.12)',
    },

    // ============ TEXT ============
    text: {
      primary: 'rgba(255, 255, 255, 0.95)',
      secondary: 'rgba(255, 255, 255, 0.65)',
      muted: 'rgba(255, 255, 255, 0.45)',
      inverse: '#1A1A1A',
    },

    // ============ BORDERS ============
    borders: {
      subtle: 'rgba(255, 255, 255, 0.06)',
      muted: 'rgba(255, 255, 255, 0.10)',
      strong: 'rgba(255, 255, 255, 0.2)',
      accent: '#8B8DFF',
    },

    // ============ SHADOWS ============
    shadows: {
      xs: '0 1px 2px rgba(0, 0, 0, 0.3)',
      sm: '0 2px 6px rgba(0, 0, 0, 0.5)',
      md: '0 8px 24px rgba(0, 0, 0, 0.35)',
      lg: '0 20px 48px rgba(0, 0, 0, 0.4)',
      inner: 'inset 0 1px 1px rgba(255, 255, 255, 0.04)',
    },

    // ============ ACCENT ============
    accent: {
      primary: '#8B8DFF',
      hover: '#A5A7FF',
      active: '#7B7DFF',
      light: 'rgba(139, 141, 255, 0.12)',
    },
  },
};

// ============ SPACING TOKENS ============
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
};

// ============ TYPOGRAPHY TOKENS ============
export const typography = {
  display: {
    size: '28px',
    weight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.3px',
  },
  h1: {
    size: '22px',
    weight: 500,
    lineHeight: 1.25,
    letterSpacing: '-0.2px',
  },
  h2: {
    size: '18px',
    weight: 500,
    lineHeight: 1.3,
  },
  body: {
    size: '15px',
    weight: 400,
    lineHeight: 1.45,
  },
  label: {
    size: '13px',
    weight: 500,
    lineHeight: 1.3,
  },
  meta: {
    size: '12px',
    weight: 400,
    lineHeight: 1.3,
  },
};

// ============ RADIUS TOKENS ============
export const radii = {
  card: '8px',
  button: '6px',
  input: '6px',
  full: '9999px',
};

// ============ MOTION TOKENS ============
export const motion = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

// ============ SIZE TOKENS ============
export const sizes = {
  pagePadding: '32px',
  sectionGap: '40px',
  cardPadding: '24px',
  elementGap: '16px',
  rowHeight: '56px',
};
