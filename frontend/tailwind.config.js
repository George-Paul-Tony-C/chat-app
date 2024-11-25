// tailwind.config.js
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideIn: 'slideIn 0.5s ease-out forwards',
        pulseSlow: 'pulse 2s infinite',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateX(-50px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
      },
      backgroundImage: {
        shimmer: 'linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%)',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light", 
      "dark", 
      "cupcake", 
      "emerald", 
      "corporate", 
      "synthwave", 
      "retro", 
      "cyberpunk", 
      "valentine", 
      "halloween", 
      "garden", 
      "forest", 
      "aqua", 
      "lofi", 
      "pastel", 
      "fantasy", 
      "wireframe", 
      "black", 
      "luxury", 
      "dracula", 
      "autumn", 
      "business", 
      "acid", 
      "lemonade", 
      "night", 
      "coffee", 
      "winter",
      {
        mycustomtheme: {
          primary: "#4ade80", // Custom green
          secondary: "#818cf8", // Custom blue
          accent: "#f43f5e", // Custom pink
          neutral: "#1f2937", // Custom dark gray
          "base-100": "#ffffff", // White background
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbf24",
          error: "#f87272",
        },
      },
    ],
  },
};
