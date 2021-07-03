import React, { useRef, useCallback, useLayoutEffect } from 'react'

import { formatValue } from '../utils/format'
import { getPercentage, getLeft, getWidth, getValue } from '../utils/calc'

type Props = {
  currentRef: React.RefObject<HTMLDivElement> | null
  rangeProgressRef: React.RefObject<HTMLDivElement> | null
  rangeRef: React.RefObject<HTMLDivElement> | null
  thumbRef: React.RefObject<HTMLDivElement> | null
  onChange: (value: number) => void
  min: number
  max: number
  value: number
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
}: Props) => {
  const initialPercentage = getPercentage(value, min, max)
  const initialValue = getValue(initialPercentage, min, max)

  let diff = useRef<number>(0)

  const update = useCallback(
    (value: number, percentage: number) => {
      if (
        thumbRef?.current &&
        currentRef?.current &&
        rangeProgressRef?.current
      ) {
        thumbRef.current.style.left = getLeft(percentage)
        rangeProgressRef.current.style.width = getWidth(percentage)
        currentRef.current.textContent = formatValue(value)
      }
    },
    [currentRef, rangeProgressRef, thumbRef],
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
      // calculate the new position of the thumb on the x axis based on the mouse move event new client x
      let newX =
        clientX - diff.current - rangeRef?.current?.getBoundingClientRect().left

      const start = min // range start
      const end = rangeRef.current.offsetWidth - thumbRef.current.offsetWidth // range end

      if (newX < start) newX = start
      if (newX > end) newX = end

      const newPercentage = getPercentage(newX, start, end)
      const newValue = getValue(newPercentage, min, max)

      update(newValue, newPercentage)
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

  useLayoutEffect(
    () => update(initialValue, initialPercentage),
    [initialValue, initialPercentage, update],
  )

  return { start, stop, update }
}

export default useSlider
