import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: { index: "src/build.ts", nuxt: "src/nuxt.ts" },
      formats: ["es"],
      fileName: (_format, name) => `${name}.js`,
      cssFileName: "styles",
    },
    rolldownOptions: {
      external: ["vue", "@lucide/vue", "@nuxt/kit", /^@sectile\//],
    },
  },
});
