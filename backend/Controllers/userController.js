const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require('./mailer')

//@desc create new user
//@route POST /auth/user-register
//@access public

const registerUser = async (req, res) => {
    const { email, password, username } = req.body
    if (!email || !password || !username) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }
    try {
        const isUser = await userModel.findOne({ email })
        if (isUser) {
            return res.status(400).json({ msg: 'Email already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            email, username, password: hashedPassword
        })
        res.status(201).json({
            message: "User registered successfully", user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
}

//@desc login user
//@route POST /auth/user-login
//@access public

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }
    try {
        const isUser = await userModel.findOne({ email });
        if (!isUser) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }
        const passMatch = await bcrypt.compare(password, isUser.password);
        if (!passMatch) {
            return res.status(400).json({ msg: 'Incorrect Password' })
        }
        //create jwt token 
        const token = jwt.sign({
            id: isUser.id, username: isUser.username
        },
            'jwt_secret',
            {
                expiresIn: '1m'
            }
        );
        res.status(200).json({ token: token, message: "Login Successfull" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}
const recover = async (req, res) => {
    const { email} = req.body
    try {
        await sendEmail(email)
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
}


module.exports = { registerUser, loginUser, recover }