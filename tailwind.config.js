/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-bg) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        'text-primary': "rgb(var(--color-text-primary) / <alpha-value>)",
        'text-accent': "rgb(var(--color-text-accent) / <alpha-value>)",
      }
    },
  },
  plugins: [],
}