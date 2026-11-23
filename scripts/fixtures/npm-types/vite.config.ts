import vue from "@vitejs/plugin-vue";
import connextableUI from "@connextable/ui/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue(), connextableUI({ prefix: "App" })],
});
