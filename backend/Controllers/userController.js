const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')


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

module.exports = { registerUser }