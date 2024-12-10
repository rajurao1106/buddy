/** @type {import('tailwindcss').Config} */
export default {
  server: {
    host: true, // Listen on all addresses (needed for Docker)
    port: 5173, // Optional: specify a custom port
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}