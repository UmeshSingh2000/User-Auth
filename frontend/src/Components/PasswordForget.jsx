import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
const PasswordForget = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpButtonState, setOtpButtonState] = useState(true); // toggle otp field when the email successfully send
    const [passwordButtonState, setpasswordButtonState] = useState(true); // toggle otp field when the email successfully send
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const sendMail = async () => {
        if (!email) {
            console.log("field is empty");
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/auth/recover-password', { email })
            // console.log(res.data);
            if (res.data.success) setOtpButtonState(false);
            const { otp } = res.data;
            console.log(otp);
        }
        catch (err) {
            console.log(err);
        }
    }
    const verifyOtp = async () => {
        if (!otp) {
            console.log("field is empty");
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/auth/recover-password/verify-otp', { email, otp })
            console.log(res.data);
            if (res.data) {
                setOtpButtonState(true);
                setpasswordButtonState(false);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleUpdatePass = async() => {
        if (!password || !confirmPassword) {
            console.log("field is empty");
            return;
        }
        if (password !== confirmPassword) {
            console.log("Password do not match");
            return;
        }
        try{
            const res = await axios.post('http://localhost:3000/auth/updatePassword',{email,password})
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Forget Password
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
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
        </>
    )
}

export default PasswordForget
