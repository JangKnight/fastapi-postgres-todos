import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 4444,
    hmr: {
      clientPort: 4444, // Forces HMR to use the mapped port
    },
    watch: {
      usePolling: true, // Crucial for Docker file-syncing
    },
  },
});
