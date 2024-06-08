import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'primary-50': '#fafafa',
      'primary-100': '#f4f4f5',
      'primary-200': '#e4e4e7',
      'primary-900': '#18181b',
      'primary-950': '#09090b',
      'secondary-100': '#e0e7ff',
      'secondary-200': '#c7d2fe',
      'secondary-300': '#a5b4fc',
      'secondary-400': '#818cf8',
      'red-100': '#fee2e2',
      'red-200': '#fecaca',
      'red-600': '#dc2626',
      'red-700': '#b91c1c',
    },
    extend: {
      boxShadow: {
        sm: '3px 2px 15px rgba(0,0,0,0.2)',
      },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
  },
  plugins: [],
};
export default config;
