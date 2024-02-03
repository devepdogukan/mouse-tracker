# mouse-tracker

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
      ...rest
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

## License

MIT © [devepdogukan](https://github.com/devepdogukan)
