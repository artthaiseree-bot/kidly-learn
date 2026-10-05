import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#EC4899", light: "#FCE7F3", dark: "#DB2777" },
        grape: "#8B5CF6",
        sky2: "#0EA5E9",
        ink: "#1E293B",
        muted: "#64748B",
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};
export default config;