import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "src/build.ts",
      formats: ["es"],
      fileName: "index",
      cssFileName: "styles",
    },
    rolldownOptions: {
      external: ["vue", "@lucide/vue", /^@sectile\//],
    },
  },
});
