import React, { useRef } from 'react'

import useSlider from '../../config/hooks/useSlider'

import './styles.css'

/**
 * Horizontal Range Slider
 */
const Slider = () => {
  const sliderRef = React.useRef<HTMLDivElement>(null)
  const thumbRef = React.useRef<HTMLDivElement>(null)

  const { start, stop } = useSlider({ sliderRef, thumbRef })

  // Slider entry point
  const handleMouseDown = ({ clientX }: React.MouseEvent<HTMLDivElement>) => {
    start(clientX)
  }

  return (
    <div ref={sliderRef} className="slider">
      <div ref={thumbRef} className="thumb" onMouseDown={handleMouseDown} />
    </div>
  )
}

export default Slider
