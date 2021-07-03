import { useRef } from 'react'
import { getPercentage, getLeft } from '../utils/calc'

interface SliderParams {
  sliderRef: React.RefObject<HTMLDivElement> | null
  thumbRef: React.RefObject<HTMLDivElement> | null
}

const useSlider = ({ sliderRef, thumbRef }: SliderParams) => {
  let diff = useRef<number>(0)

  const handleMouseMove = ({ clientX }: MouseEvent) => {
    if (sliderRef?.current && thumbRef?.current) {
      // calculate the new position of the thumb on the x axis based on the mouse move event new client x
      let newX =
        clientX -
        diff.current -
        sliderRef?.current?.getBoundingClientRect().left

      const start = 0 // range start
      const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth // range end

      if (newX < start) newX = start
      if (newX > end) newX = end

      const newPercentage = getPercentage(newX, end)
      thumbRef.current.style.left = getLeft(newPercentage)
    }
  }

  /**
   * Dispose all newly registered events will be removed
   */
  const stop = () => {
    document.removeEventListener('mouseup', stop)
    document.removeEventListener('mousemove', handleMouseMove)
  }

  /**
   * Register two events for the thumb, which only happens after the mouse down event has been triggered.
   * This ensures that the thumb only moves while the mouse is down
   *
   * @param clientX number click position on the x axis
   */
  const start = (clientX: number) => {
    if (thumbRef?.current) {
      // stores the difference of the thumb position and the actual click on the x-axis
      diff.current = clientX - thumbRef?.current.getBoundingClientRect().left

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', stop)
    }
  }

  return { start, stop }
}

export default useSlider
