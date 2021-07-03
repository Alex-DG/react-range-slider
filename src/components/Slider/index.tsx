import React, { useRef } from 'react'

import useSlider from '../../config/hooks/useSlider'
import { Range } from '../../config/types'

import './styles.css'

interface Props extends Range {
  onChange(value: number): void
}

/**
 * Horizontal Range Slider
 */
const Slider = ({
  label,
  max,
  min,
  step,
  value,
  unit = '',
  onChange,
}: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const { start, initialValue } = useSlider({ sliderRef, thumbRef, value, max })

  // Slider entry point
  const handleMouseDown = ({ clientX }: React.MouseEvent<HTMLDivElement>) => {
    start(clientX)
  }

  return (
    <div ref={sliderRef} className="slider">
      <div
        ref={thumbRef}
        className="thumb"
        style={{ left: initialValue }}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}

export default Slider
