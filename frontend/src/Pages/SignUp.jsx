import React, { useEffect, useState } from 'react';
import Button from '../Components/Button';
import Field from '../Components/Field';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Components/Loader';
import Message from '../Components/Message';

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

        // Set loading state and disable the button during API request
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
    };

    return (
        <div>
            {/* Show message component if there's an error or feedback to display */}
            {error && <Message state={messageState} message={message} />}
            <div className='w-screen h-screen items-center flex justify-center bg-sky-800'>
                <div className='md:w-3/4 w-full h-3/4 text-white bg-white flex'>
                    {/* Sign Up Form */}
                    <div className="right md:w-2/4 w-full">
                        <form onSubmit={handleSubmit} className='flex flex-col gap-3 items-center justify-center h-full'>
                            <h1 className='text-[#439775] text-center font-medium text-4xl'>Sign up</h1>
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
                            <Button disable={buttonStatus} text='Sign up' border={false} bg={true} />
                        </form>
                    </div>

                    {/* Section for additional content or links */}
                    <div className="left md:block hidden w-2/4 bg-[#2A4747] h-full">
                        <div className="content flex flex-col items-center justify-center h-full gap-3">
                            <h1 className='md:text-5xl'>Create Your Account</h1>
                            <p className='md:text-1xl font-light w-64 text-center'>
                                Register Your Account for Online service
                            </p>
                            {/* Link to sign in page */}
                            <Link to='/'><Button text='Sign in' border={true} bg={false} /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
