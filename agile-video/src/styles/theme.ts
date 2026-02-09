import { colors } from './colors';

export const theme = {
  colors,

  fonts: {
    code: "'Fira Code', 'Consolas', 'Courier New', monospace",
    sans: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
  },

  fontSizes: {
    xs: '24px',
    sm: '28px',
    md: '32px',
    lg: '40px',
    xl: '56px',
    xxl: '72px',
    code: '28px',
    codeSmall: '24px',
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
    code: 1.6,
  },

  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.1)',
    md: '0 4px 8px rgba(0,0,0,0.15)',
    lg: '0 8px 16px rgba(0,0,0,0.2)',
    xl: '0 12px 24px rgba(0,0,0,0.25)',
    code: '0 4px 12px rgba(0,0,0,0.3)',
  },

  video: {
    width: 1920,
    height: 1080,
    fps: 30,
  },
};

export type Theme = typeof theme;
