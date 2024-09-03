import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'

import { routeTree } from './route-tree.gen'

export type RouterContext = {
  queryClient: QueryClient
}

export function createRouter() {
  const queryClient = new QueryClient()

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient },
      defaultPreload: 'intent',
    }),
    queryClient,
  )
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
