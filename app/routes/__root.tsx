import '~/styles/global.css'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
import type * as React from 'react'

import type { RouterContext } from '~/router'

export const Route = createRootRouteWithContext<RouterContext>()({
  meta: () => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      title: 'TanStack Start Starter',
    },
  ],
  component: RootComponent,
  notFoundComponent: () => <h1>Not Found</h1>,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <ReactQueryDevtools buttonPosition='bottom-left' />
        <TanStackRouterDevtools position='bottom-right' />
      </Body>
    </Html>
  )
}
