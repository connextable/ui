import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue(), {
    name: "connextable-ui:auto-imports",
    generateBundle(_, bundle) {
      const entry = bundle["index.js"];
      if (entry?.type !== "chunk" || !entry.isEntry) this.error("Missing Connextable UI entry for auto-imports.");
      this.emitFile({
        type: "asset",
        fileName: "auto-imports.js",
        source: `export default ${JSON.stringify(entry.exports.filter(name => /^(?:UI|use)[A-Z]/.test(name)))};\n`,
      });
    },
  }],
  build: {
    lib: {
      entry: { index: "src/build.ts", nuxt: "src/nuxt.ts", vite: "src/vite.ts" },
      formats: ["es"],
      fileName: (_format, name) => `${name}.js`,
      cssFileName: "styles",
    },
    rolldownOptions: {
      external: ["vue", "@lucide/vue", /^nuxt\//, /^@sectile\//, /^node:/, "unimport/unplugin", "unplugin-vue-components/vite"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
});
