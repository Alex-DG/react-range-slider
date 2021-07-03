import React, { useRef } from 'react'

import { Range } from '../../config/types'
import { formatValue } from '../../config/utils/format'

import useSlider from '../../config/hooks/useSlider'

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
  // UI refs
  const currentRef = useRef<HTMLDivElement>(null)
  const rangeRef = useRef<HTMLDivElement>(null)
  const rangeProgressRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  // Slider Hook
  const { start } = useSlider({
    currentRef,
    rangeProgressRef,
    rangeRef,
    thumbRef,
    onChange,
    min,
    max,
    value,
  })

  // Slider entry point
  const handleMouseDown = ({ clientX }: React.MouseEvent<HTMLDivElement>) => {
    start(clientX)
  }

  return (
    <>
      <div className="header">
        <div>{min}</div>
        <div>
          <strong ref={currentRef}>{formatValue(value)}</strong>
          &nbsp;/&nbsp;
          {formatValue(max)}
        </div>
      </div>
      <div ref={rangeRef} className="range">
        <div className="range-progress" ref={rangeProgressRef} />
        <div ref={thumbRef} className="thumb" onMouseDown={handleMouseDown} />
      </div>
    </>
  )
}

export default Slider
