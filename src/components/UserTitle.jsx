import React from 'react'

const UserTitle = ({text, className}) => {
  return (
    <div>
      <h2 className={className}>{text}</h2>
    </div>
  )
}

export default UserTitle
