import { RefObject, useEffect, useState } from 'react'
import { getState } from '../store'

const createCloneElement = (
  circleRef: RefObject<HTMLElement>,
  parentRef: RefObject<HTMLElement>
) => {
  if (!circleRef.current) return null

  const element = circleRef.current.cloneNode(true) as HTMLElement
  element.style.setProperty('position', 'absolute')
  element.style.setProperty('top', '0')
  element.style.setProperty('left', '0')

  element.classList.add('circle-clone')
  parentRef.current?.style.setProperty('position', 'relative')

  return element
}

const adjustClonedElementPosition = (
  circleRef: RefObject<HTMLElement>,
  clonedElement: HTMLElement,
  parentRef: RefObject<HTMLElement>
) => {
  const { top, left } = parentRef.current!.getBoundingClientRect()

  const handleStyleMutation = () => {
    const transformValue = circleRef.current!.style.transform

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

  observer.observe(circleRef.current!, { attributes: true })

  return observer
}

type IntersectionElementOptions = {
  keepInside?: boolean
}
type IntersectionElementCallback = ({
  isIntersection,
  circleRef,
  event
}: {
  isIntersection: boolean
  circleRef: HTMLElement
  event: MouseEvent
}) => void

export const useIntersectionElement = ({
  ref,
  callback,
  options
}: {
  ref: RefObject<HTMLElement>
  options?: IntersectionElementOptions
  callback: IntersectionElementCallback
}) => {
  const trackerRef = getState().trackerRef
  const [isMounted, setIsMounted] = useState(false)
  const [observer, setObserver] = useState<MutationObserver | null>(null)

  useEffect(() => {
    if (!ref?.current || !trackerRef?.current) return

    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current || typeof window === 'undefined') return

      const pointElement = document.elementFromPoint(
        event.clientX,
        event.clientY
      )
      const isInsideRef = ref.current?.contains(pointElement)
      const isClonedPresent = ref.current?.querySelector('.circle-clone')
      const clonedElement = createCloneElement(trackerRef, ref) as HTMLElement

      if (isInsideRef && options?.keepInside && !isClonedPresent) {
        trackerRef.current!.style.display = 'none'
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
        ref.current.querySelector('.circle-clone')?.remove()
        ref.current.style.setProperty('position', 'initial')
        trackerRef.current!.style.display = 'block'
        observer?.disconnect()
      }

      callback({
        isIntersection: isInsideRef,
        circleRef: (options?.keepInside
          ? clonedElement
          : trackerRef.current) as HTMLElement,
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
  }, [ref, trackerRef, isMounted, options])

  useEffect(() => {
    if (ref?.current) return

    setIsMounted(true)
    return () => {
      observer?.disconnect()
    }
  }, [])
}
