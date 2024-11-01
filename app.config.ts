import { defineConfig } from '@tanstack/start/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    preset: 'node-server',
  },
  routers: {
    ssr: {
      entry: './app/entry-server.ts',
    },
    client: {
      entry: './app/entry-client.tsx',
    },
  },
  tsr: {
    appDirectory: 'app',
    generatedRouteTree: 'app/route-tree.gen.ts',
  },
  vite: {
    plugins: [
      tsconfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
})
