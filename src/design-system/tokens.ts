/**
 * Design System Tokens - Linear.app 2025 Aesthetic
 * True black backgrounds, indigo-purple accents, generous spacing, frosted glass
 */

export const tokens = {
  // ============================================
  // COLORS - Linear Palette
  // ============================================
  colors: {
    // Background surfaces (true black/near-black)
    bg: {
      base: '#000000',           // True black
      background: '#0A0A0F',     // Near-black (slightly blue-tinted)
      surface: '#0D1117',        // GitHub-style near-black
      raised: '#161B22',         // Elevated panels
      sunken: '#0A0A0F',         // Sidebar/darker areas
    },

    // Border (subtle, only on hover/active)
    border: {
      default: 'rgba(255, 255, 255, 0.08)',      // Very subtle default
      hover: 'rgba(255, 255, 255, 0.12)',        // On hover
      active: '#1E2328',                          // Active state
      accent: '#A78BFA',                          // Indigo accent border
    },

    // Text colors
    text: {
      primary: 'rgba(255, 255, 255, 0.95)',      // Almost white
      secondary: 'rgba(255, 255, 255, 0.70)',    // Muted
      tertiary: 'rgba(255, 255, 255, 0.50)',    // Further muted
      disabled: 'rgba(255, 255, 255, 0.30)',     // Disabled
    },

    // Accent colors (Linear indigo-purple)
    accent: {
      primary: '#8B5CF6',         // Main indigo-purple
      hover: '#A78BFA',           // Lighter on hover
      soft: 'rgba(139, 92, 246, 0.15)',  // Soft background
      border: 'rgba(139, 92, 246, 0.30)', // Soft border
    },

    // Semantic colors (crimson only for high alerts)
    semantic: {
      alert: '#EF4444',           // Crimson for destructive/high alerts
      success: '#10B981',         // Green
      warning: '#F59E0B',         // Amber
      info: '#06B6D4',            // Cyan (minimal use)
    },
  },

  // ============================================
  // TYPOGRAPHY - Inter, Generous Line Height
  // ============================================
  typography: {
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      mono: ['SF Mono', 'Monaco', 'Courier New', 'monospace'],
    },
    fontSize: {
      // Large headings (32-48px)
      display: ['48px', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.02em' }],
      h1: ['40px', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.02em' }],
      h2: ['32px', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '-0.01em' }],
      // Section headers
      pageTitle: ['32px', { lineHeight: '1.6', fontWeight: '600', letterSpacing: '-0.01em' }],
      sectionHeader: ['18px', { lineHeight: '1.6', fontWeight: '600', letterSpacing: '-0.01em' }],
      cardTitle: ['16px', { lineHeight: '1.6', fontWeight: '600', letterSpacing: '0' }],
      // Body text (Inter Medium 500)
      body: ['15px', { lineHeight: '1.7', fontWeight: '500', letterSpacing: '0' }],
      bodySmall: ['14px', { lineHeight: '1.7', fontWeight: '500', letterSpacing: '0' }],
      // Labels
      label: ['13px', { lineHeight: '1.6', fontWeight: '500', letterSpacing: '0' }],
      meta: ['12px', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '0' }],
      // Values
      value: ['18px', { lineHeight: '1.5', fontWeight: '600', letterSpacing: '-0.01em' }],
    },
  },

  // ============================================
  // SPACING - Extremely Generous
  // ============================================
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
    '4xl': '48px',
    // Layout-specific
    gutter: '48px',        // Page gutters
    section: '40px',       // Between sections
    cardPadding: '24px',   // Card internal padding
    rowGap: '16px',        // Between rows
  },

  // ============================================
  // RADIUS - Soft, 12-16px
  // ============================================
  radius: {
    sm: '6px',    // Small elements
    md: '12px',   // Cards, panels (Linear standard)
    lg: '16px',   // Large containers
    full: '9999px', // Pills
  },

  // ============================================
  // SHADOWS - Very Subtle
  // ============================================
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 12px rgba(0, 0, 0, 0.15)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.20)',
    // Inner shadows for frosted glass
    inner: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
    // Glow effects
    glow: '0 0 12px rgba(139, 92, 246, 0.20)',
    glowStrong: '0 0 20px rgba(139, 92, 246, 0.30)',
  },

  // ============================================
  // TRANSITIONS - Buttery Smooth (180-220ms)
  // ============================================
  transition: {
    default: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 180ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 220ms cubic-bezier(0.4, 0, 0.2, 1)',
    // Easing functions
    easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },

  // ============================================
  // FROSTED GLASS
  // ============================================
  glass: {
    background: 'rgba(255, 255, 255, 0.04)',
    backdrop: 'blur(20px)',
    border: 'rgba(255, 255, 255, 0.08)',
  },

  // ============================================
  // LAYOUT
  // ============================================
  layout: {
    sidebarWidth: '240px',
    rowHeight: '48px',
    buttonHeight: '40px',
    inputHeight: '40px',
  },
} as const;
