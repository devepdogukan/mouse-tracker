import useMouseTracker from '../../hooks/use-mouse-tracker'
import React, { useRef } from 'react'
import './tracker.css'
import { MutableRefObject } from 'react'

const Tracker = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useMouseTracker(ref as MutableRefObject<HTMLDivElement>)

  return (
    <div className='tracker-wrapper' ref={ref}>
      <div className='tracker-dot-container'>
        <div className='circle-dot tracker-dot'></div>
      </div>
    </div>
  )
}

Tracker.displayName = 'Tracker'
export default Tracker
