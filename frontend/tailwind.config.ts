import type { Config } from "tailwindcss";

export default {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
            'logo-blue': '#069edd',
            'logo-blue-dark': '#0f3447',
            'logo-black': '#2b3034',
            'logo-orange': '#f88a1a',
            'logo-green': '#51a41e',
            'logo-green-dark': '#003b25',
            'logo-white': '#f7f8f8'
         },
         fontFamily: {
            logo: ['Tomorrow', 'sans-serif'],
            texto: ['Montserrat', 'sans-serif'],
         },
      },
   },
   plugins: [],
} satisfies Config;
