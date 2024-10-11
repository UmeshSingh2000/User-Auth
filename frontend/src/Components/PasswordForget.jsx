import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const PasswordForget = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = async() => {
        try{

        }
        catch(err){

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
                        value={email}
                        disabled
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
                        value={email}
                        disabled
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="password"
                        name="password"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={email}
                        disabled
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClick}>Recover</Button>
                </DialogActions>
            </Dialog >
        </>
    )
}

export default PasswordForget
