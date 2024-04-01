import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: false,
    // Ensure to include the Ant Design CSS file
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
