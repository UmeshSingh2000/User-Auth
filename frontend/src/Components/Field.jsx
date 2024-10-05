import React from 'react'
import TextField from '@mui/material/TextField';

const Field = ({ placeholder, value, changeFunc }) => {
    const inputType = placeholder.toLowerCase();
    return (
        // <div className='flex w-2/3 h-11 p-2 border border-slate-900 rounded items-center gap-2 bg-[#F1F1F1]'>
        //     {inputType === 'email' ? <i className="fa-solid text-2xl  text-[#2A4747] fa-envelope"></i> : <i className="fa-solid text-2xl  text-[#2A4747] fa-lock"></i>}
        //     <input value={value} onChange={ (e)=>changeFunc(e.target.value)} type={inputType} className='bg-transparent border-none outline-none text-black w-full' placeholder={placeholder} />
        // </div>
        <TextField className='w-3/4' onChange={(e) => changeFunc(e.target.value)} type={inputType} value={value} label={placeholder} variant="outlined"
            InputProps={{
                style: {
                    color: 'white',
                    backgroundColor:'#05070A',
                }
            }}
            InputLabelProps={{
                style: {
                    color: 'white',
                    fontWeight : 100
                }
            }}
        />
    )
}

export default Field
