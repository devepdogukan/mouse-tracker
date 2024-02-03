import useMouseTracker from '../../hooks/use-mouse-tracker'
import React, { useRef } from 'react'
import styles from './tracker.module.css'
import { MutableRefObject } from 'react'

const Tracker = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useMouseTracker(ref as MutableRefObject<HTMLDivElement>)

  return (
    <div className={styles['tracker-wrapper']} ref={ref}>
      <div className={styles['tracker-dot-container']}>
        <div className={`circle-dot ${styles['tracker-dot']}`}></div>
      </div>
    </div>
  )
}

Tracker.displayName = 'Tracker'
export default Tracker
