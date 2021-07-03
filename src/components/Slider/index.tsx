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
  const currentRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const { start } = useSlider({
    currentRef,
    sliderRef,
    thumbRef,
    value,
    max,
    onChange,
  })
  // console.log({ newValue })

  // Slider entry point
  const handleMouseDown = ({ clientX }: React.MouseEvent<HTMLDivElement>) => {
    start(clientX)
  }

  return (
    <>
      <div className="header">
        <strong ref={currentRef}>{value}</strong>
        &nbsp;/&nbsp;
        {max}
      </div>
      <div ref={sliderRef} className="slider">
        <div ref={thumbRef} className="thumb" onMouseDown={handleMouseDown} />
      </div>
    </>
  )
}

export default Slider
