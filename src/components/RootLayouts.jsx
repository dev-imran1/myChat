import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayouts = () => {
  return (
    <>
    <div>RootLayouts</div>
    <Outlet />
    </>
  )
}

export default RootLayouts