import { StartClient } from '@tanstack/start'
import { hydrateRoot } from 'react-dom/client'

import { createRouter } from './router'

declare global {
  interface Window {
    readonly root: HTMLElement
  }
}

const router = createRouter()

hydrateRoot(window.root, <StartClient router={router} />)
