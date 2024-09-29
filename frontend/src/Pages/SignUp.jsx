import React from 'react'
import Button from '../Components/Button'
import Field from '../Components/Field'
import { Link } from 'react-router-dom'
const SignUp = () => {
    return (
        <div className='w-screen h-screen items-center flex justify-center bg-sky-800'>
            <div className='md:w-3/4 w-full h-3/4 text-white bg-white flex'>
                <div className="right md:w-2/4 w-full">
                    <form className='flex flex-col gap-3 items-center justify-center h-full'>
                        <h1 className='text-[#439775] text-center font-medium text-4xl'>Sign up</h1>
                        <Field placeholder='Username' />
                        <Field placeholder='Email' />
                        <Field placeholder='Password' />
                        <Field placeholder='Password' />
                        <Button text='Sign up' border={false} bg={true} />
                    </form>
                </div>
                <div className="left md:block hidden  w-2/4 bg-[#2A4747] h-full">
                    <div className="content flex flex-col items-center justify-center h-full gap-3">
                        <h1 className='md:text-5xl'>Create Your Account</h1>
                        <p className='md:text-1xl font-light w-64 text-center'>Register Your Account for
                            Online service</p>
                        <Link to='/'><Button text='Sign up' border={true} bg={false} /></Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignUp
