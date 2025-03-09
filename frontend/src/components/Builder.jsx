import React from 'react'
import ResumeForm from './ResumeForm'
import ResumeTemplate1 from './ResumeTemplate1'

const Builder = () => {
  return (
    <div className="flex items-start gap-4">
      <ResumeForm/>
      <ResumeTemplate1/>
    </div>
  )
}

export default Builder
