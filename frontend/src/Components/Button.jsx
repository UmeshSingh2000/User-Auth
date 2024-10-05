import React from 'react'

const Button = ({text,border,bg,disable}) => {
  return (
    <div className={`${border ? 'border-2' : 'border-none'} ${disable ? 'bg-slate-800 cursor-wait' : 'bg-white text-black cursor-default'} cursor-pointer p-2 rounded w-3/4 text-center ${bg ? 'bg-green-700' : 'hover:bg-green-700'}`}>
        <button type='submit' disabled={disable}>{text}</button>
    </div>
  )
}

export default Button
