/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          'azul-principal': '#2563eb',
          'azul-claro': '#60a5fa',
          'azul-escuro': '#1e40af',
        },
      },
    },
    plugins: [],
  };