import Tracker from './components/tracker'
import React from 'react'
import { useIntersectionElement as intersection } from './hooks/use-intersection-element'
import * as tracker from './hooks/use-mouse-tracker'

const MouseTracker = () => {
  return <Tracker />
}

export const useIntersectionElement = intersection
export const useMouseTracker = tracker

export default MouseTracker
