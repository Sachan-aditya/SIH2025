import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",     // bind to all interfaces
    port: 5000,
    allowedHosts: ["3bce87ff-6cff-4ea7-9816-a69724438b97-00-1c8uuj0iofjuf.sisko.replit.dev"], // allow all dynamic Replit domains
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
