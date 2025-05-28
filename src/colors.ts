// Color palette based on AdvanceAIM website theme
export const colors = {
  // Primary colors - Updated to purple theme
  primary: {
    50: '#f3e8ff',
    100: '#e9d5ff',
    200: '#d8b4fe',
    300: '#c084fc',
    400: '#a855f7',
    500: '#ad43f3', // Main primary color
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
  },

  // Secondary colors
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Accent colors
  accent: {
    purple: '#ad43f3',
    blue: '#0073FF',
    green: '#00D084',
    red: '#FF4757',
    orange: '#FFA726',
    yellow: '#FFEB3B',
  },

  // Dark theme colors
  dark: {
    bg: '#0A0A0A',
    surface: '#1A1A1A',
    border: '#2A2A2A',
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    accent: '#ad43f3',
  },

  // Light theme colors
  light: {
    bg: '#FFFFFF',
    surface: '#F8F9FA',
    border: '#E5E7EB',
    primary: '#1F2937',
    secondary: '#6B7280',
    accent: '#ad43f3',
  },

  // Neutral colors
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
} as const;

// Type for the color palette
export type ColorPalette = typeof colors;
