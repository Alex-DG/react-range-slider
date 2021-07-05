import React, { useRef } from 'react'

import { Range } from '../../config/types'
import { formatValue } from '../../config/utils/format'

import useSlider from '../../config/hooks/useSlider'

import './styles.css'

interface Props extends Range {
  onChange(value: number): void
  show?: boolean
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
  show,
}: Props) => {
  // UI refs
  const currentRef = useRef<HTMLDivElement>(null)
  const rangeRef = useRef<HTMLDivElement>(null)
  const rangeProgressRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  // Slider Hook
  const { start, onClickRange } = useSlider({
    currentRef,
    rangeProgressRef,
    rangeRef,
    thumbRef,
    onChange,
    min,
    max,
    step,
    value,
  })

  // On selecting the thumb
  const handleMouseDown = ({ clientX }: React.MouseEvent<HTMLDivElement>) => {
    start(clientX)
  }

  // On click on range
  const handleClick = ({ clientX }: React.MouseEvent<HTMLDivElement>) => {
    onClickRange(clientX)
  }

  return (
    <div>
      <label className="label">{label}</label>

      {show && (
        <div className="header">
          <span>{min}</span>
          <span>{formatValue(max)}</span>
        </div>
      )}

      <div ref={rangeRef} className="range" onClick={handleClick}>
        <div className="range-progress" ref={rangeProgressRef} />

        <div ref={thumbRef} className="thumb" onMouseDown={handleMouseDown}>
          <span ref={currentRef}>{formatValue(value)}</span>
          {unit && <span>{unit}</span>}
        </div>
      </div>
    </div>
  )
}

export default Slider
