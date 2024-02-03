import { useIntersectionElement as intersection } from './hooks/use-intersection-element'
import {
  MouseTrackerProvider as provider,
  useTrackerContext as context
} from './context'
import React from 'react'
import * as tracker from './hooks/use-mouse-tracker'

export const useIntersectionElement = intersection
export const useMouseTracker = tracker
export const MouseTrackerProvider = provider
export const useTrackerContext = context
