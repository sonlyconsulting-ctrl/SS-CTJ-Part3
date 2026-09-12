/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'ctj-charcoal': '#171A1F',
        'ctj-graphite': '#23272E',
        'ctj-platinum': '#EEF1F3',
        'ctj-silver': '#CDD2D7',
        'ctj-blue': '#4F7896',
        'ctj-gold': '#B39A61',
        'ctj-muted': '#9099A3'
      }
    }
  },
  plugins: []
};
