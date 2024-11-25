import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
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
