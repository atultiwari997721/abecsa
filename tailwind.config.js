/** @type {import('tailwindcss').Config} */
export default {
    // darkMode: 'selector', // Moved to CSS for v4 custom-variant
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
          colors: {
              deepSlate: '#0f172a',
              electricBlue: '#3b82f6',
          }
      },
    },
    plugins: [],
  }
