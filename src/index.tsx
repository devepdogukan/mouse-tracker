import { useIntersectionElement as intersection } from './hooks/use-intersection-element'
import {
  MouseTrackerProvider as provider,
  useTrackerContext as context
} from './context'
import * as tracker from './hooks/use-mouse-tracker'
import Tracker from './components/tracker'

export const useIntersectionElement = intersection
export const useMouseTracker = tracker
provider.Tracker = Tracker
export const MouseTrackerProvider = provider
export const useTrackerContext = context
