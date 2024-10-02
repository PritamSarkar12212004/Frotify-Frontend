import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { qrcode } from "vite-plugin-qrcode";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), qrcode()],
  server: {
    host: '0.0.0.0', // Make sure your server is accessible from other devices
    port: 5173,       // You can change the port if necessary
  },
});
