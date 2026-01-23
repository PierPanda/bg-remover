import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), reactRouter()],
  resolve: {
    alias: {
      "~": "/app",
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress empty chunk warnings for API-only routes
        if (warning.code === "EMPTY_BUNDLE") return;
        warn(warning);
      },
    },
  },
});
