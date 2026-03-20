import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 4444,
    hmr: {
      clientPort: 4444, // hmr vital
    },
    watch: {
      usePolling: true, // docker vital
    },
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, "certs/localhost+3-key.pem"),
      ),
      cert: fs.readFileSync(path.resolve(__dirname, "certs/localhost+3.pem")),
    },
  },
});
