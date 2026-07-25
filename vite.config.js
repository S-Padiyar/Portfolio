import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath, URL } from "node:url";

const largeAssetsRoot = fileURLToPath(new URL("./large-assets", import.meta.url));
const largeAssetTypes = new Map([
  [".pdf", "application/pdf"],
  [".mp4", "video/mp4"]
]);

function localLargeAssetsPlugin() {
  return {
    name: "local-large-assets",
    configureServer(server) {
      server.middlewares.use("/large-assets", (request, response, next) => {
        const requestedPath = decodeURIComponent(request.url || "").replace(/^\/+/, "");
        const filePath = normalize(join(largeAssetsRoot, requestedPath));

        // Keep this dev helper scoped to large-assets/ so it cannot expose the repo.
        if (!filePath.startsWith(largeAssetsRoot) || !existsSync(filePath)) {
          next();
          return;
        }

        response.setHeader("Content-Type", largeAssetTypes.get(extname(filePath)) || "application/octet-stream");
        createReadStream(filePath).pipe(response);
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), localLargeAssetsPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  build: {
    cssMinify: "esbuild"
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.jsx"]
  }
});
