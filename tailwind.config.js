/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff6b00', // Dark orange
          light: '#ffece0',
          dark: '#e05a00',
        },
        secondary: {
          DEFAULT: '#0066cc', // Blue
          light: '#4d97ff',
          dark: '#004d99',
        },
        accent: {
          purple: '#6C63FF',
          blue: '#0066cc',
          orange: '#ff6b00',
          pink: '#FF49DB',
        },
        dark: '#333333', // Dark gray
        light: '#f5f7fa', // Light gray/almost white
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, #ff6b00, #ff9248)',
        'gradient-secondary': 'linear-gradient(to right, #0066cc, #4d97ff)',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'neuro': '5px 5px 10px #0a0a0a, -5px -5px 10px #2a2a2a',
        'neuro-inset': 'inset 5px 5px 10px #0a0a0a, inset -5px -5px 10px #2a2a2a',
        'card': '0 5px 15px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
} 