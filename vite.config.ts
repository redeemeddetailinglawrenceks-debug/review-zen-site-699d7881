// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

function patchMissingSecFetchDest(): Plugin {
  return {
    name: "patch-missing-sec-fetch-dest-for-mobile-preview",
    enforce: "pre",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (!req.headers["sec-fetch-dest"] && req.url) {
          const path = req.url.split("?")[0] ?? "";
          const isViteAsset =
            path.startsWith("/@id/") ||
            path.startsWith("/@vite/") ||
            path.startsWith("/@fs/") ||
            path.startsWith("/node_modules/") ||
            path.startsWith("/src/") ||
            /\.(?:mjs|js|jsx|ts|tsx|css|json|svg|png|jpe?g|webp|gif|ico|woff2?)$/i.test(path);

          if (isViteAsset) {
            req.headers["sec-fetch-dest"] = path.endsWith(".css") ? "style" : "script";
          }
        }

        next();
      });
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [patchMissingSecFetchDest()],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
