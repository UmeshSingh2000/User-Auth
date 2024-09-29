import React from 'react'

const Button = ({text,border,bg}) => {
  return (
    <div className={`${border ? 'border-2' : 'border-none'} cursor-pointer p-2 rounded-full w-32 text-center ${bg ? 'bg-green-700' : 'hover:bg-green-700'}`}>
        <button>{text}</button>
    </div>
  )
}

export default Button
