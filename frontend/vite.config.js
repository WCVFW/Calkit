import { defineConfig } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    hmr: {
      overlay: false, // disable vite error overlay to avoid runtime overlay exceptions
    },
    proxy: {
      "/api": "http://localhost:8081",
    },
  },
});
