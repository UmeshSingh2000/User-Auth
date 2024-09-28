import React from 'react'

const Field = ({placeholder}) => {
    const inputType  = placeholder.toLowerCase();
    return (
        <div className='flex w-2/3 h-11 p-2 border border-slate-900 rounded items-center gap-2 bg-[#F1F1F1]'>
            {inputType==='email' ? <i className="fa-solid text-2xl  text-[#2A4747] fa-envelope"></i> : <i className="fa-solid text-2xl  text-[#2A4747] fa-lock"></i>}
            <input type={inputType} className='bg-transparent border-none outline-none text-black w-full' placeholder={placeholder}/>
        </div>
    )
}

export default Field
