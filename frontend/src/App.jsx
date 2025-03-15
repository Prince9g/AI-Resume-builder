import React from 'react'
import Builder from './components/Builder'
import { Outlet } from 'react-router-dom'

// import Template from './components/Template'

const App = () => {
  return (
    <div className="bg-slate-50">
      <Outlet/>
    </div>
  )
}

export default App
