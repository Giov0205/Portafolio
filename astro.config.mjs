// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Cambia esto por tu dominio final cuando lo tengas (ej. https://tuweb.com)
  site: "https://tu-portafolio.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
});
