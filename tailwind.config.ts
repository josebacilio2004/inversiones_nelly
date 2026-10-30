import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: '#6CBE1A',
            dark: '#2E5A07',
            light: '#8CE236',
          },
          gold: {
            DEFAULT: '#C8A064',
            light: '#F5EBE0',
            dark: '#936F35',
          },
          water: {
            DEFAULT: '#00A8E8',
            dark: '#007AA8',
            light: '#48C9FF',
          },
          dark: {
            DEFAULT: '#0F172A',
            deep: '#0B1322',
            surface: '#1E293B',
          },
          light: {
            DEFAULT: '#F8FAFC',
            surface: '#FFFFFF',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'brand-glow': '0 0 25px -5px rgba(108, 190, 26, 0.25)',
        'gold-glow': '0 0 25px -5px rgba(200, 160, 100, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
