// @lovable.dev/vite-tanstack-config already includes default plugins and configuration.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { createRunnableDevEnvironment } from "vite";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      tsconfigPaths: true,
    },
    environments: {
      ssr: {
        dev: {
          createEnvironment(name, config, context) {
            return createRunnableDevEnvironment(name, config, context as any);
          },
        },
      },
    },
  },
});
