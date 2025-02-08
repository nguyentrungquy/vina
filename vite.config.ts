import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import path from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";

dotenv.config(); // load env vars from .env

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://jhapi.jahwa.co.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/v2/api": {
        target: "https://japi.jahwa.co.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v2\/api/, "api/"),
      },
    },
  },
  define: {
    SECRET_KEY: `"${process.env.REACT_APP_SECRET_KEY}"`, // wrapping in "" since it's a string
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://vina.jahwa.co.kr:5000",
  //       changeOrigin: true,
  //       secure: false,
  //       ws: true,
  //       configure: (proxy, options) => {
  //         proxy.on("proxyReq", (proxyReq, req, res) => {
  //           console.log("Proxying request:", req.url);
  //         });
  //         proxy.on("error", (err, req, res) => {
  //           console.error("Proxy error:", err);
  //         });
  //       },
  //     },
  //   },
  // },
});
