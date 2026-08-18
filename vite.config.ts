import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    strictPort: true,
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/library/styles/globals" as *;\n@use "@/library/styles/variables" as *;`,
      },
    },
  },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
