/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3e8ff',
          100: '#e9d5ff',
          200: '#d8b4fe',
          300: '#c084fc',
          400: '#a855f7',
          500: '#ad43f3',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        secondary: {
          50: '#F0F7FF',
          100: '#E1EFFF',
          200: '#C3DFFF',
          300: '#A5CFFF',
          400: '#87BFFF',
          500: '#69AFFF',
          600: '#548C99',
          700: '#3F6966',
          800: '#2A4633',
          900: '#152300',
        },
        accent: {
          purple: '#6B46C1',
          red: '#FF3B30',
          green: '#34C759',
          yellow: '#FFCC00',
        },
        dark: {
          background: '#0A0A0A',
          surface: '#1A1A1A',
          border: '#2A2A2A',
          'text-primary': '#FFFFFF',
          'text-secondary': '#A0A0A0',
          'text-muted': '#666666',
        },
        light: {
          background: '#FFFFFF',
          surface: '#F8FAFC',
          border: '#E2E8F0',
          'text-primary': '#1E293B',
          'text-secondary': '#475569',
          'text-muted': '#94A3B8',
        },
      },
      backgroundColor: {
        'dark-bg': '#0A0A0A',
        'dark-surface': '#1A1A1A',
        'light-bg': '#FFFFFF',
        'light-surface': '#F8FAFC',
      },
      textColor: {
        'dark-primary': '#FFFFFF',
        'dark-secondary': '#A0A0A0',
        'dark-muted': '#666666',
        'light-primary': '#1E293B',
        'light-secondary': '#475569',
        'light-muted': '#94A3B8',
      },
      borderColor: {
        'dark-border': '#2A2A2A',
        'light-border': '#E2E8F0',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
