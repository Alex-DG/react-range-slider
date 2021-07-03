import React, { useRef } from 'react'

import useSlider from '../../config/hooks/useSlider'

import './styles.css'

/**
 * Horizontal Range Slider
 */
const Slider = () => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const { start } = useSlider({ sliderRef, thumbRef })

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
