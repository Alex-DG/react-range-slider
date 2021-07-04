import React from 'react'
import './styles.css'

type Props = {
  children: React.ReactNode
  title?: string
  space?: boolean
}

const Card = ({ children, title, space }: Props) => {
  const className = space ? 'children' : ''
  return (
    <div className="container">
      {title && <h2>{title}</h2>}
      <div {...{ className }}>{children}</div>
    </div>
  )
}

export default Card
