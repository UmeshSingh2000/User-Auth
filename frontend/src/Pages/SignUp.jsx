import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import Field from '../Components/Field';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import google from '../assets/google.svg'
import { useGoogleLogin } from '@react-oauth/google';

const SignUp = () => {

    // State for user input values
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for API request
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false); // Error state for showing validation messages
    const [message, setMessage] = useState(''); // Message content for feedback
    const [buttonStatus, setButtonStatus] = useState(false); // Disable button during processing
    const [messageState, setMessageState] = useState('success') // Message state for styling (success, error, info, etc.)
    const handleApi = async () => {
        setLoading(true);
        setButtonStatus(true);
        try {
            // Make API request to register user
            const res = await axios.post('http://localhost:3000/auth/user-register', {
                username: userName,
                email,
                password,
            });
            // If successful, show success message
            setMessageState('success'); // Set message state to 'success'
            setError(true); // Show success message
            console.log(res.data.message); // Log the response message
            setMessage(res.data.message || 'Registration successful'); // Display response message
            setTimeout(() => {
                setError(false); // Hide message after 3 seconds
            }, 3000);
        } catch (err) {
            // Handle any errors during registration
            setMessageState('error'); // Set message state to 'error'
            setError(true); // Trigger error display
            setMessage(err.response?.data?.msg || 'Error occurred during registration'); // Show error message
            setTimeout(() => {
                setError(false); // Hide error after 3 seconds
            }, 3000);
        } finally {
            //reseting all fields
            setUserName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            // Stop loading and re-enable the button after API call
            setLoading(false);
            setButtonStatus(false);
        }
    }
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation: Ensure all fields are filled
        if (!userName || !email || !password || !confirmPassword) {
            setMessageState('info'); // Set message state to 'info' for an informational message
            setError(true); // Trigger error display
            setMessage('Please fill all fields'); // Display message
            setButtonStatus(true); // Disable button during message display
            setTimeout(() => {
                setError(false); // Hide error after 3 seconds
                setButtonStatus(false); // Re-enable the button
            }, 3000);
            return;
        }
        // Check if passwords match
        if (password !== confirmPassword) {
            setMessageState('warning'); // Set message state to 'warning'
            setError(true); // Trigger error display
            setMessage('Passwords do not match'); // Display mismatch message
            setTimeout(() => {
                setError(false); // Hide error after 3 seconds
            }, 3000);
            return;
        }
        handleApi();
    };
    const googleSignup = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            setLoading(true);
            try {
                const userInfoResponse = await axios('https://www.googleapis.com/oauth2/v2/userinfo', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${credentialResponse.access_token}`,
                    },
                });
                const { email, name } = userInfoResponse.data;
                const res = await axios.post('http://localhost:3000/auth/user-register', {
                    username: name,
                    email,
                    password: 'GoogleOAuth'
                });
                setMessageState('success'); // Set message state to 'success'
                setError(true); // Show success message
                console.log(res.data.message); // Log the response message
                setMessage(res.data.message || 'Registration successful'); // Display response message
                setTimeout(() => {
                    setError(false); // Hide message after 3 seconds
                }, 3000);
            } catch (err) {
                setMessageState('error'); // Set message state to 'error'
                setError(true); // Trigger error display
                setMessage(err.response?.data?.msg || 'Error occurred during registration'); // Show error message
                setTimeout(() => {
                    setError(false); // Hide error after 3 seconds
                }, 3000);
            }
            finally {
                setLoading(false);
            }
        },
        onError: (error) => {
            console.error("Google Login Failed: ", error);
        }
    })
    return (
        <div>
            {/* Show message component if there's an error or feedback to display */}
            {error && <Message state={messageState} message={message} />}
            <div className='w-screen h-screen items-center flex justify-center'>
                <div className='md:w-1/3 w-full h-screen pt-8 pb-8 text-white bg-[#05070a66] border-[#222936] border flex rounded-md'>
                    {/* Sign Up Form */}
                    <div className="right md:w-full w-full">
                        <form onSubmit={handleSubmit} className='flex flex-col gap-3 items-center justify-center h-full'>
                            <h1 className='text-white font-medium text-4xl '>Sign up</h1>
                            {/* Field for entering username */}
                            <Field placeholder='Username' value={userName} changeFunc={setUserName} />
                            {/* Field for entering email */}
                            <Field placeholder='Email' value={email} changeFunc={setEmail} />
                            {/* Field for entering password */}
                            <Field placeholder='Password' value={password} changeFunc={setPassword} />
                            {/* Field for confirming password */}
                            <Field placeholder='Password' value={confirmPassword} changeFunc={setConfirmPassword} />
                            {/* Display loader when processing */}
                            {loading && <Loader />}
                            {/* Sign up button */}
                            <div className='flex items-center justify-center gap-2'>
                                <input className='h-5 w-5 ' type="checkbox" />
                                <h2>I want to receive updates via email.</h2>
                            </div>
                            <Button disable={buttonStatus} text='Sign up' border={false} bg={true} />
                            <h2>Already have an account? <Link to='/' className='underline'>Sign in</Link></h2>
                            <div className='flex w-2/3 gap-3 items-center justify-center'>
                                <span className='w-2/4 h-0.5 bg-gray-600'></span>
                                <p className=''>or</p>
                                <span className='w-2/4 h-0.5 bg-gray-600'></span>
                            </div>
                            <div className='flex border-[#222936] border gap-2 hover:bg-[#05070a66] transition duration-300 w-3/4 rounded cursor-pointer h-10 items-center justify-center' onClick={googleSignup}>
                                <img src={google} alt="google" />
                                <h2>Sign up with Google</h2>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
