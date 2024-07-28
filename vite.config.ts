import path from "path";
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ["vue", "pinia", "uni-app"],
      dirs: ["src/api"],
      dts: "src/@types/auto.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
