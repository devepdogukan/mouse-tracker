# mouse-tracker

Mouse Tracker is a lightweight React library that provides components and hooks for easy mouse interaction tracking within your applications. With Mouse Tracker, you can effortlessly monitor mouse positions, visibility, and trigger specific actions based on user interactions. Enhance your user experience by incorporating precise mouse tracking capabilities into your React components.

> Mouse tracker

[![NPM](https://img.shields.io/npm/v/@devdogukan/mouse-tracker.svg)](https://www.npmjs.com/package/@devdogukan/mouse-tracker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/devepdogukan/mouse-tracker)

## Install

```bash
npm install @devdogukan/mouse-tracker
```

## Usage

- Wrap App component with MouseTrackerProvider.
- If you want use default tracker just use MouseTrackerProvider.Tracker
- Thats all

```tsx
import React from 'react'
import { MouseTrackerProvider } from '@devdogukan/mouse-tracker'

const App = () => {
  return (
    <MouseTrackerProvider>
      <MouseTrackerProvider.Tracker />
      {/* Your components and content */}
    </MouseTrackerProvider>
  )
}
```

## Custom Tracker

```tsx
import { useMouseTracker } from '@devdogukan/mouse-tracker'
import React, { useRef } from 'react'

const Tracker = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useMouseTracker(ref)

  return (
    <div className='tracker-wrapper' ref={ref}>
      <div className='tracker-dot-container'>
        <div className='circle-dot tracker-dot'></div>
      </div>
    </div>
  )
}

export default Tracker
```

- Change default Tracker inside to MouseTrackerProvider and remove <MouseTrackerProvider.Tracker/>

# HOOKS

## useIntersectionElement

Mouse Tracker provides a custom hook, useIntersectionElement, for tracking mouse intersection with an element.

### USAGE

```tsx
import { useIntersectionElement } from '@devdogukan/mouse-tracker'
import React, { useRef } from 'react'

const Tracker = () => {
  const trackedElementRef = useRef<HTMLDivElement | null>(null)

  useIntersectionElement({
    ref: trackedElementRef,
    options: {
      keepInside: true // Keep cloned element inside the tracked element
    },
    callback: ({ isIntersection, trackRef, event }) => {
      // Handle mouse intersection events
      console.log('Mouse is inside:', isIntersection)
      console.log('Tracked element reference:', trackRef)
      console.log('Mouse event details:', event)
    }
  })

  return <div ref={trackedElementRef}>{/* Your component content */}</div>
}

export default Tracker
```

### API

| Parameter  | Type                          | Description                                               |
| ---------- | ----------------------------- | --------------------------------------------------------- |
| `ref`      | `RefObject<HTMLElement>`      | Reference to the element to be tracked.                   |
| `options`  | `IntersectionElementOptions`  | Optional configuration for the intersection behavior.     |
| `callback` | `IntersectionElementCallback` | Callback function triggered on mouse intersection events. |

#### IntersectionElementOptions

| Option       | Type      | Default | Description                                         |
| ------------ | --------- | ------- | --------------------------------------------------- |
| `keepInside` | `boolean` | `false` | Keep the cloned element inside the tracked element. |

#### IntersectionElementCallback

| Parameter        | Type          | Description                                 |
| ---------------- | ------------- | ------------------------------------------- |
| `isIntersection` | `boolean`     | Indicates whether the mouse is inside.      |
| `trackRef`       | `HTMLElement` | Reference to the tracked or cloned element. |
| `event`          | `MouseEvent`  | Mouse event details.                        |

## useMouseTracker

`useMouseTracker` is a custom React hook that enables tracking the mouse position and visibility for a specified HTML element.

### USAGE

```tsx
import { useMouseTracker } from '@devdogukan/mouse-tracker'
import React, { useRef } from 'react'

const Tracker = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useMouseTracker(ref)

  return (
    <div className='tracker-wrapper' ref={ref}>
      <div className='tracker-dot-container'>
        <div className='circle-dot tracker-dot'></div>
      </div>
    </div>
  )
}

export default Tracker
```

### API

| Parameter | Type                     | Description                             |
| --------- | ------------------------ | --------------------------------------- |
| `ref`     | `RefObject<HTMLElement>` | Reference to the element to be tracked. |

## useTrackerContext

`useTrackerContext` is a custom hook that provides access to the mouse tracker context value.

### USAGE

```tsx
import { useTrackerContext } from '@devdogukan/mouse-tracker'
import React, { useRef } from 'react'

const MyComponent = () => {
  const context = useTrackerContext();

  // Access context properties such as trackerRef and setTrackerRef

  return (
    // Your component content
  );
}

export default Tracker

```

### Returns

The `useTrackerContext` hook returns an object with the following properties:

- `trackerRef` (`RefObject<HTMLElement>`): A reference to the element to be tracked.
- `setTrackerRef` (`Dispatch<SetStateAction<RefObject<HTMLElement>>>`): A function to set the reference to the tracked element.

## License

MIT © [devepdogukan](https://github.com/devepdogukan)
