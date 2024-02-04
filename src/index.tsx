import { useIntersectionElement as Intersection } from './hooks/use-intersection-element'
import {
  MouseTrackerProvider as Provider,
  useTrackerContext as Context
} from './context'
import TrackerHook from './hooks/use-mouse-tracker'
import DefaultTracker from './components/tracker'

Provider.Tracker = DefaultTracker
export const useIntersectionElement = Intersection
export const useMouseTracker = TrackerHook
export const MouseTrackerProvider = Provider
export const useTrackerContext = Context
export const Tracker = DefaultTracker
