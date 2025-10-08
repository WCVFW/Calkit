module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}','./public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--brand-1))',
        cyan: 'hsl(var(--brand-2))'
      }
    }
  },
  plugins: []
}
