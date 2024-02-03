import { create } from 'zustand'
import { RefObject } from 'react'

export type Store = {
  trackerRef: RefObject<HTMLElement> | null
  refs: RefObject<HTMLElement>[]
  addRef: (ref: RefObject<HTMLElement>) => void
  setTrackerRef: (trackerRef: RefObject<HTMLElement>) => void
}

export const store = create<Store>()((set) => ({
  trackerRef: null,
  refs: [],
  addRef: (ref: RefObject<HTMLElement>) =>
    set((state: Store) => ({ refs: [...state.refs, ref] })),
  setTrackerRef: (trackerRef: RefObject<HTMLElement>) => set({ trackerRef })
}))

export const { getState, setState, subscribe } = store
