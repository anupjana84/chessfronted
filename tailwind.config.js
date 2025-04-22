/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        popup: "popup 0.3s ease-out",
        float: "float 2s ease-in-out infinite",
        pingDot: "pingDot 1.4s infinite ease-in-out",
      },
      keyframes: {
        popup: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pingDot: {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
            boxShadow: "0 0 0 0 rgba(34,197,94,0.7)",
          },
          "70%": {
            transform: "scale(1.6)",
            opacity: "0.3",
            boxShadow: "0 0 0 6px rgba(34,197,94,0)",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "0",
            boxShadow: "0 0 0 0 rgba(34,197,94,0)",
          },
        },
      },
    },
  },
  plugins: [],
};
