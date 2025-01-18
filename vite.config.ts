import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/antiquint.ts"),
      name: "antiquint",
      fileName: (format) => `antiquint.${format}.js`,
    },
    emptyOutDir: false,
  }
});