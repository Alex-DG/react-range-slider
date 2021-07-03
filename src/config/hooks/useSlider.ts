import { formatValue } from './../utils/format'
import React, { useRef, useEffect, useCallback } from 'react'
import { getPercentage, getLeft } from '../utils/calc'

type SliderParams = {
  currentRef: React.RefObject<HTMLDivElement> | null
  sliderRef: React.RefObject<HTMLDivElement> | null
  thumbRef: React.RefObject<HTMLDivElement> | null
  onChange: (value: number) => void
  value: number
  max: number
}

const useSlider = ({
  currentRef,
  sliderRef,
  thumbRef,
  value,
  max,
  onChange,
}: SliderParams) => {
  const initialPercentage = getPercentage(value, max)

  let diff = useRef<number>(0)

  // Update UI
  const handleChange = useCallback(
    (newValue: number) => {
      if (currentRef?.current)
        currentRef.current.innerHTML = formatValue(newValue)
      onChange(newValue)
    },
    [currentRef, onChange],
  )

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

      handleChange(newPercentage)
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

  useEffect(() => {
    // Set initial value
    if (initialPercentage && thumbRef?.current) {
      thumbRef.current.style.left = getLeft(initialPercentage)
    }
  }, [initialPercentage, thumbRef])

  return { start, stop }
}

export default useSlider
