import React from 'react'

const Template = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-80 h-80 bg-gray-200 rounded-lg cursor-pointer">
        <img src="https://cdn-images.zety.com/templates/zety/valera-11-classic-silver-dark-332@3x.png" className="w-full h-80 object-stretch transition-all duration-500 brightness-100 hover:brightness-90 hover:scale-105" alt="template" />
      </div>
      <button className="pr-4 pl-4 border rounded-lg">Try it</button>
    </div>
  )
}

export default Template
