import { RefObject, useEffect, useState } from 'react'
import { useTrackerContext } from '../context'
import { TRACK_CLONE_CLASS } from '../constant'

const createCloneElement = (
  trackerRef: RefObject<HTMLElement>,
  parentRef: RefObject<HTMLElement>
) => {
  if (!trackerRef.current) return null

  const element = trackerRef.current.cloneNode(true) as HTMLElement
  element.style.setProperty('position', 'absolute')
  element.style.setProperty('top', '0')
  element.style.setProperty('left', '0')

  element.classList.add('circle-clone')
  parentRef.current?.style.setProperty('position', 'relative')

  return element
}

const adjustClonedElementPosition = (
  trackRef: RefObject<HTMLElement>,
  clonedElement: HTMLElement,
  parentRef: RefObject<HTMLElement>
) => {
  if (!trackRef?.current || !parentRef.current) return null

  const { top, left } = parentRef.current.getBoundingClientRect()

  const handleStyleMutation = () => {
    const transformValue = trackRef.current?.style.transform

    if (transformValue) {
      const translateMatches = transformValue.match(/translate\(([^)]+)\)/g)

      if (translateMatches) {
        translateMatches.forEach((translateMatch) => {
          const matches = translateMatch.match(/translate\(([^,]+),([^)]+)\)/)
          if (matches && matches.length === 3) {
            const translateX = parseFloat(matches[1])
            const translateY = parseFloat(matches[2])
            const { width, height } = clonedElement.getBoundingClientRect()

            const offsetX = Math.abs(translateX - left)
            const offsetY = Math.abs(translateY - top)
            const newTransformValue = `translate(${offsetX - width / 2}px, ${
              offsetY - height / 2
            }px)`
            clonedElement.style.transform = newTransformValue
          }
        })
      }
    }
  }

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'style') {
        handleStyleMutation()
        break
      }
    }
  })
  observer.disconnect()

  observer.observe(trackRef.current, { attributes: true })

  return observer
}

type IntersectionElementOptions = {
  keepInside?: boolean
}
type IntersectionElementCallback = ({
  isIntersection,
  trackRef,
  event
}: {
  isIntersection: boolean
  trackRef: HTMLElement
  event: MouseEvent
}) => void

export const useIntersectionElement = ({
  ref,
  callback,
  options
}: {
  ref: RefObject<HTMLElement>
  options?: IntersectionElementOptions
  callback?: IntersectionElementCallback
}) => {
  const { trackerRef } = useTrackerContext()
  const [observer, setObserver] = useState<MutationObserver | null>(null)

  useEffect(() => {
    if (!ref?.current || !trackerRef?.current) return

    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current || typeof window === 'undefined' || !trackerRef.current)
        return

      const pointElement = document.elementFromPoint(
        event.clientX,
        event.clientY
      )
      const isInsideRef = ref.current?.contains(pointElement)
      const isClonedPresent = ref.current?.querySelector(TRACK_CLONE_CLASS)
      const clonedElement = createCloneElement(trackerRef, ref) as HTMLElement

      if (isInsideRef && options?.keepInside && !isClonedPresent) {
        trackerRef.current.style.display = 'none'
        ref.current.appendChild(clonedElement)
        clonedElement.style.display = 'block'
        const newObserver = adjustClonedElementPosition(
          trackerRef,
          clonedElement,
          ref
        )
        ref.current.style.setProperty('overflow', 'hidden')
        setObserver(newObserver)
      } else if (!isInsideRef && isClonedPresent) {
        ref.current.querySelector(TRACK_CLONE_CLASS)?.remove()
        ref.current.style.setProperty('position', 'initial')
        trackerRef.current.style.display = 'block'
        observer?.disconnect()
      }

      const trackRealRef = options?.keepInside
        ? clonedElement
        : trackerRef.current

      typeof callback === 'function' &&
        callback({
          isIntersection: isInsideRef,
          trackRef: trackRealRef as HTMLElement,
          event
        })
    }

    if (ref?.current)
      document.addEventListener(
        'mousemove',
        handleMouseMove as unknown as EventListener,
        {
          passive: true
        }
      )

    return () => {
      document.removeEventListener(
        'mousemove',
        handleMouseMove as unknown as EventListener
      )
      observer?.disconnect()
    }
  }, [ref, trackerRef, options])
}
