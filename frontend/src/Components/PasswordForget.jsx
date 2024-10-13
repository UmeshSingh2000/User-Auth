import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import LinearLoader from './LinearLoader';
import Message from './Message';
const PasswordForget = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpButtonState, setOtpButtonState] = useState(true); // toggle otp field when the email successfully send
    const [passwordButtonState, setpasswordButtonState] = useState(true); // toggle otp field when the email successfully send
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageState, setMessageState] = useState('')
    const [error, setError] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const sendMail = async () => {
        if (!email) {
            setError(true);
            setMessage('Email Field is Empty')
            setMessageState('info');
            setTimeout(() => {
                setError(false);
            }, 3000);
            return;
        }
        setLoading(true);
        let response;
        setError(true);
        setMessage('Loading...')
        setMessageState('info')
        try {
            const res = await axios.post('http://localhost:3000/auth/recover-password', { email })
            // console.log(res.data);
            if (res.data.success) setOtpButtonState(false);
            response = res.data;
            setMessageState('success')
        }
        catch (err) {
            console.log(err);
            response = err.message;
            setMessageState('error')
        }
        finally {
            setMessage(response.message);
            setTimeout(() => {
                setError(false);
            }, 3000);
            setLoading(false);
        }
    }
    const verifyOtp = async () => {
        if (!otp) {
            setError(true);
            setMessage('Otp Field is Empty')
            setMessageState('info');
            setTimeout(() => {
                setError(false);
            }, 3000);
            return;
        }
        setLoading(true)
        let response;
        setError(true);
        try {
            const res = await axios.post('http://localhost:3000/auth/recover-password/verify-otp', { email, otp })
            console.log(res.data);
            if (res.data) {
                setOtpButtonState(true);
                setpasswordButtonState(false);
                response = 'Otp Verified';
                setMessageState('success');
            }
        }
        catch (err) {
            setMessageState('error');
            response = err.response.data.msg;
        }
        finally {
            setMessage(response);
            setTimeout(() => {
                setError(false);
            }, 3000);
            setLoading(false);
        }
    }
    const handleUpdatePass = async () => {
        if (!password || !confirmPassword) {
            setError(true);
            setMessage('Password Field is Empty')
            setMessageState('info');
            setTimeout(() => {
                setError(false);
            }, 3000);
            return;
        }
        if (password !== confirmPassword) {
            console.log("Password do not match");
            setError(true);
            setMessage('Password do not match')
            setMessageState('info');
            setTimeout(() => {
                setError(false);
            }, 3000);
            return;
        }
        setError(true);
        setLoading(true)
        let response;
        try {
            const res = await axios.post('http://localhost:3000/auth/updatePassword', { email, password })
            response = 'Password Changed Successfully'
            setMessageState('success')
        }
        catch (err) {
            response = err.response.data.msg;
            setMessageState('error')
        }
        finally {
            setMessage(response)
            setTimeout(() => {
                setError(false);
            }, 3000);
            setLoading(false);
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setOtp('')
            setpasswordButtonState(true)
            handleClose();
        }
    }
    return (
        <>
            <div>
                {error && <Message message={message} state={messageState} />}
                <Button variant="outlined" onClick={handleClickOpen}>
                    Forget Password
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    {loading && <LinearLoader />}
                    <DialogTitle>Recover Your Password</DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                            Enter Your Registered Email Address to Recover your Password!
                        </DialogContentText>

                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button onClick={sendMail}>Send Email</Button>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="OTP"
                            name="OTP"
                            label="Enter OTP"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={otp}
                            disabled={otpButtonState}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <Button disabled={otpButtonState} onClick={verifyOtp}>Verify Otp</Button>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="password"
                            name="password"
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password}
                            disabled={passwordButtonState}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="confirmPassword"
                            name="password"
                            label="Confirm New Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={confirmPassword}
                            disabled={passwordButtonState}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleUpdatePass} disabled={passwordButtonState}>Recover</Button>
                    </DialogActions>
                </Dialog >
            </div>
        </>
    )
}
export default PasswordForget
