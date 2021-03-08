const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ messange: "User doesn't exist." })
        const isPassword = await bcrypt.compare(password, existingUser.password)

        if (!isPassword) return res.status(400).json({ message: "Invalid credentials." })

        const token = jwt.sign({ email: existingUser.email, _id: existingUser._id }, 'test', { expiresIn: '1h' })

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

exports.signup = async(req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(404).json({ messange: "User already exist." })

        if (password !== confirmPassword) return res.status(404).json({ messange: "Password don't match." })

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, _id: result._id }, 'test', { expiresIn: '1h' })
        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}