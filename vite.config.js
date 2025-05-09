import * as path from "path";
import { defineConfig } from 'vite';
export default defineConfig({
  resolve: {
    alias: {
      "@models": path.resolve(__dirname, "./src/assets/models"),
      "@textures": path.resolve(__dirname, "./src/assets/textures"),
    },
  },
});