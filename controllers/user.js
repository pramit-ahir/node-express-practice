const bcrypt = require('bcrypt')
const User = require('./../models/user')
const jwt = require('jsonwebtoken')


async function addUser(req, res) {
    try {
        const data = req.body
        const isExist = await User.findOne({
            where: { email: data.email }
        })
        if (isExist) {
            return res.status(400).json({ message: "User already created with this email" })
        }
        data.isActive = true
        data.password = await bcrypt.hash(data.password, 10)
        await User.create(data)
        res.status(201).json({ message: 'User added successfully!' });
    } catch (error) {
        res.status(500).json({ message: "unable to add user" })
    }
}

async function loginUser(req, res) {
    try {
        let email = req.body.email
        let password = req.body.password
        const isExist = await User.findOne({ where: { email } })
        if (!isExist) {
            return res.status(400).json({ message: 'user not found with this email' })
        }
        const isPasswordValid = await bcrypt.compare(password, isExist.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' })
        }
        const token = jwt.sign(
            { id: isExist.id, email: isExist.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        )

        res.json({
            message: 'Login successful',
            token,
            user: { id: isExist.id, email: isExist.email }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error while login" })
    }
}

module.exports = { addUser, loginUser }