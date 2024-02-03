import { RefObject } from 'react'

export interface useMouseTracker {
  (ref: RefObject<HTMLElement>, cb: (event: MouseEvent) => void): void
}

declare module '@devdogukan/mouse-tracker'
