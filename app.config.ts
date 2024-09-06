import { defineConfig } from '@tanstack/start/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  tsr: {
    appDirectory: 'app',
    autoCodeSplitting: true,
    generatedRouteTree: 'app/route-tree.gen.ts',
  },
  vite: {
    plugins: () => [tsconfigPaths()],
  },
})
