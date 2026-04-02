import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 4444,

    allowedHosts: ["anthonysjhenry.com", "www.anthonysjhenry.com", "client"],
    hmr: {
      host: "anthonysjhenry.com",
      clientPort: 443,
      protocol: "wss",
    },
    watch: {
      usePolling: true,
    },
  },
});

// https: {
//   key: fs.readFileSync(
//     path.resolve(__dirname, "certs/localhost+3-key.pem"),
//   ),
//   cert: fs.readFileSync(path.resolve(__dirname, "certs/localhost+3.pem")),
// },
