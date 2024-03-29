import { RefObject, useEffect } from 'react'
import { useTrackerContext } from '../context'

const isInsidePage = (x: number, y: number) => {
  const { innerWidth, innerHeight } = window
  const { clientWidth, clientHeight } = document.documentElement

  return (
    x > 0 &&
    x < Math.max(innerWidth, clientWidth) &&
    y > 0 &&
    y < Math.max(innerHeight, clientHeight)
  )
}

const useMouseTracker = (ref: RefObject<HTMLElement>) => {
  const context = useTrackerContext()

  const handleMouseMove = (event: MouseEvent) => {
    if (!ref?.current) return

    const { width, height } = ref.current.getBoundingClientRect()
    ref.current.style.setProperty(
      'opacity',
      isInsidePage(event.clientX, event.clientY) ? '1' : '0'
    )
    ref.current.style.setProperty(
      'transform',
      `translate(${event.clientX - width / 2}px,${
        event.clientY - height / 2
      }px)`
    )
  }

  const handleVisibilityChange = () => {
    if (!ref?.current) return

    ref.current.style.setProperty('opacity', !document.hidden ? '0' : '1')
  }

  useEffect(() => {
    if (!ref?.current) return

    context?.setTrackerRef(ref)

    ref.current.style.setProperty('opacity', '0')
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [ref])
}

export default useMouseTracker
