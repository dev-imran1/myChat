import React from 'react'

const Heading = ({text,className}) => {
  return (
    <div>
        <h2 className={className}>{text}</h2>
    </div>
  )
}

export default Heading