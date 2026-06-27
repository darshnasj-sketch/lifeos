import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        life: {
          ink: '#16201c',
          muted: '#6a756f',
          line: '#dfe7e1',
          paper: '#fbfcf8',
          mint: '#b7ead7',
          mintDeep: '#1f7a5b',
          blue: '#d7e7ff',
          blueDeep: '#315d91',
          gold: '#ffe7aa',
          goldDeep: '#7d5b13',
          rose: '#ffe0df',
          roseDeep: '#9b3f3b',
        },
      },
      boxShadow: {
        phone: '0 20px 50px rgba(31, 45, 38, 0.16)',
        soft: '0 14px 38px rgba(31, 45, 38, 0.10)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
