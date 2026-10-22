/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainRed: "var(--main-red)",
        mainBeige: "var(--main-beige)",
      },
      fontSize: {
        title: "var(--font-title-size)",
        subtitle: "var(--font-subtitle-size)",
        paragraph: "var(--font-paragraph-size)",
      },
      keyframes: {
        // Track holds two copies of the text, so -50% loops seamlessly.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 4s linear infinite",
        "fade-in": "fade-in 350ms ease-out both",
      },
    },
  },
  plugins: [],
};
