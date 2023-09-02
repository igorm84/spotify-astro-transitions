/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        context: "var(--context-color)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
