/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#f59e0b',
        success: '#10b981',
        danger: '#ef4444',
        background: '#f9fafb',
        textprimary: '#111827',
        textsecondary: '#6b7280'
      }
    }
  },
  plugins: []
};
