import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // base: "/lufiDK4674.github.io/", // Correct for user/organization GitHub Pages site
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    minify: false, // Use terser instead of esbuild to avoid minification issues
    sourcemap: true, // Enable source maps for debugging
    terserOptions: {
      mangle: {
        keep_fnames: true, // Preserve function names to avoid breaking code
      },
    },
  },
}));