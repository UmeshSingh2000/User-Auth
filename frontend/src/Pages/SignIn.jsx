import React, { useState } from 'react'
import Button from '../Components/Button'
import Field from '../Components/Field'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import google from '../assets/google.svg'
import { useGoogleLogin } from '@react-oauth/google';
import PasswordForget from '../Components/PasswordForget'
const SignIn = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messageState, setMessageState] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigateToHomepage = (token) => {
        if (token) localStorage.setItem('token', token);
        navigate('/homepage')
    }
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
            const { token } = res.data;
            navigateToHomepage(token);
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
    const googleLogin = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            setLoading(true);
            try {
                const userInfoResponse = await axios('https://www.googleapis.com/oauth2/v2/userinfo', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${credentialResponse.access_token}`
                    }
                })
                const { email, name } = userInfoResponse.data;
                const res = await axios.post('http://localhost:3000/auth/user-login', { email, password: 'GoogleOAuth' })
                setMessageState('success');
                setError(true);
                setMessage(res.data.message)
                setTimeout(() => {
                    setError(false);
                }, 3000);
                const { token } = res.data;
                navigateToHomepage(token);
            }
            catch (err) {
                setMessageState('error'); // Set message state to 'error'
                setError(true); // Trigger error display
                setMessage(err.response?.data?.msg || 'Error Signing in'); // Show error message
                setTimeout(() => {
                    setError(false); // Hide error after 3 seconds
                }, 3000);
            }
            finally {
                setLoading(false);
            }
        }
    })
    return (
        <div>
            {error && <Message state={messageState} message={message} />}
            <div className='w-screen h-screen items-center flex justify-center'>
                <div className='md:w-1/3 w-full h-auto pt-8 pb-8 text-white flex bg-[#05070a66] border-[#222936] border rounded'>
                    <div className="right w-full">
                        <form className='flex flex-col gap-3 items-center justify-center h-full' onSubmit={handleSubmit}>
                            <h1 className='text-white text-center font-medium text-4xl'>Sign in</h1>
                            <Field value={email} changeFunc={setEmail} placeholder='Email' />
                            <Field value={password} changeFunc={setPassword} placeholder='Password' />
                            {/* <p className='hover:text-green-500 transition duration-200 text-red-700 cursor-pointer '>Forget Password?</p> */}
                            <PasswordForget/>
                            <Button text='Sign in' border={false} bg={true} />
                            {loading && <Loader />}
                            <h2>New User? <Link to='/signup' className='underline'>Sign up</Link></h2>
                            <div className='flex w-2/3 gap-3 items-center justify-center'>
                                <span className='w-2/4 h-0.5 bg-gray-600'></span>
                                <p className=''>or</p>
                                <span className='w-2/4 h-0.5 bg-gray-600'></span>
                            </div>
                            <div className='flex border-[#222936] border gap-2 hover:bg-[#05070a66] transition duration-300 w-3/4 rounded cursor-pointer h-10 items-center justify-center' onClick={googleLogin}>
                                <img src={google} alt="google" />
                                <h2>Sign in with Google</h2>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignIn