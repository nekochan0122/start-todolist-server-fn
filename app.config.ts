import { defineConfig } from '@tanstack/start/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  deployment: {
    preset: 'node-server',
  },
  tsr: {
    appDirectory: 'app',
    generatedRouteTree: 'app/route-tree.gen.ts',
  },
  vite: {
    plugins: () => [tsconfigPaths()],
  },
})
