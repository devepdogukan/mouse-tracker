import { MutableRefObject, useEffect } from 'react'
import { setState } from '../store'

const useMouseTracker = (ref: MutableRefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!ref.current) return

    setState({ trackerRef: ref })

    ref.current.style.setProperty('opacity', '0')
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [ref.current])

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

  const handleMouseMove = (event: MouseEvent) => {
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
    ref.current.style.setProperty('opacity', !document.hidden ? '0' : '1')
  }
}

export default useMouseTracker
