import path from "path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), reactRouter()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "app"),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "EMPTY_BUNDLE") return;
        warn(warning);
      },
    },
  },
});
