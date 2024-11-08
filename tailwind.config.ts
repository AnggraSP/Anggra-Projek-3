import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        hijau: "#86A948",
        putih: "#FEFEFE",
        black_soft: "#5E5E5E"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // menambahkan Poppins ke daftar font
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
