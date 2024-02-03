import React, { RefObject, createRef } from 'react'
import Tracker from '../components/tracker'

const MouseTrackerContext = React.createContext<{
  trackerRef: RefObject<HTMLElement>
  setTrackerRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLElement>>
  >
}>({
  trackerRef: createRef() as RefObject<HTMLElement>,
  setTrackerRef: () => {
    throw new Error('setTrackerRef function must be overridden')
  }
})

export const MouseTrackerProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [trackerRef, setTrackerRef] = React.useState(
    createRef() as RefObject<HTMLElement>
  )

  return (
    <MouseTrackerContext.Provider value={{ trackerRef, setTrackerRef }}>
      {children}
    </MouseTrackerContext.Provider>
  )
}

MouseTrackerProvider.Tracker = Tracker

export const useTrackerContext = () => {
  const context = React.useContext(MouseTrackerContext)
  if (!context) {
    throw new Error(
      'useTrackerContext must be used within a MouseTrackerProvider'
    )
  }
  return context
}
