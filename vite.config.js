import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: "esbuild"
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.jsx"]
  }
});
