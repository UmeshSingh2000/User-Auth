import React from 'react'

const Button = ({text,border,bg,disable}) => {
  return (
    <div className={`${border ? 'border-2' : 'border-none'} ${disable ? 'bg-slate-800 cursor-wait' : 'bg-green-700 cursor-default'} cursor-pointer p-2 rounded-full w-32 text-center ${bg ? 'bg-green-700' : 'hover:bg-green-700'}`}>
        <button disabled={disable}>{text}</button>
    </div>
  )
}

export default Button
