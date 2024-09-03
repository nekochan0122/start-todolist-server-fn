import { StartClient } from '@tanstack/start'
import { hydrateRoot } from 'react-dom/client'

import { createRouter } from './router'

const router = createRouter()

declare global {
  interface Window {
    readonly root: HTMLElement
  }
}

hydrateRoot(window.root, <StartClient router={router} />)
