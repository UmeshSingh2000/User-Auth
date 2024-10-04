import React, { useState } from 'react'
import Button from '../Components/Button'
import Field from '../Components/Field'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

const SignIn = () => {
    const [message, setMessage] = useState('');
    const [messageState, setMessageState] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessageState('info'); // Set message state to 'info' for an informational message
            setError(true); // Trigger error display
            setMessage('Please fill all fields'); // Display message
            setTimeout(() => {
                setError(false); // Hide error after 3 seconds
            }, 3000);
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/auth/user-login', { email, password })
            setMessageState('success');
            setError(true);
            setMessage(res.data.message)
            setTimeout(() => {
                setError(false);
            }, 3000);
        } catch (err) {
            setMessageState('error'); // Set message state to 'error'
            setError(true); // Trigger error display
            setMessage(err.response?.data?.msg || 'Error Signing in'); // Show error message
            setTimeout(() => {
                setError(false); // Hide error after 3 seconds
            }, 3000);
        }
        finally {
            setEmail('')
            setPassword('')
            setLoading(false);
        }
    }
    return (
        <div>
            {error && <Message state={messageState} message={message} />}
            <div className='w-screen h-screen items-center flex justify-center bg-sky-800'>
                <div className='md:w-3/4 w-full h-3/4 text-white bg-white flex'>
                    <div className="left md:block hidden  w-2/4 bg-[#2A4747] h-full">
                        <div className="content flex flex-col items-center justify-center h-full gap-3">
                            <h1 className='md:text-5xl'>Welcome Back!</h1>
                            <p className='md:text-1xl font-light w-64 text-center'>To keep connected with us please login with your personal info</p>
                            <Link to='/signin'><Button text='Sign up' border={true} bg={false} /></Link>
                        </div>
                    </div>
                    <div className="right md:w-2/4 w-full">
                        <form className='flex flex-col gap-3 items-center justify-center h-full' onSubmit={handleSubmit}>
                            <h1 className='text-[#439775] text-center font-medium text-4xl'>Sign in</h1>
                            <Field value={email} changeFunc={setEmail} placeholder='Email' />
                            <Field value={password} changeFunc={setPassword} placeholder='Password' />
                            <p className='hover:text-green-500 transition duration-200 text-red-700 cursor-pointer '>Forget Password?</p>
                            <Button text='Sign in' border={false} bg={true} />
                            {loading && <Loader />}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
