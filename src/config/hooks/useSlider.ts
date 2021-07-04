import React, { useRef, useCallback, useLayoutEffect } from 'react'

import { formatValue } from '../utils/format'
import { getPercentage, getWidth, getValue } from '../utils/calc'

type Props = {
  currentRef: React.RefObject<HTMLDivElement> | null
  rangeProgressRef: React.RefObject<HTMLDivElement> | null
  rangeRef: React.RefObject<HTMLDivElement> | null
  thumbRef: React.RefObject<HTMLDivElement> | null
  onChange: (value: number) => void
  min: number
  max: number
  value: number
  step: number
}

const useSlider = ({
  currentRef,
  rangeProgressRef,
  rangeRef,
  thumbRef,
  onChange,
  min,
  max,
  value,
  step,
}: Props) => {
  let diff = useRef<number>(0)

  const update = useCallback(
    (position: number, value: number) => {
      if (
        thumbRef?.current &&
        currentRef?.current &&
        rangeProgressRef?.current
      ) {
        thumbRef.current.style.left = `${position}px`
        rangeProgressRef.current.style.width = getWidth(value, max)
        currentRef.current.textContent = formatValue(value)
      }
    },
    [currentRef, rangeProgressRef, thumbRef, max],
  )

  // Callback with new result to parent on move
  const handleChange = useCallback(
    (value: number) => onChange(Number(formatValue(value))),
    [onChange],
  )

  const handleMouseMove = ({ clientX }: MouseEvent) => {
    if (
      rangeRef?.current &&
      thumbRef?.current &&
      currentRef?.current &&
      rangeProgressRef?.current
    ) {
      const start = min
      const rangeMax =
        rangeRef.current.offsetWidth - thumbRef.current.offsetWidth // max available width to move on: includes borders

      const thumbDistanceTraveled = clientX - diff.current

      // calculate the new thumb position n the x axis based on the mouse move event new client x
      let newX =
        thumbDistanceTraveled - rangeRef.current.getBoundingClientRect().left

      let coeff = 0

      // Check if thumb is out of the range when:
      if (newX < start) {
        coeff = min
        newX = min // left
      }

      if (newX > rangeMax) newX = rangeMax // right

      const newPercentage = getPercentage(newX, start, rangeMax) // convert current position to range percentage based on range min/max (= dom values)
      const newValue = getValue(newPercentage, min, max, step)

      const correctedPosition = newX - coeff - 1 // correction to fit nicely in the very left side of the range when value is 0

      // Update slider on move
      update(correctedPosition, newValue)
      handleChange(newValue)
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

  useLayoutEffect(() => {
    if (thumbRef?.current && rangeRef?.current) {
      const initialValue = Number.isInteger(value) ? value : value * 100

      const rangeMax =
        rangeRef.current.offsetWidth - thumbRef.current.offsetWidth

      const initialPosition = getValue(initialValue, min, rangeMax, step) - 1

      update(initialPosition, value)
    }
  }, [min, rangeRef, thumbRef, update, value, step])

  return { start, stop, update }
}

export default useSlider
