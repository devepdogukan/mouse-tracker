import React, { Dispatch, RefObject, SetStateAction, createRef } from 'react'

type MouseTrackerValue = {
  trackerRef: RefObject<HTMLElement>
  setTrackerRef: Dispatch<SetStateAction<MouseTrackerValue['trackerRef']>>
}

const MouseTrackerContext = React.createContext<MouseTrackerValue | null>(null)

export const MouseTrackerProvider: {
  ({ children }: { children: React.ReactNode }): React.JSX.Element
  Tracker: () => React.JSX.Element | null
} = ({ children }: { children: React.ReactNode }) => {
  const [trackerRef, setTrackerRef] = React.useState(
    createRef() as RefObject<HTMLElement>
  )

  return (
    <MouseTrackerContext.Provider value={{ trackerRef, setTrackerRef }}>
      {children}
    </MouseTrackerContext.Provider>
  )
}

// eslint-disable-next-line react/display-name
MouseTrackerProvider.Tracker = () => null

export const useTrackerContext = () => {
  const context = React.useContext(MouseTrackerContext)
  if (!context) {
    throw new Error(
      'useTrackerContext must be used within a MouseTrackerProvider'
    )
  }
  return context
}
