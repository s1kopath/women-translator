import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/hf": {
          target: "https://router.huggingface.co",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/hf/, ""),
          configure: (proxy, options) => {
            proxy.on("proxyReq", (proxyReq, req, res) => {
              if (env.VITE_HUGGINGFACE_API_TOKEN) {
                proxyReq.setHeader(
                  "Authorization",
                  `Bearer ${env.VITE_HUGGINGFACE_API_TOKEN}`
                );
              }
            });
          },
        },
      },
    },
  };
});
