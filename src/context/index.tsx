import React, { Dispatch, RefObject, SetStateAction, createRef } from 'react'
import Tracker from '../components/tracker'

type MouseTrackerValue = {
  trackerRef: RefObject<HTMLElement>
  setTrackerRef: Dispatch<SetStateAction<MouseTrackerValue['trackerRef']>>
}

const MouseTrackerContext = React.createContext<MouseTrackerValue | null>(null)

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
