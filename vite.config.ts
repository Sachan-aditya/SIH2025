import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",     // keeps IPv6 style binding
    port: 8080,
    allowedHosts: [
      // add your Replit domain here
      "3bce87ff-6cff-4ea7-9816-a69724438b97-00-1c8uuj0iofjuf.sisko.replit.dev",
    ],
    // if your Replit keeps changing domains, you can temporarily allow all:
    // allowedHosts: ["*"],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
