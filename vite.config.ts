import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import electronRenderer from "vite-plugin-electron-renderer";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron([
      {
        entry: "electron/main.ts",
      },
      {
        entry:"electron/preload.ts",
        onstart(options) {
          options.reload()
        },
      }
    ]),
    electronRenderer(),
  ],
  build: {
    emptyOutDir: false,
  },
});
